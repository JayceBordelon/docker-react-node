import { Request, Response } from 'express';
import Poem from '../models/poem.model';
import { successResponse, errorResponse } from '../utils/response.util';
import { logger } from '../utils/logger.util';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const getAllPoems = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        if (!req.session || !req.session.uid) {
            logger.warn('Failed to fetch poems: User not authenticated');
            res.status(StatusCodes.UNAUTHORIZED).json(
                errorResponse(ReasonPhrases.UNAUTHORIZED, [
                    'User not authenticated',
                ]),
            );
            return;
        }
        const poems = await Poem.find();
        logger.success(`Successfully fetched ${poems.length} poems.`);

        res.status(StatusCodes.OK).json(
            successResponse(poems, 'Poems fetched successfully'),
        );
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error(`Error fetching poems: ${errorMessage}`);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [errorMessage]),
        );
    }
};

export const getAllPoemsForCurrentUser = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        if (!req.session || !req.session.uid) {
            logger.warn('Failed to fetch poems: User not authenticated');
            res.status(StatusCodes.UNAUTHORIZED).json(
                errorResponse(ReasonPhrases.UNAUTHORIZED, [
                    'User not authenticated',
                ]),
            );
            return;
        }

        const userId = req.session.uid;
        logger.info(`Fetching poems for user: ${userId}`);

        const poems = await Poem.find({ creator: userId });
        logger.success(
            `Successfully fetched ${poems.length} poems for user: ${userId}`,
        );

        res.status(StatusCodes.OK).json(
            successResponse(poems, 'Poems fetched successfully'),
        );
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error occurred';
        logger.error(`Error fetching poems: ${errorMessage}`);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            errorResponse(ReasonPhrases.INTERNAL_SERVER_ERROR, [errorMessage]),
        );
    }
};
