'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';
import { ClearableNumberInput } from '@/components/clearable-number-input';
import { 
  pxToNumber, 
  numberToPx, 
  lineHeightToNumber, 
  numberToLineHeight, 
  fontWeightOptions, 
  fontFamilyOptions 
} from '@/lib/style-utils';

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

  const fontSize = pxToNumber(getBlockProperty(block, 'fontSize') || '16px');
  const fontWeight = getBlockProperty(block, 'fontWeight') || '400';
  const fontFamily = getBlockProperty(block, 'fontFamily') || 'inherit';
  
  // When fontFamily is 'inherit', show the first option (Inter) in the select
  const displayFontFamily = fontFamily === 'inherit' ? 'Inter, system-ui, -apple-system, sans-serif' : fontFamily;

  const lineHeight = lineHeightToNumber(getBlockProperty(block, 'lineHeight') || '1.5');
  const letterSpacing = pxToNumber(getBlockProperty(block, 'letterSpacing') || '0px');

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