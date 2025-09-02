'use client';

import { Heading } from '@react-email/components';
import { EditableTextarea } from '@/components/editable-textarea';
import { useInlineEditing } from '@/hooks/use-inline-editing';
import { blockDefaults, createBaseStyle } from '@/lib/style-utils';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { HeadingBlockProps } from './types';

const defaults = blockDefaults.heading;

export function HeadingBlock({
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
  width = defaults.width,
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
    multiline: true,
  });

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const baseStyle = {
    ...createBaseStyle({
      fontSize,
      fontWeight,
      color,
      backgroundColor,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
      fontFamily,
      lineHeight,
      letterSpacing,
      textDecoration,
      textAlign,
      width,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    }),
    cursor: onClick ? 'pointer' : 'default',
  };

  if (isEditing) {
    return (
      <div
        style={{
          width,
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
        }}
      >
        <EditableTextarea
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
            backgroundColor: backgroundColor === 'transparent' ? 'transparent' : backgroundColor,
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
