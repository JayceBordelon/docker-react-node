import { Router } from "express";
import {
  registerUser,
  loginUser,
  subscribeToUser,
  unsubscribeFromUser,
  getUserProfile,
} from "../controllers/user.controller";

const router = Router();

// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Subscribe to a user (protected route)
router.post("/subscribe", subscribeToUser);

// Unsubscribe from a user (protected route)
router.post("/unsubscribe", unsubscribeFromUser);

// Get user profile (protected route)
router.get("/:userId", getUserProfile);

export default router;
