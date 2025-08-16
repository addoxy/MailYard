'use client';

import { Hr } from '@react-email/components';
import { blockDefaults } from '../../../../../lib/style-utils';
import { DividerBlockProps } from './types';

const defaults = blockDefaults.divider;

export function DividerBlock({
  id,
  width = defaults.width,
  height = defaults.height,
  borderWidth = defaults.borderWidth,
  borderColor = defaults.borderColor,
  borderStyle = defaults.borderStyle,
  marginTop = defaults.marginTop,
  marginBottom = defaults.marginBottom,
  marginLeft = defaults.marginLeft,
  marginRight = defaults.marginRight,
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
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
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