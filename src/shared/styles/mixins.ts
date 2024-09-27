import { css } from 'styled-components';

// TODO: Import variables from './variables' once it's implemented
// import * as variables from './variables';

// A mixin for centering content using flexbox
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

// A mixin for applying consistent box shadow
export const boxShadow = (color: string = 'rgba(0, 0, 0, 0.1)') => css`
  box-shadow: 0 2px 4px ${color};
`;

// A mixin for truncating text with ellipsis
export const truncateText = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// A mixin for creating responsive font sizes
export const responsiveFont = (minSize: number, maxSize: number) => css`
  font-size: ${minSize}px;
  
  @media (min-width: 320px) {
    font-size: calc(${minSize}px + (${maxSize} - ${minSize}) * ((100vw - 320px) / (1920 - 320)));
  }
  
  @media (min-width: 1920px) {
    font-size: ${maxSize}px;
  }
`;

// A mixin for consistent button styling
export const buttonStyles = (bgColor: string, textColor: string) => css`
  background-color: ${bgColor};
  color: ${textColor};
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover, &:focus {
    opacity: 0.8;
  }
`;

// Human tasks:
// 1. Review and adjust the mixin parameters to ensure they meet the specific design requirements of the Apartment Finder application
// 2. Add any additional custom mixins that may be required for the project's unique styling needs