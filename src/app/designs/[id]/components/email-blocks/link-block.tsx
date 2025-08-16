'use client';

import { Link } from '@react-email/components';
import { useState, useRef, useEffect } from 'react';
import { LinkBlockProps } from './types';
import { useEmailBlocks } from '../../hooks/use-email-blocks';

export function LinkBlock({
  id,
  content = 'Click here',
  href = '#',
  textAlign = 'left',
  fontSize = '16px',
  fontWeight = '400',
  color = '#3b82f6',
  backgroundColor = 'transparent',
  borderWidth = '0px',
  borderColor = '#3b82f6',
  borderStyle = 'solid',
  borderRadius = '0px',
  fontFamily = 'inherit',
  lineHeight = '1.5',
  letterSpacing = '0px',
  textDecoration = 'underline',
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
}: LinkBlockProps) {
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
    backgroundColor: backgroundColor === 'transparent' ? 'transparent' : backgroundColor,
    border: borderWidth !== '0px' ? `${borderWidth} ${borderStyle} ${borderColor}` : 'none',
    borderRadius,
    fontFamily,
    lineHeight,
    letterSpacing,
    textDecoration,
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
            backgroundColor: 'transparent',
            border: 'none',
            width: 'auto',
            minWidth: '80px',
          }}
        />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <Link
        href={href}
        style={baseStyle}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {content}
      </Link>
    </div>
  );
}