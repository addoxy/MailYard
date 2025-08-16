'use client';

import { useState, useRef } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

// Custom number input that allows clearing
const ClearableNumberInput = ({ 
  value, 
  onChange, 
  placeholder = "0",
  className = "",
  min,
  max,
  step
}: {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number | string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [tempValue, setTempValue] = useState('');
  const lastValidValue = useRef(value);

  // Update last valid value when prop changes
  if (value !== lastValidValue.current && !isFocused) {
    lastValidValue.current = value;
  }

  const handleFocus = () => {
    setIsFocused(true);
    setTempValue(value.toString());
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (tempValue === '' || tempValue === undefined) {
      // If empty, use last valid value
      onChange(lastValidValue.current);
    } else {
      const numValue = Number(tempValue);
      if (!isNaN(numValue)) {
        lastValidValue.current = numValue;
        onChange(numValue);
      } else {
        onChange(lastValidValue.current);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTempValue(newValue);
    
    // Only update immediately if it's a valid number
    if (newValue !== '' && !isNaN(Number(newValue))) {
      onChange(Number(newValue));
    }
  };

  return (
    <Input
      type="number"
      value={isFocused ? tempValue : value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
    />
  );
};

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

  // Helper functions to convert between px strings and numeric values
  const pxToNumber = (value: string): number => {
    return parseInt(value?.replace('px', '') || '0');
  };
  
  const numberToPx = (value: number): string => {
    return `${value}px`;
  };

  // Extract numeric values
  const borderWidthValue = pxToNumber(borderWidth);
  const borderRadiusValue = pxToNumber(borderRadius);

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
              <div className="flex items-center gap-2">
                <ClearableNumberInput
                  value={borderWidthValue}
                  onChange={(value) => onUpdate('borderWidth', numberToPx(value))}
                  className="h-8 text-xs flex-1"
                  placeholder="0"
                  min={0}
                />
                <span className="text-xs text-muted-foreground">px</span>
              </div>
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
          <div className="flex items-center gap-2">
            <ClearableNumberInput
              value={borderRadiusValue}
              onChange={(value) => onUpdate('borderRadius', numberToPx(value))}
              className="h-8 text-xs flex-1"
              placeholder="0"
              min={0}
            />
            <span className="text-xs text-muted-foreground">px</span>
          </div>
        </div>
      )}
    </div>
  );
};