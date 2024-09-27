import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  font-family: 'Open Sans', sans-serif;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  /* Size styles */
  ${(props) => {
    switch (props.size) {
      case 'small':
        return `
          padding: 8px 16px;
          font-size: 14px;
        `;
      case 'large':
        return `
          padding: 16px 24px;
          font-size: 18px;
        `;
      default: // medium
        return `
          padding: 12px 20px;
          font-size: 16px;
        `;
    }
  }}

  /* Variant styles */
  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: #4A90E2;
          color: #FFFFFF;
          border: none;
          &:hover {
            background-color: #357ABD;
          }
        `;
      case 'secondary':
        return `
          background-color: #50E3C2;
          color: #FFFFFF;
          border: none;
          &:hover {
            background-color: #3CC7A8;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: #4A90E2;
          border: 2px solid #4A90E2;
          &:hover {
            background-color: rgba(74, 144, 226, 0.1);
          }
        `;
      default:
        return `
          background-color: #4A90E2;
          color: #FFFFFF;
          border: none;
          &:hover {
            background-color: #357ABD;
          }
        `;
    }
  }}

  /* Disabled state */
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background-color: inherit;
    }
  `}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  onClick,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;