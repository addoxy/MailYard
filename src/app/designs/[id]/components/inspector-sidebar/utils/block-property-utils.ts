import { EmailBlockType, HeadingBlockProps, TextBlockProps, ContainerBlockProps, ButtonBlockProps, LinkBlockProps, DividerBlockProps } from '../../email-blocks/types';

// Type guard functions
export const hasProperty = (block: EmailBlockType, property: string): boolean => {
  return property in block;
};

// Type-safe property getters
export const getBlockProperty = (block: EmailBlockType, property: string): string => {
  if (hasProperty(block, property)) {
    const value = (block as unknown as Record<string, string | number>)[property];
    return String(value);
  }
  return '';
};

// Type-safe property setters for specific block types
export const updateHeadingBlock = (
  block: HeadingBlockProps,
  updates: Partial<HeadingBlockProps>
): HeadingBlockProps => ({
  ...block,
  ...updates,
});

export const updateTextBlock = (
  block: TextBlockProps,
  updates: Partial<TextBlockProps>
): TextBlockProps => ({
  ...block,
  ...updates,
});

export const updateContainerBlock = (
  block: ContainerBlockProps,
  updates: Partial<ContainerBlockProps>
): ContainerBlockProps => ({
  ...block,
  ...updates,
});

export const updateButtonBlock = (
  block: ButtonBlockProps,
  updates: Partial<ButtonBlockProps>
): ButtonBlockProps => ({
  ...block,
  ...updates,
});

export const updateLinkBlock = (
  block: LinkBlockProps,
  updates: Partial<LinkBlockProps>
): LinkBlockProps => ({
  ...block,
  ...updates,
});

export const updateDividerBlock = (
  block: DividerBlockProps,
  updates: Partial<DividerBlockProps>
): DividerBlockProps => ({
  ...block,
  ...updates,
});

// Generic block updater
export const updateBlock = <T extends EmailBlockType>(
  block: T,
  updates: Partial<T>
): T => ({
  ...block,
  ...updates,
});