'use client';

import { AtomicTooltip } from '@/components/atomic-tooltip';
import { SearchBar } from '@/components/search-bar';
import { cn, generateBlockId } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { useAtomValue } from 'jotai';
import {
  ALargeSmall,
  Box,
  Heading,
  Image,
  Link,
  LucideIcon,
  Minus,
  MousePointer,
} from 'lucide-react';
import { useState } from 'react';
import { canvasStylesAtom } from '../../atoms';
import { useEmailBlocks } from '../../hooks/use-email-blocks';
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

const ICON_MAP: Record<string, LucideIcon> = {
  Heading: Heading,
  Type: ALargeSmall,
  Box: Box,
  MousePointer: MousePointer,
  Link: Link,
  Minus: Minus,
  Image: Image,
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
    <div className="flex h-[calc(100vh-100px)] flex-col overflow-auto px-4">
      <span className="text-muted-foreground mt-6 mb-4 font-mono text-xs tracking-wider">
        BLOCKS
      </span>
      <SearchBar
        placeholder="Search for blocks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {searchQuery ? (
        // Show flat list when searching
        <div className="mt-3 flex flex-col gap-1.5">
          {filteredBlocks.map((block) => {
            const Icon = ICON_MAP[block.icon] || Box;
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
        <div className="mt-3 flex flex-col gap-4">
          {blocksByCategory.map((category) => (
            <div key={category.id}>
              <h3 className="text-muted-foreground mb-2 text-xs font-medium tracking-wider uppercase">
                {category.name}
              </h3>
              <div className="flex flex-col gap-1.5">
                {category.blocks.map((block) => {
                  const Icon = ICON_MAP[block.icon] || Box;
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
  );
};
