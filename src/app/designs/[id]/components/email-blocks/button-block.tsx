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
  const [editHref, setEditHref] = useState(href);
  const inputRef = useRef<HTMLInputElement>(null);
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
      setEditHref(href);
    }
  };

  const handleSave = () => {
    updateBlock(id, { content: editContent, href: editHref });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setEditHref(href);
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
    textAlign,
    margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    cursor: onClick ? 'pointer' : 'default',
    textDecoration: 'none',
    display: 'inline-block',
  };

  if (isEditing) {
    return (
      <div style={{ margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}` }}>
        <div style={{ marginBottom: '8px' }}>
          <label
            style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}
          >
            Button Text:
          </label>
          <input
            ref={inputRef}
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              fontSize,
              fontWeight,
              color: '#000',
              fontFamily,
              padding: '8px 12px',
              border: 'none',
              borderRadius: '4px',
              outline: 'none',
              width: '100%',
              background: 'white',
            }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label
            style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}
          >
            Link URL:
          </label>
          <input
            value={editHref}
            onChange={(e) => setEditHref(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            style={{
              fontSize: '14px',
              color: '#000',
              fontFamily,
              padding: '8px 12px',
              border: 'none',
              borderRadius: '4px',
              outline: 'none',
              width: '100%',
              background: 'white',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: textAlign as 'left' | 'center' | 'right' }}>
      <Button href={href} style={baseStyle} onClick={handleClick} onDoubleClick={handleDoubleClick}>
        {content}
      </Button>
    </div>
  );
}
