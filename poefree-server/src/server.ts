import express from 'express';
import path from 'path';
import { PORT, NODE_ENV, MONGO_URI, SESSION_SECRET } from './config/envConfig';
import { connectToMongo } from './config/dbConfig';
import { setupMiddleware } from './middleware';
import routes from './routes';
import session from 'express-session';
import { setupGracefulShutdown } from './utils/shutdown';

const app = express();

// Setup middleware
setupMiddleware(app);
console.info('[1/5] Express middleware up...');

// Define session config
declare module 'express-session' {
    interface Session {
        user: {
            id: string;
            username: string;
        };
    }
}

// Configure session middleware
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: NODE_ENV === 'production',
        },
    }),
);
console.info('[2/5] Session instantiated...');

// Serve static files from the uploads directory
const uploadsPath = path.join(__dirname, './uploads/');
app.use('/uploads', express.static(uploadsPath));
console.info('[3/5] Statics included...');

// Routes
app.use('/', routes);
console.info('[4/5] Routes established...');

// Start server
app.listen(PORT, '0.0.0.0', async () => {
    await connectToMongo(MONGO_URI);
    console.info(`Sever is LIVE & HEALTHY on port ${PORT}!`);
});

// Setup graceful shutdown
setupGracefulShutdown();
