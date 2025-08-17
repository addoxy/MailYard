'use client';

import { ColorPicker } from '@/components/color-picker';
import { FieldLabel } from '@/components/settings-labels';
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
    <div className="flex flex-col gap-4">
      <div className="grid gap-4">
        {hasColor && (
          <div className="flex flex-col gap-2">
            <FieldLabel text="Text Color" />
            <ColorPicker
              value={color}
              onChange={(value) => onUpdate('color', value)}
              label="Text Color"
              placeholder="#000000"
            />
          </div>
        )}

        {hasBackgroundColor && (
          <div className="flex flex-col gap-2">
            <FieldLabel text="Background Color" />
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
