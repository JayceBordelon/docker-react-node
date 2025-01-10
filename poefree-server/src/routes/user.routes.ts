import { Router } from 'express';
import upload from '../config/multerConfig';
import {
    registerUser,
    loginUser,
    updateUserImage,
} from '../controllers/user.controller';

const router = Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Update user image
router.post('/profile/image', upload.single('image'), updateUserImage);

export default router;
