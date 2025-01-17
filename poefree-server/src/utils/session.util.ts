import { Request } from 'express';

export const saveSession = async (
    req: Request,
    sessionData: Record<string, any>,
): Promise<void> => {
    if (!req.session) {
        throw new Error('Session is not available.');
    }

    Object.assign(req.session, sessionData);

    return new Promise((resolve, reject) => {
        req.session.save((err) => {
            if (err)
                reject(new Error(`Failed to save session: ${err.message}`));
            else resolve();
        });
    });
};
