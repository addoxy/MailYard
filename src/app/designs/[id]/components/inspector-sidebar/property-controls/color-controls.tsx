'use client';

import { Label } from '@/components/ui/label';
import { ColorPicker } from '@/components/color-picker';
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
            <ColorPicker
              value={color}
              onChange={(value) => onUpdate('color', value)}
              label="Text Color"
              placeholder="#000000"
            />
          </div>
        )}

        {hasBackgroundColor && (
          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs">Background Color</Label>
            <ColorPicker
              value={backgroundColor}
              onChange={(value) => onUpdate('backgroundColor', value)}
              label="Background Color"
              placeholder="#ffffff"
            />
          </div>
        )}
      </div>
    </div>
  );
};
