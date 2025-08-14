'use client';

import { AtomicTooltip } from '@/components/atomic-tooltip';
import { SearchBar } from '@/components/search-bar';
import { cn } from '@/lib/utils';
import { useAtom, useAtomValue } from 'jotai';
import { ALargeSmall, Box, Heading, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { emailBlocksAtom, canvasStylesAtom } from '../../atoms';
import { BLOCK_DEFINITIONS, createDefaultBlock } from '../email-blocks/block-registry';

interface BlockLibraryItemProps {
  icon: LucideIcon;
  name: string;
  description: string;
  onClick: () => void;
}

const BlockLibraryItem = ({ icon: Icon, name, description, onClick }: BlockLibraryItemProps) => {
  return (
    <AtomicTooltip content={description} side="right" asChild>
      <div
        className={cn(
          'hover:bg-secondary/50 flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 py-2 transition-all duration-300'
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        <Icon className="text-muted-foreground size-3" />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </AtomicTooltip>
  );
};

const ICON_MAP: Record<string, LucideIcon> = {
  Heading: Heading,
  Type: ALargeSmall,
  Box: Box,
};

export const BlockLibrary = () => {
  const [, setEmailBlocks] = useAtom(emailBlocksAtom);
  const canvasStyles = useAtomValue(canvasStylesAtom);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlocks = BLOCK_DEFINITIONS.filter(
    (block) =>
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBlock = (blockType: string) => {
    const blockId = `${blockType}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newBlock = createDefaultBlock(blockType, blockId);

    if (newBlock) {
      // Apply current canvas font family to new blocks that have fontFamily property
      if ('fontFamily' in newBlock) {
        (newBlock as { fontFamily: string }).fontFamily = canvasStyles.fontFamily;
      }
      setEmailBlocks((prevBlocks) => [...prevBlocks, newBlock]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col overflow-auto px-4">
      <span className="text-muted-foreground mt-6 mb-4 font-mono text-xs tracking-wider">
        BLOCKS
      </span>
      <SearchBar
        placeholder="Search for blocks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="mt-3 flex flex-col gap-1.5">
        {filteredBlocks.map((block) => {
          const Icon = ICON_MAP[block.icon] || Box;
          return (
            <BlockLibraryItem
              key={block.type}
              icon={Icon}
              name={block.name}
              description={block.description}
              onClick={() => handleAddBlock(block.type)}
            />
          );
        })}
        {filteredBlocks.length === 0 && (
          <p className="text-muted-foreground mt-4 text-center text-sm">
            No blocks found matching &quot;{searchQuery}&quot;
          </p>
        )}
      </div>
    </div>
  );
};
