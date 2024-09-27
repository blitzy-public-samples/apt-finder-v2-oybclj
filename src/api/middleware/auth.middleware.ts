import { Request, Response, NextFunction } from 'express';
import { UserInterface } from '../../shared/interfaces/user.interface';
import { verifyToken } from '../utils/jwt';

// Extend the Express Request interface to include the user property
export interface AuthenticatedRequest extends Request {
  user?: UserInterface;
}

/**
 * Middleware function to authenticate requests using JWT
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) {
      res.status(401).json({ message: 'Invalid token format' });
      return;
    }

    // Verify the token using the verifyToken function from jwt utils
    const decodedUser = await verifyToken(token);

    if (!decodedUser) {
      res.status(401).json({ message: 'Invalid or expired token' });
      return;
    }

    // Attach the decoded user information to the request object
    req.user = decodedUser;

    // Call next() to pass control to the next middleware
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the AuthenticatedRequest interface
export { AuthenticatedRequest };

// Human tasks:
// TODO: Implement error handling for token expiration
// TODO: Add logging for authentication attempts and failures
// TODO: Consider implementing refresh token mechanism