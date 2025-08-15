import { useAtom } from 'jotai';
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { emailBlocksAtom, selectedBlockIdsAtom } from '../atoms';
import { useCallback } from 'react';

export function useDragDrop() {
  const [emailBlocks, setEmailBlocks] = useAtom(emailBlocksAtom);
  const [selectedBlockIds, setSelectedBlockIds] = useAtom(selectedBlockIdsAtom);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const blockId = active.id as string;
    
    // If the dragged block is not in the current selection, select only it
    if (!selectedBlockIds.includes(blockId)) {
      setSelectedBlockIds([blockId]);
    }
  };

  const handleDragOver = (_event: DragOverEvent) => {
    // Handle drag over logic if needed for visual feedback
  };

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    setEmailBlocks(currentBlocks => {
      const activeIndex = currentBlocks.findIndex(block => block.id === activeId);
      const overIndex = currentBlocks.findIndex(block => block.id === overId);

      if (activeIndex === -1 || overIndex === -1) return currentBlocks;

      // Reorder blocks with optimistic update
      return arrayMove(currentBlocks, activeIndex, overIndex);
    });
  }, [setEmailBlocks]);

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = emailBlocks.findIndex(block => block.id === blockId);
    
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= emailBlocks.length) return;
    
    const newBlocks = arrayMove(emailBlocks, currentIndex, newIndex);
    setEmailBlocks(newBlocks);
  };

  const moveBlockToPosition = (blockId: string, newIndex: number) => {
    const currentIndex = emailBlocks.findIndex(block => block.id === blockId);
    
    if (currentIndex === -1 || newIndex < 0 || newIndex >= emailBlocks.length) return;
    
    const newBlocks = arrayMove(emailBlocks, currentIndex, newIndex);
    setEmailBlocks(newBlocks);
  };

  return {
    emailBlocks,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    moveBlock,
    moveBlockToPosition,
    // Export sorting strategy and context for components
    sortingStrategy: verticalListSortingStrategy,
  };
}