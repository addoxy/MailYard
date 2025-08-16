'use client';

import { Text } from '@react-email/components';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { useInlineEditing } from '../../../../../hooks/use-inline-editing';
import { blockDefaults } from '../../../../../lib/style-utils';
import { TextBlockProps } from './types';

const defaults = blockDefaults.text;

export function TextBlock({
  id,
  content = defaults.content,
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
}: TextBlockProps) {
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

  const handleClick = () => {
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
    textAlign,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    cursor: onClick ? 'pointer' : 'default',
    whiteSpace: 'pre-wrap' as const,
  };

  if (isEditing) {
    return (
      <div style={{ 
        marginTop,
        marginRight,
        marginBottom,
        marginLeft
      }}>
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editContent}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          style={{
            fontSize,
            fontWeight,
            color,
            fontFamily,
            lineHeight,
            letterSpacing,
            textAlign,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft,
            border: 'none',
            outline: 'none',
            resize: 'none',
            width: '100%',
            background: 'white',
          }}
        />
      </div>
    );
  }

  return (
    <Text style={baseStyle} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      {content}
    </Text>
  );
}
