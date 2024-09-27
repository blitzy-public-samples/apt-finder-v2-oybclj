import jwt from 'jsonwebtoken';
import { config } from '../config';

// TODO: Ensure that the JWT_SECRET is securely stored and not exposed in the codebase
const JWT_SECRET = config.JWT_SECRET;
const JWT_EXPIRATION = config.JWT_EXPIRATION;

/**
 * Generates a JWT token for a given user ID
 * @param userId - The ID of the user for whom the token is being generated
 * @returns A JWT token as a string
 */
export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

/**
 * Verifies the validity of a given JWT token
 * @param token - The JWT token to verify
 * @returns The decoded token payload if valid, null otherwise
 */
export const verifyToken = (token: string): object | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as object;
  } catch (error) {
    // TODO: Implement proper error handling for token verification failures
    console.error('Token verification failed:', error);
    return null;
  }
};

/**
 * Decodes a JWT token without verifying its signature
 * @param token - The JWT token to decode
 * @returns The decoded token payload
 */
export const decodeToken = (token: string): object | null => {
  return jwt.decode(token) as object | null;
};

/**
 * Generates a new JWT token based on an existing valid token
 * @param token - The existing JWT token
 * @returns A new JWT token if the input token is valid, null otherwise
 */
export const refreshToken = (token: string): string | null => {
  const decodedToken = verifyToken(token);
  if (decodedToken && typeof decodedToken === 'object' && 'userId' in decodedToken) {
    return generateToken(decodedToken.userId as number);
  }
  return null;
};

// TODO: Consider implementing token blacklisting for logout functionality