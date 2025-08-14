'use client';

import { useAtom, useAtomValue } from 'jotai';
import { selectedBlockIdAtom, emailBlocksAtom } from '../atoms';

export function useBlockSelection() {
  const [selectedBlockId, setSelectedBlockId] = useAtom(selectedBlockIdAtom);
  const emailBlocks = useAtomValue(emailBlocksAtom);

  const selectedBlock = emailBlocks.find(block => block.id === selectedBlockId) || null;

  const selectBlock = (blockId: string | null) => {
    setSelectedBlockId(blockId);
  };

  const clearSelection = () => {
    setSelectedBlockId(null);
  };

  const isBlockSelected = (blockId: string) => {
    return selectedBlockId === blockId;
  };

  const selectNextBlock = () => {
    if (!selectedBlockId || emailBlocks.length === 0) {
      if (emailBlocks.length > 0) {
        setSelectedBlockId(emailBlocks[0].id);
      }
      return;
    }

    const currentIndex = emailBlocks.findIndex(block => block.id === selectedBlockId);
    if (currentIndex === -1) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex < emailBlocks.length) {
      setSelectedBlockId(emailBlocks[nextIndex].id);
    }
  };

  const selectPreviousBlock = () => {
    if (!selectedBlockId || emailBlocks.length === 0) {
      if (emailBlocks.length > 0) {
        setSelectedBlockId(emailBlocks[emailBlocks.length - 1].id);
      }
      return;
    }

    const currentIndex = emailBlocks.findIndex(block => block.id === selectedBlockId);
    if (currentIndex === -1) return;

    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      setSelectedBlockId(emailBlocks[previousIndex].id);
    }
  };

  return {
    selectedBlockId,
    selectedBlock,
    selectBlock,
    clearSelection,
    isBlockSelected,
    selectNextBlock,
    selectPreviousBlock,
  };
}