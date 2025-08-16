'use client';

import { Button } from '@react-email/components';
import { useInlineEditing } from '../../../../../hooks/use-inline-editing';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { ButtonBlockProps } from './types';

export function ButtonBlock({
  id,
  content = 'Click me',
  href = '#',
  textAlign = 'left',
  fontSize = '16px',
  fontWeight = '600',
  color = '#ffffff',
  backgroundColor = '#3b82f6',
  borderWidth = '0px',
  borderColor = '#3b82f6',
  borderStyle = 'solid',
  borderRadius = '8px',
  fontFamily = 'inherit',
  lineHeight = '1.5',
  letterSpacing = '0px',
  textDecoration = 'none',
  marginTop = '0px',
  marginBottom = '0px',
  marginLeft = '0px',
  marginRight = '0px',
  paddingTop = '12px',
  paddingBottom = '12px',
  paddingLeft = '24px',
  paddingRight = '24px',
  isSelected = false,
  onClick,
}: ButtonBlockProps) {
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
    multiline: false,
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
    backgroundColor,
    border: `${borderWidth} ${borderStyle} ${borderColor}`,
    borderRadius,
    fontFamily,
    lineHeight,
    letterSpacing,
    textDecoration,
    textAlign,
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
            border: 'none',
            width: `${Math.max(editContent.length * 8 + 48, 120)}px`,
            maxWidth: '100%',
          }}
        />
      ) : (
        <Button
          href={href}
          style={baseStyle}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
        >
          {content}
        </Button>
      )}
    </div>
  );
}
