'use client';

import { EditableTextarea } from '@/components/editable-textarea';
import { useInlineEditing } from '@/hooks/use-inline-editing';
import { blockDefaults, createBaseStyle } from '@/lib/style-utils';
import { Button } from '@react-email/components';
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
    multiline: true,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(id);
    }
  };

  const getButtonAlignment = () => {
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
      textAlign: 'center',
      width,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    }),
    cursor: onClick ? 'pointer' : 'default',
  };

  const containerStyle = {
    textAlign: textAlign as 'left' | 'center' | 'right',
    width: '100%',
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
  };

  if (isEditing) {
    return (
      <div style={containerStyle}>
        <EditableTextarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editContent}
          onChange={handleContentChange}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          style={{
            ...baseStyle,
            border: 'none',
            textAlign: 'center',
            minWidth: 'auto',
            display: 'block',
            ...getButtonAlignment(),
          }}
        />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Button href={href} style={baseStyle} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {content}
      </Button>
    </div>
  );
}
