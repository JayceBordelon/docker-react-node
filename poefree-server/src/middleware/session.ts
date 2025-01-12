import express from 'express';
import session from 'express-session';
import { MONGO_URI, NODE_ENV, SESSION_SECRET } from '../config/envConfig';
import 'express-session';
import MongoStore from 'connect-mongo';

declare module 'express-session' {
    interface SessionData {
        uid?: string;
        username?: string;
        profileImage?: string;
    }
}

export const setupExpressSession = (app: express.Application): void => {
    app.use(
        session({
            secret: SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            store: MongoStore.create({
                mongoUrl: MONGO_URI,
                collectionName: 'sessions',
                ttl: 24 * 60 * 60,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
                secure: NODE_ENV === 'production',
                httpOnly: true,
            },
        }),
    );
};
