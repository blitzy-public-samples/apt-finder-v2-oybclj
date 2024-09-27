import { User } from '../../shared/interfaces/user.interface';
import { JwtPayload } from '../../shared/interfaces/jwt-payload.interface';
import { ApiError } from '../../shared/utils/api-error';
import { encryptPassword, comparePasswords } from '../../shared/utils/encryption';
import { generateToken, verifyToken } from '../../shared/utils/jwt';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export class AuthService {
  private userRepository: any; // Replace 'any' with the actual UserRepository type

  constructor(userRepository: any) {
    this.userRepository = userRepository;
  }

  /**
   * Registers a new user
   * @param userData User data for registration
   * @returns Newly created user object
   */
  async register(userData: User): Promise<User> {
    // Validate user input
    this.validateUserInput(userData);

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ApiError('User already exists', 400);
    }

    // Encrypt password
    const hashedPassword = await encryptPassword(userData.password);

    // Create new user in the database
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = generateToken({ userId: newUser.id });

    // Return user object with token
    return { ...newUser, token };
  }

  /**
   * Authenticates a user and returns a JWT token
   * @param email User's email
   * @param password User's password
   * @returns User object and JWT token
   */
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new ApiError('Invalid credentials', 401);
    }

    // Verify password
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError('Invalid credentials', 401);
    }

    // Generate JWT token
    const token = generateToken({ userId: user.id });

    // Return user object and token
    return { user, token };
  }

  /**
   * Verifies a JWT token and returns the decoded payload
   * @param token JWT token
   * @returns Decoded JWT payload
   */
  async verifyToken(token: string): Promise<JwtPayload> {
    try {
      const decoded = verifyToken(token);
      return decoded;
    } catch (error) {
      throw new ApiError('Invalid token', 401);
    }
  }

  /**
   * Changes the password for a user
   * @param userId User's ID
   * @param oldPassword User's current password
   * @param newPassword User's new password
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    // Find user by ID
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new ApiError('User not found', 404);
    }

    // Verify old password
    const isPasswordValid = await comparePasswords(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new ApiError('Invalid old password', 400);
    }

    // Encrypt new password
    const hashedNewPassword = await encryptPassword(newPassword);

    // Update user's password in the database
    await this.userRepository.updatePassword(userId, hashedNewPassword);
  }

  /**
   * Initiates a password reset request
   * @param email User's email
   */
  async resetPasswordRequest(email: string): Promise<void> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // Don't reveal if the email exists or not for security reasons
      return;
    }

    // Generate password reset token
    const resetToken = this.generateResetToken();

    // Save reset token and expiration to user record
    const resetTokenExpiration = new Date(Date.now() + 3600000); // 1 hour from now
    await this.userRepository.saveResetToken(user.id, resetToken, resetTokenExpiration);

    // Send password reset email
    // TODO: Implement email service for sending password reset emails
    console.log(`Password reset email sent to ${email} with token: ${resetToken}`);
  }

  /**
   * Resets the password using a valid reset token
   * @param resetToken Password reset token
   * @param newPassword New password
   */
  async resetPassword(resetToken: string, newPassword: string): Promise<void> {
    // Find user by reset token and check expiration
    const user = await this.userRepository.findByResetToken(resetToken);
    if (!user || user.resetTokenExpiration < new Date()) {
      throw new ApiError('Invalid or expired reset token', 400);
    }

    // Encrypt new password
    const hashedNewPassword = await encryptPassword(newPassword);

    // Update user's password in the database
    await this.userRepository.updatePassword(user.id, hashedNewPassword);

    // Clear reset token and expiration from user record
    await this.userRepository.clearResetToken(user.id);
  }

  private validateUserInput(userData: User): void {
    // Implement input validation logic here
    // Throw ApiError for any validation failures
  }

  private generateResetToken(): string {
    // Implement reset token generation logic here
    return bcrypt.genSaltSync(16);
  }
}

// Human tasks:
// TODO: Implement email service for sending password reset emails
// TODO: Set up proper error handling and logging
// TODO: Implement rate limiting for authentication attempts
// TODO: Review and approve the AuthService implementation
// TODO: Set up unit tests for AuthService methods