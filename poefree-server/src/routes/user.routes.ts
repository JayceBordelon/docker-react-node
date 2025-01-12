import { Router } from 'express';
import upload from '../config/multerConfig';
import {
    registerUser,
    loginUser,
    updateUserImage,
    clearUserSession,
} from '../controllers/user.controller';

const router = Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Update user image
router.post('/image', upload.single('image'), updateUserImage);

// Logout (Destroy session)
router.post('/logout', clearUserSession);

export default router;
