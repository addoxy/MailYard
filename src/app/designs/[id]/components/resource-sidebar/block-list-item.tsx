'use client';

import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Heading1,
  Image,
  Link,
  Minus,
  RectangleHorizontal,
  Type,
} from 'lucide-react';
import { EmailBlockType } from '../email-blocks/types';

interface BlockListItemProps {
  block: EmailBlockType;
  isSelected?: boolean;
  onSelect?: (blockId: string) => void;
}

const getBlockIcon = (type: string) => {
  switch (type) {
    case 'heading':
      return Heading1;
    case 'text':
      return Type;
    case 'button':
      return RectangleHorizontal;
    case 'link':
      return Link;
    case 'divider':
      return Minus;
    case 'image':
      return Image;
    default:
      return Type;
  }
};

const getBlockName = (block: EmailBlockType) => {
  switch (block.type) {
    case 'heading':
      return `Heading ${block.level}`;
    case 'text':
      return 'Text';
    case 'button':
      return 'Button';
    case 'link':
      return 'Link';
    case 'divider':
      return 'Divider';
    case 'image':
      return 'Image';
    default:
      return 'Block';
  }
};

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
  };

  const Icon = getBlockIcon(block.type);
  const blockName = getBlockName(block);
  const blockContent = getBlockContent(block);

  const handleClick = () => {
    onSelect?.(block.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'hover:bg-muted/50 flex items-center gap-1 rounded-md border p-3 transition-colors',
        isSelected && 'bg-muted border-primary',
        isDragging && 'opacity-50'
      )}
      onClick={handleClick}
    >
      {/* Always visible drag handle */}
      <div
        className="hover:bg-muted-foreground/10 cursor-grab rounded p-1 transition-colors"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="text-muted-foreground size-3" />
      </div>

      {/* Clickable content area */}
      <div className="flex flex-1 cursor-pointer items-center gap-3">
        <Icon
          className={cn('size-4 shrink-0', isSelected ? 'text-primary' : 'text-muted-foreground')}
        />

        <div className="min-w-0 flex-1">
          <div className="text-foreground truncate text-sm font-medium">{blockName}</div>
          {blockContent && (
            <div className="text-muted-foreground line-clamp-1 text-xs">{blockContent}</div>
          )}
        </div>
      </div>
    </div>
  );
};
