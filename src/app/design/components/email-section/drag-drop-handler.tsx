'use client';

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { ReactNode, useState } from 'react';
import { useDragDrop } from '../../hooks/use-drag-drop';
import { renderBlock } from '../email-blocks/block-registry';
import { EmailBlockType } from '../email-blocks/types';

interface DragDropHandlerProps {
  children: ReactNode;
  blocks: EmailBlockType[];
}

export function DragDropHandler({ children, blocks }: DragDropHandlerProps) {
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
    const draggedBlockData = blocks.find((block) => block.id === event.active.id);
    setDraggedBlock(draggedBlockData || null);
    originalHandleDragStart(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
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
      <SortableContext items={blocks.map((block) => block.id)} strategy={sortingStrategy}>
        <div className="relative">{children}</div>
      </SortableContext>

      <DragOverlay
        dropAnimation={{
          duration: 200,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {draggedBlock ? (
          <div className="bg-background/10 h-fit border-2 border-blue-400 opacity-80 shadow-lg backdrop-blur-sm">
            <div style={{ display: 'flow-root' }} className="-mb-4">
              {renderBlock(draggedBlock)}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
