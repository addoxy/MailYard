'use client';

import { Hr } from '@react-email/components';
import { DividerBlockProps } from './types';

export function DividerBlock({
  id,
  width = '100%',
  height = '1px',
  borderWidth = '0px',
  borderColor = '#e5e7eb',
  borderStyle = 'solid',
  marginTop = '16px',
  marginBottom = '16px',
  marginLeft = '0px',
  marginRight = '0px',
  isSelected = false,
  onClick
}: DividerBlockProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const baseStyle = {
    width,
    height,
    border: 'none',
    borderTop: `${height} ${borderStyle} ${borderColor}`,
    margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
    cursor: onClick ? 'pointer' : 'default',
    backgroundColor: 'transparent',
  };

  return (
    <Hr
      style={baseStyle}
      onClick={handleClick}
    />
  );
}