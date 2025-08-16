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
  const [editHref, setEditHref] = useState(href);
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
    fontFamily,
    lineHeight,
    letterSpacing,
    textAlign,
    textDecoration,
    margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    cursor: onClick ? 'pointer' : 'default',
  };

  if (isEditing) {
    return (
      <div style={{ margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}` }}>
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
            Link Text:
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
          <label style={{ display: 'block', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
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
    <Link
      href={href}
      style={baseStyle}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {content}
    </Link>
  );
}