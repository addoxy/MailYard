import { Heading } from '@react-email/components';
import { HeadingBlockProps } from './types';

export function HeadingBlock({
  id,
  content = 'Your heading text',
  level = 1,
  textAlign = 'left',
  fontSize = '32px',
  fontWeight = 'bold',
  color = '#000000',
  fontFamily = 'Arial, sans-serif',
  lineHeight = '1.4',
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
}: HeadingBlockProps) {
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
  };

  return (
    <Heading
      as={`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
      style={baseStyle}
      onClick={handleClick}
    >
      {content}
    </Heading>
  );
}