import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const sanitizeInputs = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    Object.keys(req.body).forEach((key) => {
        if (typeof req.body[key] === 'string') {
            req.body[key] = validator.escape(validator.trim(req.body[key]));
        }
    });
    next();
};
