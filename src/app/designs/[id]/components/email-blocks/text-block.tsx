import { Text } from '@react-email/components';
import { TextBlockProps } from './types';

export function TextBlock({
  id,
  content = 'Your text content goes here. You can edit this text and style it however you like.',
  textAlign = 'left',
  fontSize = '16px',
  fontWeight = 'normal',
  color = '#000000',
  fontFamily = 'Arial, sans-serif',
  lineHeight = '1.5',
  marginTop = '0px',
  marginBottom = '16px',
  marginLeft = '0px',
  marginRight = '0px',
  paddingTop = '0px',
  paddingBottom = '0px',
  paddingLeft = '0px',
  paddingRight = '0px',
  isSelected = false,
  onClick
}: TextBlockProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const baseStyle = {
    fontSize,
    fontWeight,
    color,
    fontFamily,
    lineHeight,
    textAlign,
    margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    cursor: onClick ? 'pointer' : 'default',
    outline: isSelected ? '2px solid #3b82f6' : 'none',
    outlineOffset: isSelected ? '2px' : '0',
    transition: 'outline 0.2s ease-in-out',
    whiteSpace: 'pre-wrap' as const,
  };

  return (
    <Text
      style={baseStyle}
      onClick={handleClick}
    >
      {content}
    </Text>
  );
}