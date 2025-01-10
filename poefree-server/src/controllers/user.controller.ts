import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { successResponse, errorResponse } from '../utils/responseHelpers';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import fs from 'fs';
import path from 'path';

/**
 * @param req
 * @param res
 * @returns user: {id, username}
 */
export const registerUser = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            res.status(StatusCodes.BAD_REQUEST).json(
                errorResponse(ReasonPhrases.BAD_REQUEST, [
                    'Username or email already exists',
                ]),
            );
            return;
        }

        // Create new user
        const newUser = new User({
            username,
            email,
            password,
        });

        const savedUser = await newUser.save();

        // Create a session for the user
        req.session.user = {
            id: savedUser._id as string,
            username: savedUser.username,
        };
        console.info('Successful user registration', req.session.user);

        res.status(StatusCodes.CREATED).json(
            successResponse(
                {
                    id: savedUser._id,
                    username: savedUser.username,
                },
                ReasonPhrases.CREATED, // "Created"
            ),
        );
    } catch (error) {
        console.error('Error registering user:', error);
        if (error instanceof Error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [
                    error.message,
                ]),
            );
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [
                    'Unknown error occurred',
                ]),
            );
        }
    }
};

/**
 * @param req
 * @param res
 * @returns user: {_id, username}
 */
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json(
                errorResponse(ReasonPhrases.NOT_FOUND, ['User not found']),
            );
            return;
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(StatusCodes.UNAUTHORIZED).json(
                errorResponse(ReasonPhrases.UNAUTHORIZED, [
                    'Invalid credentials',
                ]),
            );
            return;
        }

        // Create a session for the user
        req.session.user = {
            id: user._id as string,
            username: user.username,
        };

        res.status(StatusCodes.OK).json(
            successResponse(
                {
                    id: user._id,
                    username: user.username,
                },
                ReasonPhrases.OK, // "OK"
            ),
        );
    } catch (error) {
        console.error('Error logging in user:', error);
        if (error instanceof Error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [
                    error.message,
                ]),
            );
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [
                    'Unknown error occurred',
                ]),
            );
        }
    }
};

export const updateUserImage = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json(errorResponse('User ID is required'));
            return;
        }

        if (!req.file || !req.file.buffer) {
            res.status(400).json(errorResponse('No file uploaded'));
            return;
        }

        // Validate the MIME type
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            res.status(400).json(
                errorResponse(
                    'Invalid file type. Only JPEG, PNG, GIF, and WEBP images are allowed.',
                ),
            );
            return;
        }

        // Define the upload directory and ensure it exists
        const uploadDir = path.resolve('src/uploads/profile');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Delete other files with the same ID but different extensions
        const existingFiles = fs.readdirSync(uploadDir);
        const idRegex = new RegExp(`^${id}\\.[^\\.]+$`);
        existingFiles.forEach((file) => {
            if (idRegex.test(file)) {
                const filePath = path.join(uploadDir, file);
                fs.unlinkSync(filePath);
                console.info(`Removed old profile image: ${filePath}`);
            }
        });

        // Save the new file with the desired filename
        const fileExtension = path.extname(req.file.originalname); // Extract the file extension
        const filePath = path.join(uploadDir, `${id}${fileExtension}`);
        fs.writeFileSync(filePath, req.file.buffer); // Write the file to the destination

        console.info(`New profile image saved at: ${filePath}`);
        res.status(200).json(
            successResponse(
                { filePath },
                'Profile image updated successfully!',
            ),
        );
    } catch (error) {
        res.status(500).json(
            errorResponse('Server error while uploading image', [error]),
        );
    }
};
