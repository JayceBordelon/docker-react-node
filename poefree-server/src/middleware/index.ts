import cors from 'cors';
import express from 'express';
import { setupExpressSession } from './session';

export const setupMiddleware = (app: express.Application): void => {
    setupExpressSession(app);

    app.use(
        cors({
            origin: process.env.CLIENT,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'withCredentials',
            ],
        }),
    );

    app.options('*', cors());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};
