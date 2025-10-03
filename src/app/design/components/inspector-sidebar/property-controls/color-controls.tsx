'use client';

import { ColorPicker } from '@/components/color-picker';
import { FieldLabel, SectionLabel } from '@/components/settings-labels';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
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

  const handleResetBackgroundColor = () => {
    onUpdate('backgroundColor', 'transparent');
  };

  return (
    <div className="flex flex-col gap-4">
      <SectionLabel text="Color" />
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
            <div className="flex items-center justify-between">
              <FieldLabel text="Background Color" />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetBackgroundColor}
                className="text-muted-foreground hover:text-foreground h-6 px-2 text-xs"
                title="Reset background color to transparent"
              >
                <RotateCcw className="size-3" />
                Reset
              </Button>
            </div>
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
