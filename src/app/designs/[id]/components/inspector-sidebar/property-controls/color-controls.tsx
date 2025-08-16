'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EmailBlockType } from '../../email-blocks/types';
import { getBlockProperty, hasProperty } from '../utils/block-property-utils';

interface ColorControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const ColorControls = ({ block, onUpdate }: ColorControlsProps) => {
  const hasColor = hasProperty(block, 'color');
  const hasBackgroundColor = hasProperty(block, 'backgroundColor');

  if (!hasColor && !hasBackgroundColor) return null;

  const color = getBlockProperty(block, 'color') || '#000000';
  const backgroundColor = getBlockProperty(block, 'backgroundColor') || '#ffffff';

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium">Colors</Label>

      <div className="grid grid-cols-2 gap-3">
        {hasColor && (
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs">Text Color</Label>
            <div className="flex items-center gap-2">
              <div
                className="relative flex size-[30px] cursor-pointer items-center justify-center overflow-hidden rounded border"
                style={{ backgroundColor: color }}
              >
                <input
                  type="color"
                  value={color}
                  onChange={(e) => onUpdate('color', e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  style={{ backgroundColor: color }}
                />
              </div>
              <Input
                type="text"
                value={color}
                onChange={(e) => onUpdate('color', e.target.value)}
                className="h-8 flex-1 font-mono text-xs"
                placeholder="#000000"
              />
            </div>
          </div>
        )}

        {hasBackgroundColor && (
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs">Background Color</Label>
            <div className="flex items-center gap-2">
              <div
                className="relative flex size-[30px] cursor-pointer items-center justify-center overflow-hidden rounded border"
                style={{ backgroundColor: backgroundColor }}
              >
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => onUpdate('backgroundColor', e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              <Input
                type="text"
                value={backgroundColor}
                onChange={(e) => onUpdate('backgroundColor', e.target.value)}
                className="h-8 flex-1 font-mono text-xs"
                placeholder="#000000"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
