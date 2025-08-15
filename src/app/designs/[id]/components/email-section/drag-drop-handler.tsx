'use client';

import { ReactNode, useState } from 'react';
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useDragDrop } from '../../hooks/use-drag-drop';
import { EmailBlockType } from '../email-blocks/types';

interface DragDropHandlerProps {
  children: ReactNode;
  blocks: EmailBlockType[];
  renderBlock: (block: EmailBlockType) => ReactNode;
}

export function DragDropHandler({ children, blocks, renderBlock }: DragDropHandlerProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedBlock, setDraggedBlock] = useState<EmailBlockType | null>(null);
  
  const {
    handleDragStart: originalHandleDragStart,
    handleDragOver,
    handleDragEnd: originalHandleDragEnd,
    sortingStrategy,
  } = useDragDrop();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px of movement required to start drag
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    const draggedBlockData = blocks.find(block => block.id === event.active.id);
    setDraggedBlock(draggedBlockData || null);
    originalHandleDragStart(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    setDraggedBlock(null);
    originalHandleDragEnd(event);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={blocks.map(block => block.id)} strategy={sortingStrategy}>
        <div className="relative">
          {children}
          
          {/* Global drag overlay effect */}
          {isDragging && (
            <div className="absolute inset-0 bg-blue-500 pointer-events-none rounded-md opacity-5" />
          )}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={{
        duration: 200,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        {draggedBlock ? (
          <div className="bg-white shadow-lg rounded-md border border-blue-400 opacity-80 scale-105">
            {renderBlock(draggedBlock)}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}