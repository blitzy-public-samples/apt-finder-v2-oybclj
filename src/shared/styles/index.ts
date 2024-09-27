// src/shared/styles/index.ts

// Import all style variables
import * as variables from './variables';

// Import all style mixins
import * as mixins from './mixins';

// Export the imported modules
export { variables, mixins };

// Human Tasks:
// TODO: Review and adjust the color palette in variables.ts to ensure it matches the design requirements
// TODO: Add any additional custom mixins required for the project in mixins.ts

/**
 * This file serves as the main entry point for shared styles across the Apartment Finder web application.
 * It exports all style-related constants, variables, and mixins to be used throughout the frontend components.
 * 
 * Usage:
 * import { variables, mixins } from 'src/shared/styles';
 * 
 * Then you can use the imported styles in your components:
 * const StyledComponent = styled.div`
 *   color: ${variables.colors.primary};
 *   ${mixins.flexCenter}
 * `;
 */

// Note: The actual implementation of variables and mixins should be defined in their respective files.
// This file acts as a centralized export point for easy importing in other parts of the application.