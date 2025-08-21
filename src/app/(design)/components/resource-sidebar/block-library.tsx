'use client';

import { AtomicTooltip } from '@/components/atomic-tooltip';
import { SearchBar } from '@/components/search-bar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn, generateBlockId } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { useAtomValue } from 'jotai';
import { Box, LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { canvasStylesAtom } from '../../atoms';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
import { BLOCK_ICON_MAP } from '../email-blocks/block-icons';
import {
  BLOCK_CATEGORIES,
  BLOCK_DEFINITIONS,
  createDefaultBlock,
} from '../email-blocks/block-registry';

interface BlockLibraryItemProps {
  icon: LucideIcon;
  name: string;
  description: string;
  blockType: string;
  onClick: () => void;
}

const BlockLibraryItem = ({
  icon: Icon,
  name,
  description,
  blockType,
  onClick,
}: BlockLibraryItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `library-${blockType}`,
    data: {
      type: 'library-block',
      blockType,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <AtomicTooltip content={description} side="right" asChild>
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          'hover:bg-secondary/50 flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 py-2 transition-all duration-300 last-of-type:mb-6',
          isDragging && 'opacity-50'
        )}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        {...attributes}
        {...listeners}
      >
        <Icon className="text-muted-foreground size-3" />
        <span className="text-sm font-medium">{name}</span>
      </div>
    </AtomicTooltip>
  );
};


export const BlockLibrary = () => {
  const { addBlock } = useEmailBlocks();
  const canvasStyles = useAtomValue(canvasStylesAtom);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlocks = BLOCK_DEFINITIONS.filter(
    (block) =>
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBlock = (blockType: string) => {
    const blockId = generateBlockId(blockType);
    const newBlock = createDefaultBlock(blockType, blockId);

    if (newBlock) {
      // Apply current canvas font family to new blocks that have fontFamily property
      if ('fontFamily' in newBlock) {
        (newBlock as { fontFamily: string }).fontFamily = canvasStyles.fontFamily;
      }
      addBlock(newBlock);
    }
  };

  // Group blocks by category for better organization
  const blocksByCategory = BLOCK_CATEGORIES.map((category) => ({
    ...category,
    blocks: filteredBlocks.filter((block) => block.category === category.id),
  })).filter((category) => category.blocks.length > 0);

  return (
    <ScrollArea className="flex h-[calc(50vh-40px)] flex-col">
      <div className="px-4">
        <div className="h-4 w-full" />
        <span className="text-muted-foreground font-mono text-xs tracking-wider">BLOCKS</span>
        <div className="h-2 w-full" />
        <SearchBar
          placeholder="Search for blocks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {searchQuery ? (
          // Show flat list when searching
          <div className="mt-5 flex flex-col gap-1.5">
            {filteredBlocks.map((block) => {
              const Icon = BLOCK_ICON_MAP[block.icon] || Box;
              return (
                <BlockLibraryItem
                  key={block.type}
                  icon={Icon}
                  name={block.name}
                  description={block.description}
                  blockType={block.type}
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
        ) : (
          // Show categorized list when not searching
          <div className="mt-5 flex flex-col">
            {blocksByCategory.map((category) => (
              <div key={category.id}>
                <h3 className="text-muted-foreground mb-2 text-xs tracking-wider uppercase">
                  {category.name}
                </h3>
                <div className="flex flex-col gap-1.5">
                  {category.blocks.map((block) => {
                    const Icon = BLOCK_ICON_MAP[block.icon] || Box;
                    return (
                      <BlockLibraryItem
                        key={block.type}
                        icon={Icon}
                        name={block.name}
                        description={block.description}
                        blockType={block.type}
                        onClick={() => handleAddBlock(block.type)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
