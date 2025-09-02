'use client';

import { FieldLabel, SectionLabel } from '@/components/settings-labels';
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
    <div className="space-y-4">
      <SectionLabel text="Image Settings" />
      {/* Image Source */}
      <div className="mt-2">
        <FieldLabel text="Image URL" />
        <input
          type="url"
          value={block.src || ''}
          onChange={(e) => onUpdate('src', e.target.value)}
          placeholder="https://example.com/image.jpg"
          className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-1 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            block.src && !isValidUrl(block.src) ? 'border-destructive' : ''
          }`}
        />
        {block.src && !isValidUrl(block.src) && (
          <p className="text-destructive mt-1 text-xs">Please enter a valid URL</p>
        )}
      </div>

      {/* Alt Text */}
      <div>
        <FieldLabel text="Alt Text" />
        <input
          type="text"
          value={block.alt || ''}
          onChange={(e) => onUpdate('alt', e.target.value)}
          placeholder="Describe the image for accessibility"
          className={`border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-1 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
            block.src && !block.alt ? 'border-amber-500' : ''
          }`}
        />
        {block.src && !block.alt && (
          <p className="mt-1 text-xs text-amber-600">Alt text is recommended for accessibility</p>
        )}
      </div>

    </div>
  );
};
