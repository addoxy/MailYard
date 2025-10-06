'use client';

import { useEffect, useRef, useState } from 'react';

interface UseInlineEditingOptions {
  /** Initial content value */
  content: string;
  /** Whether the block is currently selected */
  isSelected: boolean;
  /** Callback to update the block with new content */
  onSave: (content: string) => void;
  /** Whether to use textarea (for multi-line) or input (for single-line) */
  multiline?: boolean;
}

interface UseInlineEditingReturn {
  /** Whether currently in editing mode */
  isEditing: boolean;
  /** Current content being edited */
  editContent: string;
  /** Ref for the input/textarea element */
  inputRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  /** Handler for double-click to enter editing mode */
  handleDoubleClick: (e: React.MouseEvent) => void;
  /** Handler to save changes and exit editing */
  handleSave: () => void;
  /** Handler to cancel changes and exit editing */
  handleCancel: () => void;
  /** Handler for keyboard shortcuts (Enter to save, Escape to cancel) */
  handleKeyDown: (e: React.KeyboardEvent) => void;
  /** Handler for content changes */
  handleContentChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** Sets editing state */
  setIsEditing: (editing: boolean) => void;
  /** Sets edit content */
  setEditContent: (content: string) => void;
}

/**
 * Shared hook for inline editing functionality across text-based email blocks
 */
export function useInlineEditing({
  content,
  isSelected,
  onSave,
  multiline = false,
}: UseInlineEditingOptions): UseInlineEditingReturn {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      setIsEditing(true);
      setEditContent(content);
    }
  };

  const handleSave = () => {
    onSave(editContent.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (multiline) {
        if (e.shiftKey) {
          return;
        } else {
          e.preventDefault();
          handleSave();
        }
      } else {
        e.preventDefault();
        handleSave();
      }
    } else if (e.key === 'Escape') {
      inputRef.current?.blur();
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();

      if ('select' in inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEditing, multiline]);

  return {
    isEditing,
    editContent,
    inputRef,
    handleDoubleClick,
    handleSave,
    handleCancel,
    handleKeyDown,
    handleContentChange,
    setIsEditing,
    setEditContent,
  };
}
