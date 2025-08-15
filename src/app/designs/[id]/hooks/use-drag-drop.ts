import { useAtom } from 'jotai';
import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { emailBlocksAtom, selectedBlockIdsAtom, canvasStylesAtom } from '../atoms';
import { useCallback } from 'react';
import { createDefaultBlock } from '../components/email-blocks/block-registry';
import { useAtomValue } from 'jotai';

export function useDragDrop() {
  const [emailBlocks, setEmailBlocks] = useAtom(emailBlocksAtom);
  const [selectedBlockIds, setSelectedBlockIds] = useAtom(selectedBlockIdsAtom);
  const canvasStyles = useAtomValue(canvasStylesAtom);

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
    const activeData = active.data.current;

    // Handle library block drops
    if (activeData?.type === 'library-block') {
      const blockType = activeData.blockType;
      const blockId = `${blockType}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      const newBlock = createDefaultBlock(blockType, blockId);

      if (newBlock) {
        // Apply current canvas font family to new blocks that have fontFamily property
        if ('fontFamily' in newBlock) {
          (newBlock as { fontFamily: string }).fontFamily = canvasStyles.fontFamily;
        }

        setEmailBlocks(currentBlocks => {
          // Find the drop position
          const overIndex = currentBlocks.findIndex(block => block.id === overId);
          
          if (overIndex === -1) {
            // Drop at the end if no specific position found
            return [...currentBlocks, newBlock];
          }
          
          // Insert at the drop position
          const newBlocks = [...currentBlocks];
          newBlocks.splice(overIndex, 0, newBlock);
          return newBlocks;
        });

        // Select the newly added block
        setSelectedBlockIds([newBlock.id]);
      }
      return;
    }

    // Handle existing block reordering
    if (activeId === overId) return;

    setEmailBlocks(currentBlocks => {
      const activeIndex = currentBlocks.findIndex(block => block.id === activeId);
      const overIndex = currentBlocks.findIndex(block => block.id === overId);

      if (activeIndex === -1 || overIndex === -1) return currentBlocks;

      // Reorder blocks with optimistic update
      return arrayMove(currentBlocks, activeIndex, overIndex);
    });
  }, [setEmailBlocks, canvasStyles.fontFamily, setSelectedBlockIds]);

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