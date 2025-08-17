'use client';

import { ClearableNumberInput } from '@/components/clearable-number-input';
import { FieldLabel, SectionLabel } from '@/components/settings-labels';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  fontFamilyOptions,
  fontWeightOptions,
  lineHeightToNumber,
  numberToLineHeight,
  numberToPx,
  pxToNumber,
} from '@/lib/style-utils';
import { EmailBlockType } from '../../email-blocks/types';
import { getBlockProperty, hasProperty } from '../utils/block-property-utils';

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
  const hasTextDecoration = hasProperty(block, 'textDecoration');

  if (
    !hasFontSize &&
    !hasFontWeight &&
    !hasFontFamily &&
    !hasLineHeight &&
    !hasLetterSpacing &&
    !hasTextDecoration
  )
    return null;

  const fontSize = pxToNumber(getBlockProperty(block, 'fontSize') || '16px');
  const fontWeight = getBlockProperty(block, 'fontWeight') || '400';
  const fontFamily = getBlockProperty(block, 'fontFamily') || 'inherit';

  // When fontFamily is 'inherit', show the first option (Inter) in the select
  const displayFontFamily =
    fontFamily === 'inherit' ? 'Inter, system-ui, -apple-system, sans-serif' : fontFamily;

  const lineHeight = lineHeightToNumber(getBlockProperty(block, 'lineHeight') || '1.5');
  const letterSpacing = pxToNumber(getBlockProperty(block, 'letterSpacing') || '0px');
  const textDecoration = getBlockProperty(block, 'textDecoration') || 'none';

  const textDecorationOptions = [
    { value: 'none', label: 'None' },
    { value: 'underline', label: 'Underline' },
    { value: 'line-through', label: 'Line Through' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-2">
          {hasFontSize && (
            <div className="flex flex-col gap-2">
              <FieldLabel text="Font Size" />
              <ClearableNumberInput
                value={fontSize}
                onChange={(value) => onUpdate('fontSize', numberToPx(value))}
                placeholder="16"
                min={8}
                max={72}
              />
            </div>
          )}

          {hasFontWeight && (
            <div className="flex flex-col gap-2">
              <FieldLabel text="Font Weight" />
              <Select value={fontWeight} onValueChange={(value) => onUpdate('fontWeight', value)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fontWeightOptions.map((option) => (
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
          <div className="flex flex-col gap-2">
            <SectionLabel text="Font Family" />
            <Select
              value={displayFontFamily}
              onValueChange={(value) => onUpdate('fontFamily', value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontFamilyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {hasLineHeight && (
          <div className="flex flex-col gap-2">
            <SectionLabel text="Line Height" />
            <ClearableNumberInput
              value={lineHeight}
              onChange={(value) => onUpdate('lineHeight', numberToLineHeight(value))}
              placeholder="1.5"
              step="0.1"
              min={0.5}
              max={3}
            />
          </div>
        )}

        {hasLetterSpacing && (
          <div className="flex flex-col gap-2">
            <SectionLabel text="Letter Spacing" />
            <ClearableNumberInput
              value={letterSpacing}
              onChange={(value) => onUpdate('letterSpacing', numberToPx(value))}
              placeholder="0"
              step="0.1"
              min={-5}
              max={10}
            />
          </div>
        )}

        {hasTextDecoration && (
          <div className="flex flex-col gap-2">
            <SectionLabel text="Text Decoration" />
            <Select
              value={textDecoration}
              onValueChange={(value) => onUpdate('textDecoration', value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {textDecorationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};
