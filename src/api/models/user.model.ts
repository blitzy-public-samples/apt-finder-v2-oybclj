import { UserInterface, UserRole } from '../../shared/interfaces/user.interface';

export interface UserModel extends UserInterface {
  isActive: boolean;
  verificationToken: string | null;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;

  comparePassword(password: string): Promise<boolean>;
  generateVerificationToken(): Promise<string>;
  generateResetPasswordToken(): Promise<string>;
}

// Human tasks:
// TODO: Implement the actual user model class that implements the UserModel interface
// TODO: Ensure that the password comparison method uses a secure hashing algorithm (e.g., bcrypt)
// TODO: Implement secure token generation methods for email verification and password reset
// TODO: Review and confirm that all necessary user properties and methods are included in the UserModel interface
// TODO: Consider adding any additional user-related methods or properties specific to the API layer