'use client';

import { blockDefaults } from '@/lib/style-utils';
import { Hr } from '@react-email/components';
import { DividerBlockProps } from './types';

const defaults = blockDefaults.divider;

export function DividerBlock({
  id,
  width = defaults.width,
  height = defaults.height,
  color = defaults.color,
  textAlign = defaults.textAlign,
  marginTop = defaults.marginTop,
  marginBottom = defaults.marginBottom,
  marginLeft = defaults.marginLeft,
  marginRight = defaults.marginRight,
  isSelected = false,
  onClick,
}: DividerBlockProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const getDividerAlignment = () => {
    switch (textAlign) {
      case 'center':
        return { marginLeft: 'auto', marginRight: 'auto' };
      case 'right':
        return { marginLeft: 'auto', marginRight: '0' };
      case 'left':
      default:
        return { marginLeft: '0', marginRight: 'auto' };
    }
  };

  const containerStyle = {
    width: '100%',
    marginTop,
    marginBottom,
  };

  const hrStyle = {
    width,
    height: '0px',
    border: 'none',
    borderTop: `${height} solid ${color}`,
    cursor: onClick ? 'pointer' : 'default',
    backgroundColor: 'transparent',
    margin: '0',
    display: 'block',
    ...getDividerAlignment(),
  };

  return (
    <div style={containerStyle}>
      <Hr style={hrStyle} onClick={handleClick} />
    </div>
  );
}
