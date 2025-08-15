import { BlockDefinition, EmailBlockType, HeadingBlockProps, TextBlockProps, ContainerBlockProps, ButtonBlockProps, LinkBlockProps, DividerBlockProps, ImageBlockProps } from './types';
import { HeadingBlock } from './heading-block';
import { TextBlock } from './text-block';
import { ContainerBlock } from './container-block';
import { ButtonBlock } from './button-block';
import { LinkBlock } from './link-block';
import { DividerBlock } from './divider-block';
import { ImageBlock } from './image-block';

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
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
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
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
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
  {
    type: 'button',
    name: 'Button',
    icon: 'MousePointer',
    description: 'Add a clickable button to your email',
    category: 'content',
    defaultProps: {
      type: 'button',
      content: 'Click me',
      href: '#',
      textAlign: 'left',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: '#3b82f6',
      borderWidth: '0px',
      borderColor: '#3b82f6',
      borderStyle: 'solid',
      borderRadius: '8px',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      lineHeight: '1.5',
      marginTop: '0px',
      marginBottom: '16px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '12px',
      paddingBottom: '12px',
      paddingLeft: '24px',
      paddingRight: '24px',
    } as Partial<ButtonBlockProps>,
  },
  {
    type: 'link',
    name: 'Link',
    icon: 'Link',
    description: 'Add a clickable link to your email',
    category: 'content',
    defaultProps: {
      type: 'link',
      content: 'Click here',
      href: '#',
      textAlign: 'left',
      fontSize: '16px',
      fontWeight: 'normal',
      color: '#3b82f6',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      lineHeight: '1.5',
      textDecoration: 'underline',
      marginTop: '0px',
      marginBottom: '16px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
    } as Partial<LinkBlockProps>,
  },
  {
    type: 'divider',
    name: 'Divider',
    icon: 'Minus',
    description: 'Add a horizontal line to separate content',
    category: 'layout',
    defaultProps: {
      type: 'divider',
      width: '100%',
      height: '1px',
      borderWidth: '0px',
      borderColor: '#e5e7eb',
      borderStyle: 'solid',
      marginTop: '16px',
      marginBottom: '16px',
      marginLeft: '0px',
      marginRight: '0px',
    } as Partial<DividerBlockProps>,
  },
  {
    type: 'image',
    name: 'Image',
    icon: 'Image',
    description: 'Add an image from a URL',
    category: 'media',
    defaultProps: {
      type: 'image',
      src: '',
      alt: 'Image',
      width: '100%',
      height: 'auto',
      textAlign: 'center',
      borderWidth: '0px',
      borderColor: '#e5e7eb',
      borderStyle: 'solid',
      borderRadius: '8px',
      marginTop: '0px',
      marginBottom: '16px',
      marginLeft: '0px',
      marginRight: '0px',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
    } as Partial<ImageBlockProps>,
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
  return BLOCK_DEFINITIONS.filter(def => def.category === category);
}

export const BLOCK_CATEGORIES = [
  { id: 'basic', name: 'Basic', description: 'Essential content blocks' },
  { id: 'layout', name: 'Layout', description: 'Structure and organization blocks' },
  { id: 'content', name: 'Content', description: 'Rich content blocks' },
  { id: 'media', name: 'Media', description: 'Images, videos, and media blocks' },
];