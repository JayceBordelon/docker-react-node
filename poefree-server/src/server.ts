import express from 'express';
import path from 'path';
import { PORT, MONGO_URI } from './config/env.config';
import { connectToMongo } from './config/db.config';
import { setupMiddleware } from './middleware';
import routes from './routes';
import { setupGracefulShutdown } from './middleware/shutdown';
import { logger } from './utils/logger.util';

const app = express();

setupMiddleware(app);
logger.info('[1/4] Express middleware initialized');

const uploadsPath = path.join(__dirname, './uploads/');
app.use('/uploads', express.static(uploadsPath));
logger.info('[2/4] Static files configured at /uploads');

app.use('/', routes);
logger.info('[3/4] Routes established');

app.listen(PORT, '0.0.0.0', async () => {
    await connectToMongo(MONGO_URI);
    logger.success(`SERVER LIVE ON PORT ${PORT}`);
});

setupGracefulShutdown();
logger.info('[4/4] Graceful shutdown configured');
