import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { AUTH_ENDPOINTS } from '../../shared/constants/apiEndpoints';

const router = Router();

/**
 * Configures and returns the router with all authentication routes
 * @returns {Router} Express Router instance with configured auth routes
 */
const configureAuthRoutes = (): Router => {
  // Signup route
  router.post(AUTH_ENDPOINTS.SIGNUP, AuthController.signup);

  // Login route
  router.post(AUTH_ENDPOINTS.LOGIN, AuthController.login);

  // Logout route (protected)
  router.post(AUTH_ENDPOINTS.LOGOUT, authMiddleware, AuthController.logout);

  // Forgot password route
  router.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, AuthController.forgotPassword);

  // Reset password route
  router.post(AUTH_ENDPOINTS.RESET_PASSWORD, AuthController.resetPassword);

  return router;
};

export default configureAuthRoutes();

// Human tasks:
// TODO: Implement rate limiting for auth routes to prevent brute-force attacks
// TODO: Add input validation middleware for all routes
// TODO: Consider adding a route for email verification after signup