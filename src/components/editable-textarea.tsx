'use client';

import React, { forwardRef } from 'react';

export interface EditableTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  style?: React.CSSProperties;
  className?: string;
}

export const EditableTextarea = forwardRef<HTMLTextAreaElement, EditableTextareaProps>(
  (
    {
      value,
      onChange,
      onBlur,
      onKeyDown,
      style,
      className = 'field-sizing-content resize-none',
      ...props
    },
    ref
  ) => {
    const baseStyle: React.CSSProperties = {
      border: 'none',
      outline: 'none',
      resize: 'none',
      width: '100%',
      background: 'transparent',
      minHeight: 'auto',
      display: 'block',
      ...style,
    };

    return (
      <textarea
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        style={baseStyle}
        className={className}
        {...props}
      />
    );
  }
);

EditableTextarea.displayName = 'EditableTextarea';
