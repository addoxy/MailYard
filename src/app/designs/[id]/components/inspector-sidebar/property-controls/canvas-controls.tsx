'use client';

import { ClearableNumberInput } from '@/components/clearable-number-input';
import { ColorPicker } from '@/components/color-picker';
import { FieldLabel, SectionLabel } from '@/components/settings-labels';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  borderStyleOptions,
  fontFamilyOptions,
  maxWidthPresets,
  numberToPx,
  pxToNumber,
} from '@/lib/style-utils';
import { useRef, useState } from 'react';
import { LinkToggleButton } from './link-toggle-button';

const ClearableMaxWidthInput = ({
  value,
  onChange,
  placeholder = '600',
  className = '',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const lastValidValue = useRef(value);

  // Update last valid value when prop changes and it's not empty
  if (value !== lastValidValue.current && !isFocused && value.trim() !== '') {
    lastValidValue.current = value;
  }

  const handleFocus = () => {
    setIsFocused(true);
    // Show just the numeric part for editing
    const numericValue = value.replace('px', '').replace('%', '');
    setTempValue(numericValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (tempValue === '' || tempValue === undefined) {
      // If empty, use last valid value
      onChange(lastValidValue.current);
    } else {
      const numValue = Number(tempValue);
      if (!isNaN(numValue) && numValue > 0) {
        const newValue = `${numValue}px`;
        lastValidValue.current = newValue;
        onChange(newValue);
      } else {
        onChange(lastValidValue.current);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTempValue(newValue);

    // Only update immediately if it's a valid number
    if (newValue !== '' && !isNaN(Number(newValue)) && Number(newValue) > 0) {
      const pxValue = `${newValue}px`;
      onChange(pxValue);
    }
  };

  return (
    <Input
      type="number"
      value={isFocused ? tempValue : value.replace('px', '').replace('%', '')}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      placeholder={placeholder}
      min="1"
    />
  );
};

interface CanvasControlsProps {
  canvasStyles: {
    maxWidth: string;
    backgroundColor: string;
    paddingTop: string;
    paddingRight: string;
    paddingBottom: string;
    paddingLeft: string;
    marginTop: string;
    marginBottom: string;
    borderWidth: string;
    borderStyle: string;
    borderColor: string;
    borderRadius: string;
    fontFamily: string;
  };
  onUpdate: (property: string, value: string) => void;
}

export const CanvasControls = ({ canvasStyles, onUpdate }: CanvasControlsProps) => {
  const [paddingMode, setPaddingMode] = useState<'single' | 'unlinked'>('single');

  // Check if all padding values are the same for single mode
  const allPaddingsSame =
    canvasStyles.paddingTop === canvasStyles.paddingRight &&
    canvasStyles.paddingRight === canvasStyles.paddingBottom &&
    canvasStyles.paddingBottom === canvasStyles.paddingLeft;

  const updateAllPadding = (value: number) => {
    const pxValue = numberToPx(value);
    onUpdate('paddingTop', pxValue);
    onUpdate('paddingRight', pxValue);
    onUpdate('paddingBottom', pxValue);
    onUpdate('paddingLeft', pxValue);
  };

  // Check if current maxWidth matches any preset
  const isCustomMaxWidth = !maxWidthPresets.some(
    (preset) => preset.value === canvasStyles.maxWidth
  );
  const displayValue = isCustomMaxWidth ? 'custom' : canvasStyles.maxWidth;

  return (
    <div className="flex flex-col gap-4">
      <div className="-mx-6 flex h-16 items-center border-b px-6">
        <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Canvas Settings
        </span>
      </div>

      {/* Layout Section */}
      <div className="flex flex-col gap-4">
        <SectionLabel text="Layout" />

        {/* Max Width */}
        <div className="flex flex-col gap-2">
          <FieldLabel text="Max Width" />
          <div className="flex items-center gap-2">
            <Select
              value={displayValue}
              onValueChange={(value) => {
                if (value !== 'custom') {
                  onUpdate('maxWidth', value);
                }
              }}
            >
              <SelectTrigger className="h-8 w-2/3 text-left">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {maxWidthPresets.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
                {isCustomMaxWidth && (
                  <SelectItem value="custom" disabled>
                    Custom ({canvasStyles.maxWidth})
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            <ClearableMaxWidthInput
              value={canvasStyles.maxWidth}
              onChange={(value) => onUpdate('maxWidth', value)}
              className="h-8 w-1/3 font-mono text-xs"
              placeholder="600"
            />
          </div>
        </div>
      </div>

      <Separator className="my-2" />

      {/* Spacing Section */}
      <div className="flex flex-col gap-4">
        <SectionLabel text="Spacing" />

        {/* Padding */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <FieldLabel text="Padding" />
            <LinkToggleButton
              mode={paddingMode}
              onToggle={() => setPaddingMode(paddingMode === 'single' ? 'unlinked' : 'single')}
            />
          </div>

          {paddingMode === 'single' ? (
            <ClearableNumberInput
              value={allPaddingsSame ? pxToNumber(canvasStyles.paddingTop) : 0}
              onChange={(value) => updateAllPadding(value)}
              placeholder="32"
              min={0}
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <FieldLabel text="Top" />
                <ClearableNumberInput
                  value={pxToNumber(canvasStyles.paddingTop)}
                  onChange={(value) => onUpdate('paddingTop', numberToPx(value))}
                  placeholder="32"
                  min={0}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel text="Right" />
                <ClearableNumberInput
                  value={pxToNumber(canvasStyles.paddingRight)}
                  onChange={(value) => onUpdate('paddingRight', numberToPx(value))}
                  placeholder="32"
                  min={0}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel text="Bottom" />
                <ClearableNumberInput
                  value={pxToNumber(canvasStyles.paddingBottom)}
                  onChange={(value) => onUpdate('paddingBottom', numberToPx(value))}
                  placeholder="32"
                  min={0}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel text="Left" />
                <ClearableNumberInput
                  value={pxToNumber(canvasStyles.paddingLeft)}
                  onChange={(value) => onUpdate('paddingLeft', numberToPx(value))}
                  placeholder="32"
                  min={0}
                />
              </div>
            </div>
          )}
        </div>

        {/* Vertical Margin */}
        <div className="flex flex-col gap-2">
          <FieldLabel text="Vertical Margin" />
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <FieldLabel text="Top" />
              <ClearableNumberInput
                value={pxToNumber(canvasStyles.marginTop)}
                onChange={(value) => onUpdate('marginTop', numberToPx(value))}
                placeholder="0"
                min={0}
              />
            </div>
            <div className="flex flex-col gap-1">
              <FieldLabel text="Bottom" />
              <ClearableNumberInput
                value={pxToNumber(canvasStyles.marginBottom)}
                onChange={(value) => onUpdate('marginBottom', numberToPx(value))}
                placeholder="0"
                min={0}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-2" />

      {/* Border Section */}
      <div className="flex flex-col gap-4">
        <SectionLabel text="Border" />

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <FieldLabel text="Width" />
            <ClearableNumberInput
              value={pxToNumber(canvasStyles.borderWidth)}
              onChange={(value) => onUpdate('borderWidth', numberToPx(value))}
              min={0}
            />
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel text="Style" />
            <Select
              value={canvasStyles.borderStyle}
              onValueChange={(value) => onUpdate('borderStyle', value)}
            >
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
          <FieldLabel text="Color" />
          <ColorPicker
            value={canvasStyles.borderColor}
            onChange={(value) => onUpdate('borderColor', value)}
            placeholder="#cccccc"
          />
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel text="Border Radius" />
          <ClearableNumberInput
            value={pxToNumber(canvasStyles.borderRadius)}
            onChange={(value) => onUpdate('borderRadius', numberToPx(value))}
            min={0}
          />
        </div>
      </div>

      <Separator className="my-2" />

      {/* Appearance Section */}
      <div className="flex flex-col gap-4">
        <SectionLabel text="Appearance" />

        <div className="flex flex-col gap-2">
          <FieldLabel text="Background Color" />
          <ColorPicker
            value={canvasStyles.backgroundColor}
            onChange={(value) => onUpdate('backgroundColor', value)}
            placeholder="#ffffff"
          />
        </div>

        <div className="flex flex-col gap-2">
          <FieldLabel text="Font Family" />
          <Select
            value={canvasStyles.fontFamily}
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
      </div>
    </div>
  );
};
