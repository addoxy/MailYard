'use client';

import { EditableTextarea } from '@/components/editable-textarea';
import { useInlineEditing } from '@/hooks/use-inline-editing';
import { blockDefaults, createBaseStyle } from '@/lib/style-utils';
import { Link } from '@react-email/components';
import { useRef } from 'react';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { LinkBlockProps } from './types';

const defaults = blockDefaults.link;

export function LinkBlock({
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
}: LinkBlockProps) {
  const { updateBlock } = useEmailBlocks();
  const pointerStartPos = useRef<{ x: number; y: number } | null>(null);
  const hasMoved = useRef(false);

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

  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartPos.current = { x: e.clientX, y: e.clientY };
    hasMoved.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (pointerStartPos.current) {
      const dx = Math.abs(e.clientX - pointerStartPos.current.x);
      const dy = Math.abs(e.clientY - pointerStartPos.current.y);
      if (dx > 5 || dy > 5) {
        hasMoved.current = true;
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Only trigger onClick if pointer hasn't moved (not a drag)
    if (!hasMoved.current && onClick) {
      onClick(id);
    }
    pointerStartPos.current = null;
    hasMoved.current = false;
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
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    }),
    cursor: onClick ? 'pointer' : 'default',
    display: 'block',
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
            outline: 'none',
            backgroundColor: 'transparent',
            border: 'none',
            width: '100%',
            overflow: 'hidden',
            minHeight: 'auto',
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={containerStyle}
      onDoubleClick={handleDoubleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    >
      <Link href={href} style={baseStyle} onClick={handleClick}>
        {content}
      </Link>
    </div>
  );
}
