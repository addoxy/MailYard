'use client';

import { useAtom, useAtomValue } from 'jotai';
import { useKeyboardShortcuts, createShortcut } from '@/hooks/use-keyboard-shortcuts';
import { useBlockSelection } from './use-block-selection';
import { 
  emailBlocksAtom, 
  clipboardAtom,
  selectedBlockIdsAtom,
} from '../atoms';
import { EmailBlockType } from '../components/email-blocks/types';

export function useEmailShortcuts() {
  const [emailBlocks, setEmailBlocks] = useAtom(emailBlocksAtom);
  const [clipboard, setClipboard] = useAtom(clipboardAtom);
  const selectedBlockIds = useAtomValue(selectedBlockIdsAtom);
  
  const {
    selectAllBlocks,
    clearSelection,
    selectNextBlock,
    selectPreviousBlock,
    selectedBlocks,
    selectedBlockId,
  } = useBlockSelection();

  // Delete selected blocks
  const deleteSelectedBlocks = () => {
    if (selectedBlockIds.length === 0) return;
    
    const newBlocks = emailBlocks.filter(block => !selectedBlockIds.includes(block.id));
    setEmailBlocks(newBlocks);
    clearSelection();
  };

  // Generate unique ID for new blocks
  const generateId = () => {
    return `block_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
  };

  // Duplicate selected blocks
  const duplicateSelectedBlocks = () => {
    if (selectedBlocks.length === 0) return;

    const duplicatedBlocks: EmailBlockType[] = selectedBlocks.map(block => ({
      ...block,
      id: generateId(),
    }));

    // Find the position after the last selected block
    const lastSelectedIndex = Math.max(
      ...selectedBlockIds.map(id => emailBlocks.findIndex(block => block.id === id))
    );

    const newBlocks = [
      ...emailBlocks.slice(0, lastSelectedIndex + 1),
      ...duplicatedBlocks,
      ...emailBlocks.slice(lastSelectedIndex + 1),
    ];

    setEmailBlocks(newBlocks);
  };

  // Copy selected blocks to clipboard
  const copySelectedBlocks = () => {
    if (selectedBlocks.length === 0) return;
    setClipboard([...selectedBlocks]);
  };

  // Paste blocks from clipboard
  const pasteBlocks = () => {
    if (clipboard.length === 0) return;

    const pastedBlocks: EmailBlockType[] = clipboard.map(block => ({
      ...block,
      id: generateId(),
    }));

    // Insert after the last selected block, or at the end if nothing is selected
    let insertIndex = emailBlocks.length;
    if (selectedBlockId) {
      const selectedIndex = emailBlocks.findIndex(block => block.id === selectedBlockId);
      if (selectedIndex !== -1) {
        insertIndex = selectedIndex + 1;
      }
    }

    const newBlocks = [
      ...emailBlocks.slice(0, insertIndex),
      ...pastedBlocks,
      ...emailBlocks.slice(insertIndex),
    ];

    setEmailBlocks(newBlocks);
  };

  // Define shortcuts
  const shortcuts = [
    // Delete - no modifiers needed
    {
      key: 'Delete',
      handler: deleteSelectedBlocks,
      preventDefault: true,
      condition: () => selectedBlockIds.length > 0,
    },
    {
      key: 'Backspace',
      handler: deleteSelectedBlocks,
      preventDefault: true,
      condition: () => selectedBlockIds.length > 0,
    },

    // Select All
    createShortcut('a', selectAllBlocks, {
      condition: () => emailBlocks.length > 0,
    }),

    // Duplicate
    createShortcut('d', duplicateSelectedBlocks, {
      condition: () => selectedBlocks.length > 0,
    }),

    // Copy/Paste
    createShortcut('c', copySelectedBlocks, {
      condition: () => selectedBlocks.length > 0,
    }),
    createShortcut('v', pasteBlocks, {
      condition: () => clipboard.length > 0,
    }),

    // Navigation
    {
      key: 'ArrowDown',
      handler: selectNextBlock,
      preventDefault: true,
      condition: () => emailBlocks.length > 0,
    },
    {
      key: 'ArrowUp',
      handler: selectPreviousBlock,
      preventDefault: true,
      condition: () => emailBlocks.length > 0,
    },

    // Escape to deselect
    {
      key: 'Escape',
      handler: clearSelection,
      preventDefault: true,
      condition: () => selectedBlockIds.length > 0,
    },
  ];

  useKeyboardShortcuts({
    shortcuts,
    enabled: true,
  });

  return {
    deleteSelectedBlocks,
    duplicateSelectedBlocks,
    copySelectedBlocks,
    pasteBlocks,
  };
}