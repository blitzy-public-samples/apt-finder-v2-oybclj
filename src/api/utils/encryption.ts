import bcrypt from 'bcrypt';
import crypto from 'crypto';

// Global constants
const SALT_ROUNDS = 10;
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;

/**
 * Hashes a plain text password using bcrypt
 * @param password The plain text password to hash
 * @returns A promise that resolves to the hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  // Generate a salt using bcrypt.genSalt with SALT_ROUNDS
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  
  // Hash the password using bcrypt.hash with the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);
  
  // Return the hashed password
  return hashedPassword;
}

/**
 * Compares a plain text password with a hashed password
 * @param password The plain text password to compare
 * @param hashedPassword The hashed password to compare against
 * @returns A promise that resolves to true if passwords match, false otherwise
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  // Use bcrypt.compare to check if the plain text password matches the hashed password
  const isMatch = await bcrypt.compare(password, hashedPassword);
  
  // Return the result of the comparison
  return isMatch;
}

/**
 * Encrypts sensitive data using AES-256-CBC
 * @param text The text to encrypt
 * @returns Encrypted data in hex format
 */
export function encrypt(text: string): string {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is not set');
  }

  // Generate a random initialization vector (IV)
  const iv = crypto.randomBytes(IV_LENGTH);

  // Create a cipher using crypto.createCipheriv with AES-256-CBC, ENCRYPTION_KEY, and IV
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

  // Encrypt the text using the cipher
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Concatenate the IV and encrypted data
  const result = iv.toString('hex') + ':' + encrypted.toString('hex');

  // Return the result as a hex string
  return result;
}

/**
 * Decrypts data that was encrypted using the encrypt function
 * @param encryptedData The encrypted data in hex format
 * @returns Decrypted text
 */
export function decrypt(encryptedData: string): string {
  if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY is not set');
  }

  // Convert the encrypted data from hex to a buffer
  const textParts = encryptedData.split(':');
  const iv = Buffer.from(textParts.shift()!, 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');

  // Create a decipher using crypto.createDecipheriv with AES-256-CBC, ENCRYPTION_KEY, and IV
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);

  // Decrypt the data using the decipher
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // Return the decrypted text
  return decrypted.toString();
}

// Human tasks (commented)
/*
TODO: Ensure that the ENCRYPTION_KEY environment variable is securely set in production
TODO: Implement key rotation mechanism for the encryption key
TODO: Conduct a security audit of the encryption implementation
*/