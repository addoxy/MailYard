'use client';

import { Button } from '@react-email/components';
import { useInlineEditing } from '../../../../../hooks/use-inline-editing';
import { blockDefaults } from '../../../../../lib/style-utils';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { ButtonBlockProps } from './types';

const defaults = blockDefaults.button;

export function ButtonBlock({
  id,
  content = defaults.content,
  href = defaults.href,
  textAlign = defaults.textAlign,
  fontSize = defaults.fontSize,
  fontWeight = defaults.fontWeight,
  color = defaults.color,
  backgroundColor = defaults.backgroundColor,
  borderWidth = defaults.borderWidth,
  borderColor = defaults.borderColor,
  borderStyle = defaults.borderStyle,
  borderRadius = defaults.borderRadius,
  fontFamily = defaults.fontFamily,
  lineHeight = defaults.lineHeight,
  letterSpacing = defaults.letterSpacing,
  textDecoration = defaults.textDecoration,
  marginTop = defaults.marginTop,
  marginBottom = defaults.marginBottom,
  marginLeft = defaults.marginLeft,
  marginRight = defaults.marginRight,
  paddingTop = defaults.paddingTop,
  paddingBottom = defaults.paddingBottom,
  paddingLeft = defaults.paddingLeft,
  paddingRight = defaults.paddingRight,
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
