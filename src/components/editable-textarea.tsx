'use client';

import React, { forwardRef } from 'react';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

export interface EditableTextareaProps extends Omit<TextareaAutosizeProps, 'style'> {
  style?: React.CSSProperties;
}

export const EditableTextarea = forwardRef<HTMLTextAreaElement, EditableTextareaProps>(
  ({ value, onChange, onBlur, onKeyDown, style, ...props }, ref) => {
    const baseStyle = {
      border: 'none',
      outline: 'none',
      resize: 'none',
      width: '100%',
      background: 'transparent',
      display: 'block',
      ...style,
    } satisfies React.CSSProperties;

    return (
      <TextareaAutosize
        ref={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        style={baseStyle as React.ComponentProps<typeof TextareaAutosize>['style']}
        className="resize-none"
        {...props}
      />
    );
  }
);

EditableTextarea.displayName = 'EditableTextarea';
