/**
 * src/shared/interfaces/user.interface.ts
 * This file defines the UserInterface, which represents the structure of a user object in the Apartment Finder application.
 */

/**
 * Enum representing the possible roles a user can have
 */
export enum UserRole {
  GUEST = 'GUEST',
  USER = 'USER',
  SUBSCRIBER = 'SUBSCRIBER',
  ADMIN = 'ADMIN'
}

/**
 * Interface defining the structure of a user object
 */
export interface UserInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
}

/**
 * Human tasks:
 * TODO: Review and confirm the UserInterface properties
 * TODO: Ensure the UserRole enum aligns with the backend user roles
 * TODO: Consider adding any additional user-related types or interfaces if needed
 */