'use client';

import { Text } from '@react-email/components';
import { useState, useRef, useEffect } from 'react';
import { TextBlockProps } from './types';
import { useEmailBlocks } from '../../hooks/use-email-blocks';

export function TextBlock({
  id,
  content = 'Your text content goes here. You can edit this text and style it however you like.',
  textAlign = 'left',
  fontSize = '16px',
  fontWeight = 'normal',
  color = '#000000',
  fontFamily = 'Arial, sans-serif',
  lineHeight = '1.5',
  marginTop = '0px',
  marginBottom = '16px',
  marginLeft = '0px',
  marginRight = '0px',
  paddingTop = '0px',
  paddingBottom = '0px',
  paddingLeft = '0px',
  paddingRight = '0px',
  isSelected = false,
  onClick
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
    if (e.key === 'Enter' && e.ctrlKey) {
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

  const baseStyle = {
    fontSize,
    fontWeight,
    color,
    fontFamily,
    lineHeight,
    textAlign,
    margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    cursor: onClick ? 'pointer' : 'default',
    whiteSpace: 'pre-wrap' as const,
  };

  if (isEditing) {
    return (
      <div style={{ margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}` }}>
        <textarea
          ref={textareaRef}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          style={{
            fontSize,
            fontWeight,
            color,
            fontFamily,
            lineHeight,
            textAlign,
            padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
            border: '2px solid #3b82f6',
            borderRadius: '4px',
            outline: 'none',
            resize: 'none',
            width: '100%',
            minHeight: '40px',
            background: 'white',
          }}
        />
        <div style={{ marginTop: '4px', fontSize: '12px', color: '#6b7280' }}>
          Press Ctrl+Enter to save, Escape to cancel
        </div>
      </div>
    );
  }

  return (
    <Text
      style={baseStyle}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {content}
    </Text>
  );
}