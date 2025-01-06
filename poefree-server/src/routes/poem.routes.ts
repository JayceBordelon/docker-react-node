import { Router } from "express";
import { createPoem, getPoemById, getAllPoems, updatePoem, deletePoem, likePoem, viewPoem } from "../controllers/poem.controller";

const router = Router();

// Create a new poem
router.post("/", createPoem);

// Get all poems
router.get("/", getAllPoems);

// Get a poem by ID
router.get("/:id", getPoemById);

// Update a poem by ID
router.put("/:id", updatePoem);

// Delete a poem by ID
router.delete("/:id", deletePoem);

// Like a poem
router.post("/:id/like", likePoem);

// View a poem (mark as viewed by the user)
router.post("/:id/view", viewPoem);

export default router;
