'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

interface BorderControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const BorderControls = ({ block, onUpdate }: BorderControlsProps) => {
  const hasBorder = hasProperty(block, 'borderWidth');
  const hasBorderRadius = hasProperty(block, 'borderRadius');

  if (!hasBorder && !hasBorderRadius) return null;

  const borderWidth = getBlockProperty(block, 'borderWidth') || '1px';
  const borderStyle = getBlockProperty(block, 'borderStyle') || 'solid';
  const borderColor = getBlockProperty(block, 'borderColor') || '#cccccc';
  const borderRadius = getBlockProperty(block, 'borderRadius') || '4px';

  const borderStyleOptions = [
    { value: 'none', label: 'None' },
    { value: 'solid', label: 'Solid' },
    { value: 'dashed', label: 'Dashed' },
    { value: 'dotted', label: 'Dotted' },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium">Border</Label>
      
      {hasBorder && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Width</Label>
              <Input
                type="text"
                value={borderWidth}
                onChange={(e) => onUpdate('borderWidth', e.target.value)}
                className="h-8 text-xs"
                placeholder="1px"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Style</Label>
              <Select
                value={borderStyle}
                onValueChange={(value) => onUpdate('borderStyle', value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {borderStyleOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Color</Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                value={borderColor}
                onChange={(e) => onUpdate('borderColor', e.target.value)}
                className="h-8 w-12 p-1 cursor-pointer"
              />
              <Input
                type="text"
                value={borderColor}
                onChange={(e) => onUpdate('borderColor', e.target.value)}
                className="h-8 flex-1 text-xs font-mono"
                placeholder="#cccccc"
              />
            </div>
          </div>
        </>
      )}

      {hasBorderRadius && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Border Radius</Label>
          <Input
            type="text"
            value={borderRadius}
            onChange={(e) => onUpdate('borderRadius', e.target.value)}
            className="h-8 text-xs"
            placeholder="4px"
          />
        </div>
      )}
    </div>
  );
};