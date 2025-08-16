import { CSSProperties } from 'react';

/**
 * Convert px string values to numeric values
 * @param value - String value like "20px" or "20"
 * @returns Numeric value (e.g., 20)
 */
export const pxToNumber = (value: string): number => {
  return parseInt(value?.replace('px', '') || '0');
};

/**
 * Convert numeric values to px string values
 * @param value - Numeric value (e.g., 20)
 * @returns String value with px unit (e.g., "20px")
 */
export const numberToPx = (value: number): string => {
  return `${value}px`;
};

/**
 * Convert line height string to numeric value (unitless)
 * @param value - String value like "1.5" or "1"
 * @returns Numeric value for line height
 */
export const lineHeightToNumber = (value: string): number => {
  return parseFloat(value || '1.5');
};

/**
 * Convert numeric line height to string
 * @param value - Numeric line height value
 * @returns String value for line height
 */
export const numberToLineHeight = (value: number): string => {
  return value.toString();
};

/**
 * Validate style values based on their type
 * @param value - Value to validate
 * @param type - Type of validation to perform
 * @returns Whether the value is valid
 */
export const validateStyleValue = (value: unknown, type: 'px' | 'color' | 'string'): boolean => {
  if (value === null || value === undefined) return false;
  
  switch (type) {
    case 'px':
      return typeof value === 'string' && /^\d+px$/.test(value);
    case 'color':
      return typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value);
    case 'string':
      return typeof value === 'string' && value.length > 0;
    default:
      return false;
  }
};

/**
 * Style properties for creating base styles
 */
export interface StyleProps {
  // Spacing
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  
  // Typography
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: string;
  textDecoration?: string;
  color?: string;
  
  // Background and borders
  backgroundColor?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  borderRadius?: string;
  
  // Layout
  maxWidth?: string;
  width?: string;
  height?: string;
}

/**
 * Create a base CSS style object from style properties
 * @param props - Style properties object
 * @returns CSS properties object with only defined values
 */
export const createBaseStyle = (props: StyleProps): CSSProperties => {
  const style: CSSProperties = {};
  
  // Only include properties that have defined values
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      // Handle font family inheritance
      if (key === 'fontFamily' && value === 'inherit') {
        // Don't set fontFamily if it's inherit - let it inherit naturally
        return;
      }
      
      (style as Record<string, string>)[key] = value;
    }
  });
  
  return style;
};

/**
 * Font weight options for dropdowns
 */
export const fontWeightOptions = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Normal' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' },
];

/**
 * Font family options for dropdowns
 */
export const fontFamilyOptions = [
  { value: 'Inter, system-ui, -apple-system, sans-serif', label: 'Inter' },
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Courier New, monospace', label: 'Courier New' },
];

/**
 * Border style options for dropdowns
 */
export const borderStyleOptions = [
  { value: 'none', label: 'None' },
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
];