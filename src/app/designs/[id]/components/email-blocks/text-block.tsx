'use client';

import { Text } from '@react-email/components';
import { useEffect, useRef, useState } from 'react';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { updateBlock } = useEmailBlocks();

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      setIsEditing(true);
      setEditContent(content);
    }
  };

  const handleSave = () => {
    updateBlock(id, { content: editContent });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Auto-focus and resize textarea when editing starts
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [isEditing]);

  // Auto-resize textarea as content changes
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
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
          ref={textareaRef}
          value={editContent}
          onChange={handleTextChange}
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
