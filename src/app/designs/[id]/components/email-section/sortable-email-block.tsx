'use client';

import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode, useState } from 'react';

interface SortableEmailBlockProps {
  id: string;
  children: ReactNode;
  isSelected?: boolean;
}

export function SortableEmailBlock({ id, children, isSelected }: SortableEmailBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, isOver } =
    useSortable({ id });

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
      className={cn(
        'group relative cursor-grab transition-all duration-150 active:cursor-grabbing',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        isDragging && 'z-50 opacity-70 shadow-lg ring-0 ring-offset-0',
        isHovered && !isDragging && !isSelected && 'ring-1 ring-gray-200'
      )}
    >
      {isDragging ? (
        <div className="pointer-events-none h-10 rounded-md border border-dashed border-blue-400/50 bg-blue-400/10" />
      ) : (
        children
      )}
    </div>
  );
}
