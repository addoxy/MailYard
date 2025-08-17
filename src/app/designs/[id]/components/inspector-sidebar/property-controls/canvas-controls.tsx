'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ColorPicker } from '@/components/color-picker';
import { ClearableNumberInput } from '@/components/clearable-number-input';
import { pxToNumber, numberToPx } from '@/lib/style-utils';
import { useState, useRef } from 'react';
import { LinkToggleButton } from './link-toggle-button';

// Custom clearable input for max width
const ClearableMaxWidthInput = ({ 
  value, 
  onChange, 
  placeholder = "600",
  className = ""
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
    padding: string;
    fontFamily: string;
  };
  onUpdate: (property: string, value: string) => void;
}

export const CanvasControls = ({ canvasStyles, onUpdate }: CanvasControlsProps) => {
  const [paddingMode, setPaddingMode] = useState<'single' | 'xy'>('single');

  // Parse current padding value
  const parsePadding = (padding: string) => {
    const values = padding.split(' ');
    if (values.length === 1) {
      // Single value (e.g., "20px")
      const val = parseInt(values[0].replace('px', '')) || 0;
      return { x: val, y: val };
    } else if (values.length === 2) {
      // Two values: Y X (e.g., "20px 30px")
      const y = parseInt(values[0].replace('px', '')) || 0;
      const x = parseInt(values[1].replace('px', '')) || 0;
      return { x, y };
    } else if (values.length === 4) {
      // Four values: top right bottom left
      const top = parseInt(values[0].replace('px', '')) || 0;
      const right = parseInt(values[1].replace('px', '')) || 0;
      const bottom = parseInt(values[2].replace('px', '')) || 0;
      const left = parseInt(values[3].replace('px', '')) || 0;
      // Convert to X/Y: if top===bottom and left===right, use those values
      if (top === bottom && left === right) {
        return { x: left, y: top };
      }
      // Otherwise, use average
      return { x: (left + right) / 2, y: (top + bottom) / 2 };
    }
    return { x: 0, y: 0 };
  };

  const currentPadding = parsePadding(canvasStyles.padding);

  const updatePaddingX = (x: number) => {
    onUpdate('padding', `${currentPadding.y}px ${x}px`);
  };

  const updatePaddingY = (y: number) => {
    onUpdate('padding', `${y}px ${currentPadding.x}px`);
  };

  const maxWidthPresets = [
    { value: '320px', label: 'Small Mobile (320px)' },
    { value: '375px', label: 'Mobile (375px)' },
    { value: '414px', label: 'Large Mobile (414px)' },
    { value: '480px', label: 'Small Tablet (480px)' },
    { value: '600px', label: 'Standard (600px)' },
    { value: '640px', label: 'Wide (640px)' },
    { value: '768px', label: 'Tablet (768px)' },
    { value: '1024px', label: 'Desktop (1024px)' },
    { value: '100%', label: 'Full Width (100%)' },
  ];

  // Check if current maxWidth matches any preset
  const isCustomMaxWidth = !maxWidthPresets.some(preset => preset.value === canvasStyles.maxWidth);
  const displayValue = isCustomMaxWidth ? 'custom' : canvasStyles.maxWidth;

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
    <div className="space-y-4">
      <div className="border-b pb-2">
        <div className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          Canvas Settings
        </div>
        <div className="text-foreground mt-1 text-sm">Page Layout & Defaults</div>
      </div>

      {/* Layout Settings */}
      <div className="space-y-3">
        <Label className="text-xs font-medium">Layout</Label>

        <div className="space-y-3">
          <div>
            <Label className="text-muted-foreground text-xs">Max Width</Label>
            <div className="mt-1 flex items-center gap-2">
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

          <div>
            <div className="flex items-center justify-between">
              <Label className="text-muted-foreground text-xs">Container Padding</Label>
              <LinkToggleButton
                mode={paddingMode}
                onToggle={() => setPaddingMode(paddingMode === 'single' ? 'xy' : 'single')}
              />
            </div>

            {paddingMode === 'single' ? (
              <div className="mt-1 flex items-center gap-2">
                <ClearableNumberInput
                  value={pxToNumber(canvasStyles.padding)}
                  onChange={(value) => onUpdate('padding', numberToPx(value))}
                  className="h-8 text-xs flex-1"
                  placeholder="20"
                  min={0}
                />
                <span className="text-xs text-muted-foreground">px</span>
              </div>
            ) : (
              <div className="mt-1 grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">X (Left/Right)</Label>
                  <div className="flex items-center gap-2">
                    <ClearableNumberInput
                      value={currentPadding.x}
                      onChange={(value) => updatePaddingX(value)}
                      className="h-8 text-xs flex-1"
                      placeholder="0"
                      min={0}
                    />
                    <span className="text-xs text-muted-foreground">px</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Y (Top/Bottom)</Label>
                  <div className="flex items-center gap-2">
                    <ClearableNumberInput
                      value={currentPadding.y}
                      onChange={(value) => updatePaddingY(value)}
                      className="h-8 text-xs flex-1"
                      placeholder="0"
                      min={0}
                    />
                    <span className="text-xs text-muted-foreground">px</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="space-y-3">
        <Label className="text-xs font-medium">Background</Label>

        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs">Background Color</Label>
          <ColorPicker
            value={canvasStyles.backgroundColor}
            onChange={(value) => onUpdate('backgroundColor', value)}
            label="Canvas Background Color"
            placeholder="#ffffff"
          />
        </div>
      </div>

      {/* Default Font */}
      <div className="space-y-3">
        <Label className="text-xs font-medium">Default Font</Label>

        <div className="space-y-2">
          <Label className="text-muted-foreground text-xs">Font Family</Label>
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
