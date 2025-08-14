'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

interface TypographyControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const TypographyControls = ({ block, onUpdate }: TypographyControlsProps) => {
  const hasFontSize = hasProperty(block, 'fontSize');
  const hasFontWeight = hasProperty(block, 'fontWeight');
  const hasFontFamily = hasProperty(block, 'fontFamily');
  const hasLineHeight = hasProperty(block, 'lineHeight');

  if (!hasFontSize && !hasFontWeight && !hasFontFamily && !hasLineHeight) return null;

  const fontSize = getBlockProperty(block, 'fontSize') || '16px';
  const fontWeight = getBlockProperty(block, 'fontWeight') || '400';
  const fontFamily = getBlockProperty(block, 'fontFamily') || 'Arial, sans-serif';
  const lineHeight = getBlockProperty(block, 'lineHeight') || '1.5';

  const fontWeightOptions = [
    { value: '300', label: 'Light' },
    { value: '400', label: 'Normal' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
  ];

  const fontFamilyOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'Courier New, monospace', label: 'Courier New' },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium">Typography</Label>
      
      <div className="grid grid-cols-2 gap-3">
        {hasFontSize && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Font Size</Label>
            <Input
              type="text"
              value={fontSize}
              onChange={(e) => onUpdate('fontSize', e.target.value)}
              className="h-8 text-xs"
              placeholder="16px"
            />
          </div>
        )}
        
        {hasFontWeight && (
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Font Weight</Label>
            <Select
              value={fontWeight}
              onValueChange={(value) => onUpdate('fontWeight', value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontWeightOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {hasFontFamily && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Font Family</Label>
          <Select
            value={fontFamily}
            onValueChange={(value) => onUpdate('fontFamily', value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilyOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {hasLineHeight && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Line Height</Label>
          <Input
            type="text"
            value={lineHeight}
            onChange={(e) => onUpdate('lineHeight', e.target.value)}
            className="h-8 text-xs"
            placeholder="1.5"
          />
        </div>
      )}
    </div>
  );
};