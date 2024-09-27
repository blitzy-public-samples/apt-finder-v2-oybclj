import { Request, Response, NextFunction } from 'express';

// Custom error class for API-specific errors
export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware function for handling and formatting error responses
export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Check if the error is an instance of a custom ApiError class
  if (error instanceof ApiError) {
    // If it's an ApiError, use its status code and message
    res.status(error.statusCode).json({
      status: 'error',
      statusCode: error.statusCode,
      message: error.message,
    });
  } else {
    // If it's not an ApiError, set status to 500 and use a generic error message
    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }

  // Log the error for debugging purposes
  console.error('Error:', error);

  // If in development environment, include the error stack in the response
  if (process.env.NODE_ENV === 'development') {
    res.json({
      ...res.json(),
      stack: error.stack,
    });
  }
};

// Human tasks (commented)
/*
TODO: Implement error logging mechanism (e.g., using a logging library like Winston)
TODO: Define and document common API error codes and messages
TODO: Implement environment-based error detail exposure (development vs. production)
*/