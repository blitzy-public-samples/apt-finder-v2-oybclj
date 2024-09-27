import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import middleware from './middleware';
import routes from './routes';

const app: Express = express();

// Apply middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Apply custom middleware
app.use(middleware);

// Configure routes
app.use('/api', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const startServer = (): void => {
  const port = config.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();

export default app;

// Human tasks:
// TODO: Implement error handling middleware
// TODO: Set up logging for the API server
// TODO: Configure environment-specific settings