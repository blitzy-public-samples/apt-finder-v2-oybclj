import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { RequestWithBody } from '../interfaces/request.interface';
import { ResponseWithData } from '../interfaces/response.interface';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  /**
   * Handles user registration
   * @param req - Request with user registration data
   * @param res - Response object
   */
  public async register(req: RequestWithBody, res: Response): Promise<ResponseWithData> {
    try {
      // Extract user registration data from request body
      const { email, password, firstName, lastName } = req.body;

      // Validate the input data
      if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Call AuthService.register with the validated data
      const result = await this.authService.register({ email, password, firstName, lastName });

      // Return the created user data and token in the response
      return res.status(201).json(result);
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Handles user login
   * @param req - Request with login credentials
   * @param res - Response object
   */
  public async login(req: RequestWithBody, res: Response): Promise<ResponseWithData> {
    try {
      // Extract login credentials from request body
      const { email, password } = req.body;

      // Validate the input data
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }

      // Call AuthService.login with the validated credentials
      const result = await this.authService.login(email, password);

      // Return the user data and token in the response
      return res.status(200).json(result);
    } catch (error) {
      console.error('Login error:', error);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  }

  /**
   * Handles user logout
   * @param req - Authenticated request
   * @param res - Response object
   */
  public async logout(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      // Extract user ID from the authenticated request
      const userId = req.user.id;

      // Call AuthService.logout with the user ID
      await this.authService.logout(userId);

      // Return a success response
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Initiates the password reset process
   * @param req - Request with user's email
   * @param res - Response object
   */
  public async forgotPassword(req: RequestWithBody, res: Response): Promise<Response> {
    try {
      // Extract email from request body
      const { email } = req.body;

      // Validate the email
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      // Call AuthService.forgotPassword with the email
      await this.authService.forgotPassword(email);

      // Return a success response indicating password reset email sent
      return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Forgot password error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Resets the user's password
   * @param req - Request with reset token and new password
   * @param res - Response object
   */
  public async resetPassword(req: RequestWithBody, res: Response): Promise<Response> {
    try {
      // Extract reset token and new password from request body
      const { token, newPassword } = req.body;

      // Validate the input data
      if (!token || !newPassword) {
        return res.status(400).json({ error: 'Missing token or new password' });
      }

      // Call AuthService.resetPassword with the token and new password
      await this.authService.resetPassword(token, newPassword);

      // Return a success response
      return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Reset password error:', error);
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
  }
}

// Human tasks:
// TODO: Implement input validation for all controller methods
// TODO: Add proper error handling and error responses
// TODO: Implement rate limiting for sensitive operations (login, password reset)
// TODO: Add logging for all authentication actions
// TODO: Consider implementing account lockout after multiple failed login attempts