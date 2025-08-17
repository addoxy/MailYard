'use client';

import { Input } from '@/components/ui/input';
import { useRef, useState } from 'react';

interface ClearableNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number | string;
}

export const ClearableNumberInput = ({
  value,
  onChange,
  placeholder = '0',
  className = 'h-8',
  min = 0,
  max,
  step,
}: ClearableNumberInputProps) => {
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
