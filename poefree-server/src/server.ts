import express from 'express';
import path from 'path';
import { PORT, MONGO_URI } from './config/envConfig';
import { connectToMongo } from './config/dbConfig';
import { setupMiddleware } from './middleware';
import routes from './routes';
import { setupGracefulShutdown } from './utils/shutdown';

const app = express();

// Setup middleware
setupMiddleware(app);
console.info('[1/4] Express middleware up...');

// Serve static files from the uploads directory
const uploadsPath = path.join(__dirname, './uploads/');
app.use('/uploads', express.static(uploadsPath));
console.info('[2/4] Statics included...');

// Routes
app.use('/', routes);
console.info('[3/4] Routes established...');

// Start server
app.listen(PORT, '0.0.0.0', async () => {
    await connectToMongo(MONGO_URI);
    console.info(`Sever is LIVE & HEALTHY on port ${PORT}!`);
});

// Setup graceful shutdown
setupGracefulShutdown();
