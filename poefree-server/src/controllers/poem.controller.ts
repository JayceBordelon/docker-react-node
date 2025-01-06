import { Request, Response } from "express";
import Poem from "../models/Poem";

// Create a new poem
export const createPoem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content } = req.body;
    const creator = (req as any).user?.id; // Ensure req.user is handled properly

    if (!creator) {
      res.status(401).json({ message: "Unauthorized. Please log in." });
      return;
    }

    const newPoem = await Poem.create({ creator, title, content });
    res.status(201).json(newPoem);
  } catch (error) {
    res.status(500).json({ message: "Error creating poem", error });
  }
};

// Get all poems
export const getAllPoems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const poems = await Poem.find().populate("creator", "username"); // Populate creator's username
    res.status(200).json(poems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching poems", error });
  }
};

// Get a poem by ID
export const getPoemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const poem = await Poem.findById(id).populate("creator", "username");

    if (!poem) {
      res.status(404).json({ message: "Poem not found" });
      return;
    }

    res.status(200).json(poem);
  } catch (error) {
    res.status(500).json({ message: "Error fetching poem", error });
  }
};

// Update a poem by ID
export const updatePoem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized. Please log in." });
      return;
    }

    const poem = await Poem.findById(id);

    if (!poem) {
      res.status(404).json({ message: "Poem not found" });
      return;
    }

    if (poem.creator.toString() !== userId) {
      res.status(403).json({ message: "You are not authorized to update this poem" });
      return;
    }

    poem.title = title || poem.title;
    poem.content = content || poem.content;

    const updatedPoem = await poem.save();
    res.status(200).json(updatedPoem);
  } catch (error) {
    res.status(500).json({ message: "Error updating poem", error });
  }
};

// Delete a poem by ID
export const deletePoem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized. Please log in." });
      return;
    }

    const poem = await Poem.findById(id);

    if (!poem) {
      res.status(404).json({ message: "Poem not found" });
      return;
    }

    if (poem.creator.toString() !== userId) {
      res.status(403).json({ message: "You are not authorized to delete this poem" });
      return;
    }

    await poem.deleteOne();
    res.status(200).json({ message: "Poem deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting poem", error });
  }
};

// Like a poem
export const likePoem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized. Please log in." });
      return;
    }

    const poem = await Poem.findById(id);

    if (!poem) {
      res.status(404).json({ message: "Poem not found" });
      return;
    }

    if (poem.likes.includes(userId)) {
      res.status(400).json({ message: "You already liked this poem" });
      return;
    }

    poem.likes.push(userId);
    await poem.save();
    res.status(200).json(poem);
  } catch (error) {
    res.status(500).json({ message: "Error liking poem", error });
  }
};

// View a poem
export const viewPoem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized. Please log in." });
      return;
    }

    const poem = await Poem.findById(id);

    if (!poem) {
      res.status(404).json({ message: "Poem not found" });
      return;
    }

    if (!poem.views.includes(userId)) {
      poem.views.push(userId);
      await poem.save();
    }

    res.status(200).json(poem);
  } catch (error) {
    res.status(500).json({ message: "Error viewing poem", error });
  }
};
