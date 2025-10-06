'use client';

import { cn } from '@/lib/utils';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode } from 'react';

type DndKitListeners = SyntheticListenerMap & {
  onPointerDown?: (event: React.PointerEvent) => void;
};

interface SortableEmailBlockProps {
  id: string;
  children: ReactNode;
  isSelected?: boolean;
}

export function SortableEmailBlock({ id, children }: SortableEmailBlockProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const typedListeners = listeners as DndKitListeners | undefined;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const target = e.target as HTMLElement;
    const isEditable = target.closest('textarea, input, [contenteditable="true"]');

    if (isEditable) {
      e.stopPropagation();
      return;
    }

    typedListeners?.onPointerDown?.(e);
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        zIndex: isDragging ? 1000 : 'auto',
      }}
      {...attributes}
      onPointerDown={handlePointerDown}
      className={cn(
        'group relative cursor-grab transition-all duration-150 active:cursor-grabbing',
        isDragging && 'opacity-50'
      )}
    >
      {children}
    </div>
  );
}
