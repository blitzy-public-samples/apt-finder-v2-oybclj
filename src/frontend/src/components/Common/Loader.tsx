import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define the LoaderProps interface
interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  fullScreen?: boolean;
}

// Helper function to determine the size of the loader
const getSize = (size: LoaderProps['size'] = 'medium'): string => {
  switch (size) {
    case 'small':
      return '20px';
    case 'large':
      return '60px';
    default:
      return '40px';
  }
};

// Create a keyframe animation for the spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Styled component for the loader container
const LoaderContainer = styled.div<LoaderProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ fullScreen }) =>
    fullScreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
  `}
`;

// Styled component for the spinning animation
const SpinnerAnimation = styled.div<LoaderProps>`
  width: ${({ size }) => getSize(size)};
  height: ${({ size }) => getSize(size)};
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${({ color }) => color || '#4A90E2'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Loader component
const Loader: React.FC<LoaderProps> = ({ size = 'medium', color, fullScreen = false }) => {
  return (
    <LoaderContainer fullScreen={fullScreen}>
      <SpinnerAnimation size={size} color={color} />
    </LoaderContainer>
  );
};

export default Loader;