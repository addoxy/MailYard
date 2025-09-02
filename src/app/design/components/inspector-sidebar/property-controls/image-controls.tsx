'use client';

import { FieldLabel, SectionLabel } from '@/components/settings-labels';
import { Input } from '@/components/ui/input';
import { ImageBlockProps } from '../../email-blocks/types';

interface ImageControlsProps {
  block: ImageBlockProps;
  onUpdate: (property: string, value: string | number) => void;
}

export const ImageControls = ({ block, onUpdate }: ImageControlsProps) => {
  // Validate URL format
  const isValidUrl = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <SectionLabel text="Image Settings" />
      {/* Image Source */}
      <div className="flex flex-col gap-2">
        <FieldLabel text="Image URL" />
        <Input
          type="url"
          value={block.src || ''}
          onChange={(e) => onUpdate('src', e.target.value)}
          placeholder="https://example.com/image.jpg"
          className={`h-8 ${block.src && !isValidUrl(block.src) ? 'border-destructive' : ''}`}
        />
        {block.src && !isValidUrl(block.src) && (
          <p className="text-destructive mt-1 text-xs">Please enter a valid URL</p>
        )}
      </div>

      {/* Alt Text */}
      <div className="flex flex-col gap-2">
        <FieldLabel text="Alt Text" />
        <Input
          type="text"
          value={block.alt || ''}
          onChange={(e) => onUpdate('alt', e.target.value)}
          placeholder="Describe the image for accessibility"
          className={`h-8 ${block.src && !block.alt ? 'border-amber-500' : ''}`}
        />
        {block.src && !block.alt && (
          <p className="mt-1 text-xs text-amber-600">Alt text is recommended for accessibility</p>
        )}
      </div>

    </div>
  );
};
