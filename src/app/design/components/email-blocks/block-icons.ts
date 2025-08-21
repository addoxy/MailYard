import {
  ALargeSmall,
  Heading,
  Image,
  Link,
  LucideIcon,
  Minus,
  MousePointer,
} from 'lucide-react';

/**
 * Centralized icon mapping for email blocks
 * This ensures consistent icons across block library, block list, and block editor
 */
export const BLOCK_ICON_MAP: Record<string, LucideIcon> = {
  Heading: Heading,
  Type: ALargeSmall,
  MousePointer: MousePointer,
  Link: Link,
  Minus: Minus,
  Image: Image,
};

/**
 * Get the icon component for a block type
 * Uses the block registry icon definition as the source of truth
 */
export function getBlockIcon(blockType: string): LucideIcon {
  // Map block types to their registry icon names
  const iconMap: Record<string, string> = {
    heading: 'Heading',
    text: 'Type', 
    button: 'MousePointer',
    link: 'Link',
    divider: 'Minus',
    image: 'Image',
  };
  
  const iconName = iconMap[blockType];
  return BLOCK_ICON_MAP[iconName] || ALargeSmall;
}

/**
 * Get the display name for a block type
 */
export function getBlockDisplayName(blockType: string): string {
  const nameMap: Record<string, string> = {
    heading: 'Heading',
    text: 'Text',
    button: 'Button', 
    link: 'Link',
    divider: 'Divider',
    image: 'Image',
  };
  
  return nameMap[blockType] || 'Block';
}