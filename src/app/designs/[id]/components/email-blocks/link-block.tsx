'use client';

import { Link } from '@react-email/components';
import { useInlineEditing } from '../../../../../hooks/use-inline-editing';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { LinkBlockProps } from './types';

export function LinkBlock({
  id,
  content = 'Click here',
  href = '#',
  textAlign = 'left',
  fontSize = '16px',
  fontWeight = '400',
  color = '#3b82f6',
  backgroundColor = 'transparent',
  borderWidth = '0px',
  borderColor = '#3b82f6',
  borderStyle = 'solid',
  borderRadius = '0px',
  fontFamily = 'inherit',
  lineHeight = '1.5',
  letterSpacing = '0px',
  textDecoration = 'underline',
  marginTop = '0px',
  marginBottom = '16px',
  marginLeft = '0px',
  marginRight = '0px',
  paddingTop = '0px',
  paddingBottom = '0px',
  paddingLeft = '0px',
  paddingRight = '0px',
  isSelected = false,
  onClick,
}: LinkBlockProps) {
  const { updateBlock } = useEmailBlocks();

  const {
    isEditing,
    editContent,
    inputRef,
    handleDoubleClick,
    handleSave,
    handleContentChange,
    handleKeyDown,
  } = useInlineEditing({
    content,
    isSelected,
    onSave: (newContent) => updateBlock(id, { content: newContent }),
    multiline: true,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(id);
    }
  };

  const baseStyle = {
    fontSize,
    fontWeight,
    color,
    backgroundColor: backgroundColor === 'transparent' ? 'transparent' : backgroundColor,
    border: borderWidth !== '0px' ? `${borderWidth} ${borderStyle} ${borderColor}` : 'none',
    borderRadius,
    fontFamily,
    lineHeight,
    letterSpacing,
    textDecoration,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    cursor: onClick ? 'pointer' : 'default',
    display: 'inline-block',
  };

  const containerStyle = {
    textAlign: textAlign as 'left' | 'center' | 'right',
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  };

  return (
    <div style={containerStyle}>
      {isEditing ? (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          value={editContent}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          style={{
            ...baseStyle,
            outline: '2px solid #3b82f6',
            outlineOffset: '2px',
            backgroundColor: 'transparent',
            border: 'none',
            width: 'auto',
            minWidth: '80px',
          }}
        />
      ) : (
        <Link href={href} style={baseStyle} onClick={handleClick} onDoubleClick={handleDoubleClick}>
          {content}
        </Link>
      )}
    </div>
  );
}
