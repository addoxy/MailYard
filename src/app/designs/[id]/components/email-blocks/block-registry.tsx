import { BlockDefinition, EmailBlockType, HeadingBlockProps, TextBlockProps, ContainerBlockProps } from './types';
import { HeadingBlock } from './heading-block';
import { TextBlock } from './text-block';
import { ContainerBlock } from './container-block';

export const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: 'heading',
    name: 'Heading',
    icon: 'Heading',
    description: 'Add a heading to your email',
    category: 'basic',
    defaultProps: {
      type: 'heading',
      content: 'Your heading text',
      level: 1,
      textAlign: 'left',
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#000000',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.4',
      marginTop: '0px',
      marginBottom: '16px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
    } as Partial<HeadingBlockProps>,
  },
  {
    type: 'text',
    name: 'Text',
    icon: 'Type',
    description: 'Add text content to your email',
    category: 'basic',
    defaultProps: {
      type: 'text',
      content: 'Your text content goes here. You can edit this text and style it however you like.',
      textAlign: 'left',
      fontSize: '16px',
      fontWeight: 'normal',
      color: '#000000',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.5',
      marginTop: '0px',
      marginBottom: '16px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
    } as Partial<TextBlockProps>,
  },
  {
    type: 'container',
    name: 'Container',
    icon: 'Box',
    description: 'A container to group other blocks',
    category: 'layout',
    defaultProps: {
      type: 'container',
      backgroundColor: 'transparent',
      borderWidth: '0px',
      borderColor: '#e5e7eb',
      borderStyle: 'solid',
      borderRadius: '0px',
      width: '100%',
      height: 'auto',
      marginTop: '0px',
      marginBottom: '16px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '16px',
      paddingBottom: '16px',
      paddingLeft: '16px',
      paddingRight: '16px',
      children: [],
    } as Partial<ContainerBlockProps>,
  },
];

export function getBlockDefinition(type: string): BlockDefinition | undefined {
  return BLOCK_DEFINITIONS.find(def => def.type === type);
}

export function createDefaultBlock(type: string, id: string): EmailBlockType | null {
  const definition = getBlockDefinition(type);
  if (!definition) {
    return null;
  }

  return {
    ...definition.defaultProps,
    id,
    type,
  } as EmailBlockType;
}

export function renderBlock(block: EmailBlockType, onClick?: (id: string) => void, isSelected = false) {
  switch (block.type) {
    case 'heading':
      return <HeadingBlock key={block.id} {...block} onClick={onClick} isSelected={isSelected} />;
    case 'text':
      return <TextBlock key={block.id} {...block} onClick={onClick} isSelected={isSelected} />;
    case 'container':
      return <ContainerBlock key={block.id} {...block} onClick={onClick} isSelected={isSelected} />;
    default:
      console.warn(`Unknown block type: ${(block as { type: string }).type}`);
      return null;
  }
}

export function getBlocksByCategory(category?: string): BlockDefinition[] {
  if (!category) {
    return BLOCK_DEFINITIONS;
  }
  return BLOCK_DEFINITIONS.filter(def => def.category === category);
}

export const BLOCK_CATEGORIES = [
  { id: 'basic', name: 'Basic', description: 'Essential content blocks' },
  { id: 'layout', name: 'Layout', description: 'Structure and organization blocks' },
  { id: 'content', name: 'Content', description: 'Rich content blocks' },
  { id: 'media', name: 'Media', description: 'Images, videos, and media blocks' },
];