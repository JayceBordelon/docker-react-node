import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { successResponse, errorResponse } from '../utils/responseHelpers';
import { logger } from '../utils/loggerUtil';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import fs from 'fs';
import path from 'path';
import { saveSession } from '../utils/sessionUtils';

export const registerUser = async (
    req: Request,
    res: Response,
): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        logger.info(`Registering user: ${username}, Email: ${email}`);
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            logger.warn(
                `Registration failed: Username or email already exists`,
            );
            res.status(StatusCodes.BAD_REQUEST).json(
                errorResponse(ReasonPhrases.BAD_REQUEST, [
                    'Username or email already exists',
                ]),
            );
            return;
        }

        const newUser = new User({ username, email, password });
        const savedUser = await newUser.save();

        await saveSession(req, {
            uid: savedUser._id as string,
            username: savedUser.username,
        });
        logger.success(`User registered successfully: ${username}`);
        res.status(StatusCodes.CREATED).json(
            successResponse(req.session, ReasonPhrases.CREATED),
        );
    } catch (error) {
        logger.error(
            `Error registering user: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [errorMessage]),
        );
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        logger.info(`Login attempt: ${username || email}`);

        const user = await User.findOne({ $or: [{ username }, { email }] });
        if (!user) {
            logger.warn(`Login failed: User not found`);

            res.status(StatusCodes.NOT_FOUND).json(
                errorResponse(ReasonPhrases.NOT_FOUND, ['User not found']),
            );
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn(
                `Login failed: Invalid credentials for ${username || email}`,
            );

            res.status(StatusCodes.UNAUTHORIZED).json(
                errorResponse(ReasonPhrases.UNAUTHORIZED, [
                    'Invalid credentials',
                ]),
            );
            return;
        }

        const sessionData: Record<string, any> = {
            uid: user._id as string,
            username: user.username,
        };
        if (user.profileImage) sessionData.profileImage = user.profileImage;

        await saveSession(req, sessionData);
        logger.success(`User logged in successfully: ${user.username}`);

        res.status(StatusCodes.OK).json(
            successResponse(sessionData, ReasonPhrases.OK),
        );
    } catch (error) {
        logger.error(
            `Error logging in user: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );

        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [errorMessage]),
        );
    }
};

export const updateUserImage = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { uid, username } = req.session;
        logger.info(`Updating profile image for: ${username}`);
        if (!uid || !req.file?.buffer) {
            logger.warn(
                `Profile image update failed: ${uid ? 'No file uploaded' : 'User ID is required'}`,
            );

            res.status(400).json(
                errorResponse(uid ? 'No file uploaded' : 'User ID is required'),
            );
            return;
        }

        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
        ];
        if (!allowedMimeTypes.includes(req.file.mimetype)) {
            logger.warn(`Invalid file type uploaded by: ${username}`);

            res.status(400).json(
                errorResponse(
                    'Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.',
                ),
            );
            return;
        }

        const uploadDir = path.resolve('src/uploads/profile');
        if (!fs.existsSync(uploadDir))
            fs.mkdirSync(uploadDir, { recursive: true });

        const existingFiles = fs.readdirSync(uploadDir);
        const idRegex = new RegExp(`^${username}\\.[^\\.]+$`);
        existingFiles.forEach((file) => {
            if (idRegex.test(file)) fs.unlinkSync(path.join(uploadDir, file));
        });

        const fileExtension = path.extname(req.file.originalname);
        const filePath = path.join(uploadDir, `${username}${fileExtension}`);
        fs.writeFileSync(filePath, req.file.buffer);

        const user = await User.findById(uid);
        if (!user) {
            logger.warn(`Profile image update failed: User not found`);

            res.status(404).json(errorResponse('User not found'));
            return;
        }

        user.profileImage = `${username}${fileExtension}`;
        await user.save();
        req.session.profileImage = user.profileImage;
        await saveSession(req, {
            profileImage: user.profileImage,
        });
        logger.success(`Profile image updated successfully for: ${username}`);
        res.status(StatusCodes.OK).json(
            successResponse(req.session, 'Profile image updated successfully!'),
        );
    } catch (error) {
        logger.error(
            `Error updating profile image: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            errorResponse('Server error while uploading image', [error]),
        );
    }
};

export const clearUserSession = async (
    req: Request,
    res: Response,
): Promise<void> => {
    logger.info(
        `Clearing session for: ${req.session?.username || 'Unknown user'}`,
    );
    if (!req.session) {
        logger.warn(`Clear session failed: No active session found`);

        res.status(400).json(errorResponse('No active session found.'));
        return;
    }

    req.session.destroy((err) => {
        if (err) {
            logger.error(
                `Failed to clear session: ${err.message || 'Unknown error'}`,
            );

            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
                errorResponse('Failed to clear session.', [
                    err.message || 'Unknown error occurred',
                ]),
            );
            return;
        }

        res.clearCookie('connect.sid');
        logger.success(
            `Session cleared successfully for: ${req.session?.username || 'Unknown user'}`,
        );

        res.status(StatusCodes.OK).json(
            successResponse(null, 'User session cleared successfully.'),
        );
    });
};
