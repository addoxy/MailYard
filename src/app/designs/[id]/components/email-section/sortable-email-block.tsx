'use client';

import { ReactNode, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableEmailBlockProps {
  id: string;
  children: ReactNode;
  isSelected?: boolean;
}

export function SortableEmailBlock({ id, children, isSelected }: SortableEmailBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative cursor-grab active:cursor-grabbing transition-all duration-150
        ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
        ${isDragging ? 'z-50 shadow-lg opacity-70 scale-105' : ''}
        ${isHovered && !isDragging && !isSelected ? 'ring-1 ring-gray-200' : ''}
      `}
    >
      {/* Top drop indicator */}
      {isOver && (
        <div className="absolute -top-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-sm transition-all duration-100" />
      )}
      
      {/* Drag handle indicator */}
      <div
        className={`absolute left-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-300 rounded-full transition-opacity duration-150 ${
          isHovered && !isDragging ? 'opacity-40' : 'opacity-0'
        }`}
      />
      
      {children}
      
      {/* Bottom drop indicator */}
      {isOver && (
        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-sm transition-all duration-100" />
      )}

      {/* Dragging overlay effect */}
      {isDragging && (
        <div className="absolute inset-0 bg-blue-500 pointer-events-none opacity-5" />
      )}
    </div>
  );
}