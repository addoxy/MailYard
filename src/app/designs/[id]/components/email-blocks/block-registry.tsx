import { ButtonBlock } from './button-block';
import { DividerBlock } from './divider-block';
import { HeadingBlock } from './heading-block';
import { ImageBlock } from './image-block';
import { LinkBlock } from './link-block';
import { TextBlock } from './text-block';
import { BlockDefinition, EmailBlockType } from './types';
import { createBlockDefaults, blockDefaults } from '../../../../../lib/style-utils';

export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: 'heading',
    name: 'Heading',
    icon: 'Heading',
    description: 'Add a heading to your email',
    category: 'basic',
  },
  {
    type: 'text',
    name: 'Text',
    icon: 'Type',
    description: 'Add text content to your email',
    category: 'basic',
  },
  {
    type: 'button',
    name: 'Button',
    icon: 'MousePointer',
    description: 'Add a clickable button to your email',
    category: 'content',
  },
  {
    type: 'link',
    name: 'Link',
    icon: 'Link',
    description: 'Add a clickable link to your email',
    category: 'content',
  },
  {
    type: 'divider',
    name: 'Divider',
    icon: 'Minus',
    description: 'Add a horizontal line to separate content',
    category: 'layout',
  },
  {
    type: 'image',
    name: 'Image',
    icon: 'Image',
    description: 'Add an image from a URL',
    category: 'media',
  },
];

export function getBlockDefinition(type: string): BlockDefinition | undefined {
  return BLOCK_DEFINITIONS.find((def) => def.type === type);
}

export function createDefaultBlock(type: string, id: string): EmailBlockType | null {
  const definition = getBlockDefinition(type);
  if (!definition) {
    return null;
  }

  // Use the utility function to get defaults from style-utils
  const defaults = createBlockDefaults(type as keyof typeof blockDefaults);
  
  return {
    ...defaults,
    id,
    type,
  } as EmailBlockType;
}

export function renderBlock(
  block: EmailBlockType,
  onClick?: (id: string) => void,
  isSelected = false
) {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock key={block.id} {...block} onClick={onClick} isSelected={isSelected} />;
    case 'text':
      return <TextBlock key={block.id} {...block} onClick={onClick} isSelected={isSelected} />;
    case 'button':
      return <ButtonBlock key={block.id} {...block} onClick={onClick} isSelected={isSelected} />;
    case 'link':
      return <LinkBlock key={block.id} {...block} onClick={onClick} isSelected={isSelected} />;
    case 'divider':
      return <DividerBlock key={block.id} {...block} onClick={onClick} isSelected={isSelected} />;
    case 'image':
      return <ImageBlock key={block.id} {...block} onClick={onClick} isSelected={isSelected} />;
    default:
      console.warn(`Unknown block type: ${(block as { type: string }).type}`);
      return null;
  }
}

export function getBlocksByCategory(category?: string): BlockDefinition[] {
  if (!category) {
    return BLOCK_DEFINITIONS;
  }
  return BLOCK_DEFINITIONS.filter((def) => def.category === category);
}

export const BLOCK_CATEGORIES = [
  { id: 'basic', name: 'Basic', description: 'Essential content blocks' },
  { id: 'layout', name: 'Layout', description: 'Structure and organization blocks' },
  { id: 'content', name: 'Content', description: 'Rich content blocks' },
  { id: 'media', name: 'Media', description: 'Images, videos, and media blocks' },
];
