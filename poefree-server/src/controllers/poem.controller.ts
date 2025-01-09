import { Request, Response } from 'express';
import Poem from '../models/Poem';

// Get all poems
export const getAllPoems = async (
    _req: Request,
    res: Response,
): Promise<void> => {
    try {
        const poems = await Poem.find();
        res.status(200).json(poems);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching poems', error });
    }
};
