'use client';

import { Link } from '@react-email/components';
import { useInlineEditing } from '../../../../../hooks/use-inline-editing';
import { blockDefaults } from '../../../../../lib/style-utils';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { LinkBlockProps } from './types';

const defaults = blockDefaults.link;

export function LinkBlock({
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
    <div style={containerStyle} onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editContent}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          style={{
            ...baseStyle,
            outline: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            width: '100%',
            resize: 'none',
            overflow: 'hidden',
            minHeight: 'auto',
          }}
        />
      ) : (
        <Link href={href} style={baseStyle} onClick={handleClick}>
          {content}
        </Link>
      )}
    </div>
  );
}
