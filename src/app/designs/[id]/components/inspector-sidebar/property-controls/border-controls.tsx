'use client';

import { ClearableNumberInput } from '@/components/clearable-number-input';
import { ColorPicker } from '@/components/color-picker';
import { FieldLabel, SectionLabel } from '@/components/settings-labels';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { borderStyleOptions, numberToPx, pxToNumber } from '@/lib/style-utils';
import { EmailBlockType } from '../../email-blocks/types';
import { getBlockProperty, hasProperty } from '../utils/block-property-utils';

interface BorderControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const BorderControls = ({ block, onUpdate }: BorderControlsProps) => {
  const hasBorder = hasProperty(block, 'borderWidth');
  const hasBorderRadius = hasProperty(block, 'borderRadius');

  if (!hasBorder && !hasBorderRadius) return null;

  const borderWidth = getBlockProperty(block, 'borderWidth') || '0px';
  const borderStyle = getBlockProperty(block, 'borderStyle') || 'solid';
  const borderColor = getBlockProperty(block, 'borderColor') || '#cccccc';
  const borderRadius = getBlockProperty(block, 'borderRadius') || '0px';

  // Extract numeric values
  const borderWidthValue = pxToNumber(borderWidth);
  const borderRadiusValue = pxToNumber(borderRadius);

  return (
    <div className="flex flex-col gap-6">
      {hasBorder && (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <FieldLabel text="Width" />
              <ClearableNumberInput
                value={borderWidthValue}
                onChange={(value) => onUpdate('borderWidth', numberToPx(value))}
              />
            </div>

            <div className="flex flex-col gap-2">
              <FieldLabel text="Style" />
              <Select value={borderStyle} onValueChange={(value) => onUpdate('borderStyle', value)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {borderStyleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <SectionLabel text="Color" />
            <ColorPicker
              value={borderColor}
              onChange={(value) => onUpdate('borderColor', value)}
              label="Border Color"
              placeholder="#cccccc"
            />
          </div>
        </div>
      )}

      {hasBorderRadius && (
        <div className="flex flex-col gap-2">
          <SectionLabel text="Border Radius" />
          <ClearableNumberInput
            value={borderRadiusValue}
            onChange={(value) => onUpdate('borderRadius', numberToPx(value))}
          />
        </div>
      )}
    </div>
  );
};
