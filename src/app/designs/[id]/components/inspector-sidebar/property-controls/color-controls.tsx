'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

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
            <Label className="text-xs text-muted-foreground">Text Color</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={color}
                onChange={(e) => onUpdate('color', e.target.value)}
                className="h-8 w-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={color}
                onChange={(e) => onUpdate('color', e.target.value)}
                className="h-8 flex-1 text-xs font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
        )}
        
        {hasBackgroundColor && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Background</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={backgroundColor}
                onChange={(e) => onUpdate('backgroundColor', e.target.value)}
                className="h-8 w-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={backgroundColor}
                onChange={(e) => onUpdate('backgroundColor', e.target.value)}
                className="h-8 flex-1 text-xs font-mono"
                placeholder="#ffffff"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};