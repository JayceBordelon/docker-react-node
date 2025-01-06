import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      subscribers: [],
      subscribedTo: [],
      poems: [],
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to log in user" });
  }
};

// Subscribe to another user
export const subscribeToUser = async (req: Request, res: Response): Promise<void> => {
  const { userId, targetUserId } = req.body;

  try {
    // Ensure target user exists
    const targetUser = await User.findById(targetUserId);
    if (!targetUser) {
      res.status(404).json({ message: "Target user not found" });
      return;
    }

    // Update the subscriber and subscribedTo arrays
    await User.findByIdAndUpdate(userId, {
      $addToSet: { subscribedTo: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { subscribers: userId },
    });

    res.status(200).json({ message: "Successfully subscribed to user" });
  } catch (error) {
    console.error("Error subscribing to user:", error);
    res.status(500).json({ message: "Failed to subscribe to user" });
  }
};

// Unsubscribe from a user
export const unsubscribeFromUser = async (req: Request, res: Response): Promise<void> => {
  const { userId, targetUserId } = req.body;

  try {
    // Update the subscriber and subscribedTo arrays
    await User.findByIdAndUpdate(userId, {
      $pull: { subscribedTo: targetUserId },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $pull: { subscribers: userId },
    });

    res.status(200).json({ message: "Successfully unsubscribed from user" });
  } catch (error) {
    console.error("Error unsubscribing from user:", error);
    res.status(500).json({ message: "Failed to unsubscribe from user" });
  }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("subscribers subscribedTo poems");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ message: "Failed to retrieve user profile" });
  }
};
