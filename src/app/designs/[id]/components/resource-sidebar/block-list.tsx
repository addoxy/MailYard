'use client';

import { useAtom } from 'jotai';
import { emailBlocksAtom } from '../../atoms';
import { useBlockSelection } from '../../hooks/use-block-selection';
import { BlockListItem } from './block-list-item';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Layers } from 'lucide-react';

export const BlockList = () => {
  const [emailBlocks, setEmailBlocks] = useAtom(emailBlocksAtom);
  const { selectBlock, isBlockSelected } = useBlockSelection();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const activeIndex = emailBlocks.findIndex(block => block.id === active.id);
      const overIndex = emailBlocks.findIndex(block => block.id === over?.id);

      setEmailBlocks(arrayMove(emailBlocks, activeIndex, overIndex));
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col overflow-auto px-4">
      <div className="mt-6 mb-4 flex items-center gap-2">
        <Layers className="size-4 text-muted-foreground" />
        <span className="text-muted-foreground font-mono text-xs tracking-wider">BLOCKS</span>
        <span className="text-muted-foreground bg-muted rounded-sm px-1.5 py-0.5 text-xs">
          {emailBlocks.length}
        </span>
      </div>
      
      {emailBlocks.length === 0 ? (
        <p className="text-muted-foreground mt-10 text-center text-sm">
          No blocks yet. Add blocks from the library above.
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={emailBlocks} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-1">
              {emailBlocks.map((block) => (
                <BlockListItem 
                  key={block.id} 
                  block={block}
                  isSelected={isBlockSelected(block.id)}
                  onSelect={selectBlock}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};