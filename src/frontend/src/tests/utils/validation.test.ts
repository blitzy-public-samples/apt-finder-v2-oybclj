import { describe, it, expect } from '@jest/globals';
import {
  isValidEmail,
  isValidPassword,
  isValidZipCode,
  validateLoginForm,
  validateSignupForm,
  validateFilterForm,
  validateFormField
} from '../../utils/validation';

describe('isValidEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
  });
});

describe('isValidPassword', () => {
  it('should return true for valid passwords', () => {
    expect(isValidPassword('StrongP@ssw0rd')).toBe(true);
    expect(isValidPassword('AnotherG00d1!')).toBe(true);
  });

  it('should return false for invalid passwords (too short, missing required characters)', () => {
    expect(isValidPassword('weak')).toBe(false);
    expect(isValidPassword('onlylowercase')).toBe(false);
    expect(isValidPassword('ONLYUPPERCASE')).toBe(false);
    expect(isValidPassword('123456789')).toBe(false);
  });
});

describe('isValidZipCode', () => {
  it('should return true for valid US zip codes', () => {
    expect(isValidZipCode('12345')).toBe(true);
    expect(isValidZipCode('12345-6789')).toBe(true);
  });

  it('should return false for invalid zip codes', () => {
    expect(isValidZipCode('1234')).toBe(false);
    expect(isValidZipCode('123456')).toBe(false);
    expect(isValidZipCode('12345-67890')).toBe(false);
  });
});

describe('validateLoginForm', () => {
  it('should return no errors for valid login data', () => {
    const result = validateLoginForm({ email: 'test@example.com', password: 'ValidP@ssw0rd' });
    expect(result).toEqual({});
  });

  it('should return errors for invalid email', () => {
    const result = validateLoginForm({ email: 'invalid-email', password: 'ValidP@ssw0rd' });
    expect(result).toHaveProperty('email');
  });

  it('should return errors for missing password', () => {
    const result = validateLoginForm({ email: 'test@example.com', password: '' });
    expect(result).toHaveProperty('password');
  });

  it('should return errors for both invalid email and missing password', () => {
    const result = validateLoginForm({ email: 'invalid-email', password: '' });
    expect(result).toHaveProperty('email');
    expect(result).toHaveProperty('password');
  });
});

describe('validateSignupForm', () => {
  it('should return no errors for valid signup data', () => {
    const result = validateSignupForm({
      email: 'test@example.com',
      password: 'ValidP@ssw0rd',
      confirmPassword: 'ValidP@ssw0rd',
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(result).toEqual({});
  });

  it('should return errors for invalid email', () => {
    const result = validateSignupForm({
      email: 'invalid-email',
      password: 'ValidP@ssw0rd',
      confirmPassword: 'ValidP@ssw0rd',
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(result).toHaveProperty('email');
  });

  it('should return errors for invalid password', () => {
    const result = validateSignupForm({
      email: 'test@example.com',
      password: 'weak',
      confirmPassword: 'weak',
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(result).toHaveProperty('password');
  });

  it('should return errors for mismatched password confirmation', () => {
    const result = validateSignupForm({
      email: 'test@example.com',
      password: 'ValidP@ssw0rd',
      confirmPassword: 'DifferentP@ssw0rd',
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(result).toHaveProperty('confirmPassword');
  });

  it('should return errors for missing required fields', () => {
    const result = validateSignupForm({
      email: 'test@example.com',
      password: 'ValidP@ssw0rd',
      confirmPassword: 'ValidP@ssw0rd',
      firstName: '',
      lastName: ''
    });
    expect(result).toHaveProperty('firstName');
    expect(result).toHaveProperty('lastName');
  });
});

describe('validateFilterForm', () => {
  it('should return no errors for valid filter data', () => {
    const result = validateFilterForm({
      minRent: '500',
      maxRent: '2000',
      bedrooms: '2',
      bathrooms: '1',
      zipCode: '12345'
    });
    expect(result).toEqual({});
  });

  it('should return errors for invalid numeric fields (e.g., negative rent values)', () => {
    const result = validateFilterForm({
      minRent: '-100',
      maxRent: '2000',
      bedrooms: '2',
      bathrooms: '1',
      zipCode: '12345'
    });
    expect(result).toHaveProperty('minRent');
  });

  it('should return errors for invalid zip codes', () => {
    const result = validateFilterForm({
      minRent: '500',
      maxRent: '2000',
      bedrooms: '2',
      bathrooms: '1',
      zipCode: '1234'
    });
    expect(result).toHaveProperty('zipCode');
  });

  it('should return errors for missing required fields', () => {
    const result = validateFilterForm({
      minRent: '',
      maxRent: '',
      bedrooms: '',
      bathrooms: '',
      zipCode: ''
    });
    expect(result).toHaveProperty('minRent');
    expect(result).toHaveProperty('maxRent');
    expect(result).toHaveProperty('bedrooms');
    expect(result).toHaveProperty('bathrooms');
    expect(result).toHaveProperty('zipCode');
  });
});

describe('validateFormField', () => {
  it('should validate email field correctly', () => {
    expect(validateFormField('email', 'test@example.com')).toBe(true);
    expect(validateFormField('email', 'invalid-email')).toBe(false);
  });

  it('should validate password field correctly', () => {
    expect(validateFormField('password', 'StrongP@ssw0rd')).toBe(true);
    expect(validateFormField('password', 'weak')).toBe(false);
  });

  it('should validate zip code field correctly', () => {
    expect(validateFormField('zipCode', '12345')).toBe(true);
    expect(validateFormField('zipCode', '1234')).toBe(false);
  });

  it('should validate required fields', () => {
    expect(validateFormField('firstName', 'John')).toBe(true);
    expect(validateFormField('firstName', '')).toBe(false);
  });

  it('should validate custom validation rules', () => {
    const customRule = (value: string) => value.length > 5;
    expect(validateFormField('custom', 'longvalue', customRule)).toBe(true);
    expect(validateFormField('custom', 'short', customRule)).toBe(false);
  });
});

// Human tasks:
// - Review and approve the test cases for completeness and correctness
// - Ensure all edge cases are covered in the test suites
// - Add any additional test cases for frontend-specific validation scenarios