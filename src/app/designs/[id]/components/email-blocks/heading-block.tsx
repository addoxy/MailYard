'use client';

import { Heading } from '@react-email/components';
import { useInlineEditing } from '../../../../../hooks/use-inline-editing';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { HeadingBlockProps } from './types';

export function HeadingBlock({
  id,
  content = 'Your heading text',
  textAlign = 'left',
  fontSize = '32px',
  fontWeight = '700',
  color = '#000000',
  backgroundColor = 'transparent',
  borderWidth = '0px',
  borderColor = '#000000',
  borderStyle = 'solid',
  borderRadius = '0px',
  fontFamily = 'inherit',
  lineHeight = '1.4',
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
}: HeadingBlockProps) {
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
  };

  if (isEditing) {
    return (
      <div
        style={{
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
        }}
      >
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
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
            width: '100%',
            background: 'white',
          }}
        />
      </div>
    );
  }

  return (
    <Heading style={baseStyle} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      {content}
    </Heading>
  );
}
