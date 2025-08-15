'use client';

import { useAtom } from 'jotai';
import { emailBlocksAtom } from '../atoms';
import { EmailBlockType } from '../components/email-blocks/types';

export function useEmailBlocks() {
  const [emailBlocks, setEmailBlocks] = useAtom(emailBlocksAtom);

  const updateBlock = (blockId: string, updates: Record<string, string | number>) => {
    setEmailBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === blockId 
          ? { ...block, ...updates }
          : block
      )
    );
  };

  const addBlock = (block: EmailBlockType, position?: number) => {
    setEmailBlocks(prevBlocks => {
      if (position !== undefined && position >= 0 && position <= prevBlocks.length) {
        const newBlocks = [...prevBlocks];
        newBlocks.splice(position, 0, block);
        return newBlocks;
      }
      return [...prevBlocks, block];
    });
  };

  const removeBlock = (blockId: string) => {
    setEmailBlocks(prevBlocks => prevBlocks.filter(block => block.id !== blockId));
  };

  const duplicateBlock = (blockId: string) => {
    const blockToClone = emailBlocks.find(block => block.id === blockId);
    if (!blockToClone) return;

    const clonedBlock = {
      ...blockToClone,
      id: `${blockToClone.type}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
    };

    const currentIndex = emailBlocks.findIndex(block => block.id === blockId);
    addBlock(clonedBlock, currentIndex + 1);
  };

  const moveBlock = (blockId: string, newPosition: number) => {
    setEmailBlocks(prevBlocks => {
      const blockIndex = prevBlocks.findIndex(block => block.id === blockId);
      if (blockIndex === -1 || newPosition < 0 || newPosition >= prevBlocks.length) {
        return prevBlocks;
      }

      const newBlocks = [...prevBlocks];
      const [movedBlock] = newBlocks.splice(blockIndex, 1);
      newBlocks.splice(newPosition, 0, movedBlock);
      
      return newBlocks;
    });
  };

  const getBlock = (blockId: string) => {
    return emailBlocks.find(block => block.id === blockId);
  };

  return {
    emailBlocks,
    updateBlock,
    addBlock,
    removeBlock,
    duplicateBlock,
    moveBlock,
    getBlock,
  };
}