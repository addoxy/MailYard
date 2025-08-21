'use client';

import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { getBlockDisplayName, getBlockIcon } from '../email-blocks/block-icons';
import { EmailBlockType } from '../email-blocks/types';

interface BlockListItemProps {
  block: EmailBlockType;
  isSelected?: boolean;
  onSelect?: (blockId: string) => void;
}

const getBlockContent = (block: EmailBlockType) => {
  if ('content' in block && block.content) {
    return block.content.length > 30 ? `${block.content.substring(0, 30)}...` : block.content;
  }
  if (block.type === 'image' && 'alt' in block && block.alt) {
    return block.alt.length > 30 ? `${block.alt.substring(0, 30)}...` : block.alt;
  }
  return '';
};

export const BlockListItem = ({ block, isSelected = false, onSelect }: BlockListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: block.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    // Preserve dimensions during drag
    ...(isDragging && {
      width: 'auto',
      minWidth: '200px', // Ensure minimum width during drag
      maxWidth: '100%',
    }),
  };

  const Icon = getBlockIcon(block.type);
  const blockName = getBlockDisplayName(block.type);
  const blockContent = getBlockContent(block) || blockName;

  const handleClick = () => {
    onSelect?.(block.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'hover:bg-muted/50 flex cursor-pointer items-center gap-1 rounded-md border p-3 transition-colors last-of-type:mb-6',
        isSelected && 'bg-muted hover:bg-muted',
        isDragging && 'opacity-0'
      )}
      onClick={handleClick}
    >
      {/* Always visible drag handle */}
      <div
        className="hover:bg-muted-foreground/10 cursor-grab rounded p-1 transition-colors"
        {...attributes}
        {...listeners}
        onMouseDown={() => {
          // Select the block when starting to drag
          onSelect?.(block.id);
        }}
      >
        <GripVertical className="text-muted-foreground size-3" />
      </div>

      {/* Clickable content area */}
      <div
        className={cn(
          'flex flex-1 items-center gap-3',
          isDragging && 'pointer-events-none' // Disable pointer events during drag
        )}
      >
        <Icon
          className={cn('size-3 shrink-0', isSelected ? 'text-primary' : 'text-muted-foreground')}
        />

        <div
          className={cn(
            'min-w-0 flex-1',
            isDragging && 'whitespace-nowrap' // Prevent wrapping during drag
          )}
        >
          {blockContent && <div className="line-clamp-1 text-sm">{blockContent}</div>}
        </div>
      </div>
    </div>
  );
};
