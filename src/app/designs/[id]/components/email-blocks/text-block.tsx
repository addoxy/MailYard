'use client';

import { Text } from '@react-email/components';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { useInlineEditing } from '../../../../../hooks/use-inline-editing';
import { TextBlockProps } from './types';

export function TextBlock({
  id,
  content = 'Your text content goes here. You can edit this text and style it however you like.',
  textAlign = 'left',
  fontSize = '16px',
  fontWeight = '400',
  color = '#000000',
  backgroundColor = 'transparent',
  borderWidth = '0px',
  borderColor = '#000000',
  borderStyle = 'solid',
  borderRadius = '0px',
  fontFamily = 'inherit',
  lineHeight = '1.5',
  letterSpacing = '0px',
  textDecoration = 'none',
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
