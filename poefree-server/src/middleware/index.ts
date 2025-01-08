import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

export const setupMiddleware = (app: express.Application): void => {
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(
      `Received ${req.method} request to ${req.url} from ${req.hostname}`,
    );
    next();
  });

  app.use(express.json());
};
