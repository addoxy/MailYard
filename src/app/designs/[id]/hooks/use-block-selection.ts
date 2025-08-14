'use client';

import { useAtom, useAtomValue } from 'jotai';
import { selectedBlockIdAtom, selectedBlockIdsAtom, emailBlocksAtom } from '../atoms';

export function useBlockSelection() {
  const [selectedBlockId, setSelectedBlockId] = useAtom(selectedBlockIdAtom);
  const [selectedBlockIds, setSelectedBlockIds] = useAtom(selectedBlockIdsAtom);
  const emailBlocks = useAtomValue(emailBlocksAtom);

  const selectedBlock = emailBlocks.find(block => block.id === selectedBlockId) || null;
  const selectedBlocks = emailBlocks.filter(block => selectedBlockIds.includes(block.id));
  const hasMultipleSelected = selectedBlockIds.length > 1;

  const selectBlock = (blockId: string | null, multiSelect = false) => {
    if (!blockId) {
      clearSelection();
      return;
    }

    if (multiSelect) {
      if (selectedBlockIds.includes(blockId)) {
        // Remove from multi-selection
        const newSelectedIds = selectedBlockIds.filter(id => id !== blockId);
        setSelectedBlockIds(newSelectedIds);
        // Update single selection to the last remaining, or null if none
        setSelectedBlockId(newSelectedIds.length > 0 ? newSelectedIds[newSelectedIds.length - 1] : null);
      } else {
        // Add to multi-selection
        const newSelectedIds = [...selectedBlockIds, blockId];
        setSelectedBlockIds(newSelectedIds);
        setSelectedBlockId(blockId);
      }
    } else {
      // Single selection - clear multi-select and set single
      setSelectedBlockId(blockId);
      setSelectedBlockIds([blockId]);
    }
  };

  const selectMultipleBlocks = (blockIds: string[]) => {
    setSelectedBlockIds(blockIds);
    setSelectedBlockId(blockIds.length > 0 ? blockIds[blockIds.length - 1] : null);
  };

  const selectAllBlocks = () => {
    const allIds = emailBlocks.map(block => block.id);
    selectMultipleBlocks(allIds);
  };

  const clearSelection = () => {
    setSelectedBlockId(null);
    setSelectedBlockIds([]);
  };

  const isBlockSelected = (blockId: string) => {
    return selectedBlockIds.includes(blockId);
  };

  const selectNextBlock = () => {
    if (!selectedBlockId || emailBlocks.length === 0) {
      if (emailBlocks.length > 0) {
        selectBlock(emailBlocks[0].id);
      }
      return;
    }

    const currentIndex = emailBlocks.findIndex(block => block.id === selectedBlockId);
    if (currentIndex === -1) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex < emailBlocks.length) {
      selectBlock(emailBlocks[nextIndex].id);
    }
  };

  const selectPreviousBlock = () => {
    if (!selectedBlockId || emailBlocks.length === 0) {
      if (emailBlocks.length > 0) {
        selectBlock(emailBlocks[emailBlocks.length - 1].id);
      }
      return;
    }

    const currentIndex = emailBlocks.findIndex(block => block.id === selectedBlockId);
    if (currentIndex === -1) return;

    const previousIndex = currentIndex - 1;
    if (previousIndex >= 0) {
      selectBlock(emailBlocks[previousIndex].id);
    }
  };

  return {
    selectedBlockId,
    selectedBlockIds,
    selectedBlock,
    selectedBlocks,
    hasMultipleSelected,
    selectBlock,
    selectMultipleBlocks,
    selectAllBlocks,
    clearSelection,
    isBlockSelected,
    selectNextBlock,
    selectPreviousBlock,
  };
}