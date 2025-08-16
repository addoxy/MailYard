'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';
import { ClearableNumberInput } from '@/components/clearable-number-input';

interface TypographyControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const TypographyControls = ({ block, onUpdate }: TypographyControlsProps) => {
  const hasFontSize = hasProperty(block, 'fontSize');
  const hasFontWeight = hasProperty(block, 'fontWeight');
  const hasFontFamily = hasProperty(block, 'fontFamily');
  const hasLineHeight = hasProperty(block, 'lineHeight');
  const hasLetterSpacing = hasProperty(block, 'letterSpacing');

  if (!hasFontSize && !hasFontWeight && !hasFontFamily && !hasLineHeight && !hasLetterSpacing) return null;

  // Helper functions to convert between px strings and numeric values
  const pxToNumber = (value: string): number => {
    return parseInt(value?.replace('px', '') || '16');
  };
  
  const numberToPx = (value: number): string => {
    return `${value}px`;
  };

  const fontSize = pxToNumber(getBlockProperty(block, 'fontSize') || '16px');
  const fontWeight = getBlockProperty(block, 'fontWeight') || '400';
  const fontFamily = getBlockProperty(block, 'fontFamily') || 'inherit';
  
  // When fontFamily is 'inherit', show the first option (Inter) in the select
  const displayFontFamily = fontFamily === 'inherit' ? 'Inter, system-ui, -apple-system, sans-serif' : fontFamily;
  // Convert line height to number (it's unitless)
  const lineHeightToNumber = (value: string): number => {
    return parseFloat(value || '1.5');
  };
  
  const numberToLineHeight = (value: number): string => {
    return value.toString();
  };

  const lineHeight = lineHeightToNumber(getBlockProperty(block, 'lineHeight') || '1.5');
  const letterSpacing = pxToNumber(getBlockProperty(block, 'letterSpacing') || '0px');

  const fontWeightOptions = [
    { value: '300', label: 'Light' },
    { value: '400', label: 'Normal' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' },
    { value: '800', label: 'Extra Bold' },
  ];

  const fontFamilyOptions = [
    { value: 'Inter, system-ui, -apple-system, sans-serif', label: 'Inter' },
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
            <ClearableNumberInput
              value={fontSize}
              onChange={(value) => onUpdate('fontSize', numberToPx(value))}
              className="h-8 text-xs"
              placeholder="16"
              min={8}
              max={72}
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
            value={displayFontFamily}
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
          <ClearableNumberInput
            value={lineHeight}
            onChange={(value) => onUpdate('lineHeight', numberToLineHeight(value))}
            className="h-8 text-xs"
            placeholder="1.5"
            step="0.1"
            min={0.5}
            max={3}
          />
        </div>
      )}

      {hasLetterSpacing && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Letter Spacing</Label>
          <ClearableNumberInput
            value={letterSpacing}
            onChange={(value) => onUpdate('letterSpacing', numberToPx(value))}
            className="h-8 text-xs"
            placeholder="0"
            step="0.1"
            min={-5}
            max={10}
          />
        </div>
      )}
    </div>
  );
};