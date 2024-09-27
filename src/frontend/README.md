This is the frontend part of the Apartment Finder web service, a comprehensive solution designed to assist recent college graduates in finding suitable rental apartments.

## Technologies Used

- React
- TypeScript
- Redux
- Axios
- Jest
- Bootstrap

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository
2. Navigate to the src/frontend directory
3. Run 'npm install' to install dependencies

### Running Locally

1. Run 'npm start' to start the development server
2. Open http://localhost:3000 to view it in the browser

## Project Structure

Overview of the main directories and their purposes:

- src/components: Reusable React components
- src/pages: React components representing full pages
- src/store: Redux store configuration and slices
- src/services: API service functions
- src/utils: Utility functions and helpers
- src/hooks: Custom React hooks
- src/types: TypeScript type definitions
- src/constants: Constant values and configurations
- src/styles: Global styles and theme configurations
- src/tests: Test files for components and utilities

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner in interactive watch mode
- `npm run build`: Builds the app for production to the build folder
- `npm run lint`: Runs ESLint to check for code style issues
- `npm run format`: Runs Prettier to format all code files

## Coding Standards

Guidelines for maintaining consistent code quality:

- Use TypeScript for all .ts and .tsx files
- Follow the Airbnb JavaScript Style Guide
- Use functional components and hooks instead of class components
- Write unit tests for all components and utility functions
- Use meaningful variable and function names
- Keep components small and focused on a single responsibility
- Use Redux for global state management
- Use CSS-in-JS with styled-components for component styling

## API Integration

Information about integrating with the backend API:

- Base URL: process.env.REACT_APP_API_BASE_URL
- Authentication: JWT tokens stored in localStorage
- Error handling: Centralized error handling in api.ts service

## Deployment

Instructions for deploying the frontend application:

1. Run 'npm run build' to create a production build
2. Deploy the contents of the 'build' folder to your web server
3. Ensure all API requests are directed to the correct backend URL

## Contributing

Guidelines for contributing to the project:

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes and commit them
4. Push to your fork and submit a pull request
5. Ensure all tests pass and no linting errors are present

## Troubleshooting

Common issues and their solutions:

1. API requests failing
   - Solution: Check if the REACT_APP_API_BASE_URL is set correctly in your .env file

2. TypeScript compilation errors
   - Solution: Ensure all required types are properly imported and defined

## Contact

For any questions or support, please contact:
frontend-support@apartmentfinder.com

<!-- Human Tasks -->
<!--
TODO: Review and update the README content to ensure it accurately reflects the current state of the frontend project
TODO: Add any project-specific details or conventions that are not covered in this general template
TODO: Verify that the listed scripts in 'available_scripts' match the actual scripts defined in package.json
TODO: Confirm the correct email address for the frontend support contact
-->