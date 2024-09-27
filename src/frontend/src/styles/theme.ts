// src/frontend/src/styles/theme.ts

import '../styles/variables.css';

// Interface defining the structure of the theme object
interface Theme {
  colors: {
    primary: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    white: string;
  };
  typography: {
    fontFamilyBase: string;
    fontFamilyHeading: string;
    fontSizeBase: string;
    fontSizeSm: string;
    fontSizeLg: string;
    fontSizeXl: string;
    fontSizeXxl: string;
    lineHeightBase: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: string;
  containerMaxWidth: string;
  boxShadow: string;
}

// The main theme object used throughout the application
export const theme: Theme = {
  colors: {
    primary: 'var(--color-primary)',
    primaryDark: 'var(--color-primary-dark)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)',
    background: 'var(--color-background)',
    text: 'var(--color-text)',
    white: 'var(--color-white)',
  },
  typography: {
    fontFamilyBase: 'var(--font-family-base)',
    fontFamilyHeading: 'var(--font-family-heading)',
    fontSizeBase: 'var(--font-size-base)',
    fontSizeSm: 'var(--font-size-sm)',
    fontSizeLg: 'var(--font-size-lg)',
    fontSizeXl: 'var(--font-size-xl)',
    fontSizeXxl: 'var(--font-size-xxl)',
    lineHeightBase: 'var(--line-height-base)',
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  },
  borderRadius: 'var(--border-radius)',
  containerMaxWidth: 'var(--container-max-width)',
  boxShadow: 'var(--box-shadow)',
};

export default theme;

// Human tasks:
// - Review the theme structure and ensure it covers all necessary design tokens for the Apartment Finder application
// - Confirm that the theme object is properly typed with TypeScript to provide good IDE support and catch potential errors
// - Consider adding helper functions for common theme operations (e.g., getting shades of colors, responsive font sizes)
// - Evaluate the need for additional theme properties specific to the Apartment Finder application (e.g., card styles, input styles)
// - Ensure that the theme object is properly exported and can be easily imported in other parts of the application