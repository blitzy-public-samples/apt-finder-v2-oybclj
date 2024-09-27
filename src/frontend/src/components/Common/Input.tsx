import React from 'react';
import styled from 'styled-components';

interface InputProps {
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  label?: string;
}

const InputContainer = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 10px;
  border: 1px solid ${props => props.hasError ? props.theme.colors.error : props.theme.colors.border};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
  }

  &:hover {
    border-color: ${props => props.theme.colors.primaryLight};
  }

  &:disabled {
    background-color: ${props => props.theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.error};
  font-size: 12px;
  margin-top: 5px;
`;

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  label,
}) => {
  return (
    <InputContainer>
      {label && <StyledLabel htmlFor={name}>{label}</StyledLabel>}
      <StyledInput
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        hasError={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default Input;