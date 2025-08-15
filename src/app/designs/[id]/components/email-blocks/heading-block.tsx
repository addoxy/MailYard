'use client';

import { Heading } from '@react-email/components';
import { useEffect, useRef, useState } from 'react';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { HeadingBlockProps } from './types';

export function HeadingBlock({
  id,
  content = 'Your heading text',
  level = 1,
  textAlign = 'left',
  fontSize = '32px',
  fontWeight = '700',
  color = '#000000',
  fontFamily = 'inherit',
  lineHeight = '1.4',
  letterSpacing = '0px',
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
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
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
    fontFamily,
    lineHeight,
    letterSpacing,
    textAlign,
    margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    cursor: onClick ? 'pointer' : 'default',
  };

  if (isEditing) {
    return (
      <div style={{ margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}` }}>
        <input
          ref={inputRef}
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
            letterSpacing,
            textAlign,
            padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
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
    <Heading
      as={`h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'}
      style={baseStyle}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {content}
    </Heading>
  );
}
