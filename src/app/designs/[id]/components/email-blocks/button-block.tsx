'use client';

import { Button } from '@react-email/components';
import { useEffect, useRef, useState } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateBlock } = useEmailBlocks();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  // Auto-focus when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

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
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    cursor: onClick ? 'pointer' : 'default',
    display: 'inline-block',
  };

  const containerStyle = {
    textAlign: textAlign as 'left' | 'center' | 'right',
    margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
  };

  if (isEditing) {
    return (
      <div style={containerStyle}>
        <input
          ref={inputRef}
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
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
