'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  textValue?: string; // For cases where text value differs from color value (e.g., "Mixed")
  textInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const ColorPicker = ({
  value,
  onChange,
  label,
  placeholder = '#000000',
  className,
  textValue,
  textInputProps,
}: ColorPickerProps) => {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Update local value when external value changes
  if (value !== localValue) {
    setLocalValue(value);
  }

  // Debounced onChange to reduce rapid updates during dragging
  const debouncedOnChange = useCallback(
    (newValue: string) => {
      setLocalValue(newValue);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        onChange(newValue);
      }, 16); // ~60fps update rate
    },
    [onChange]
  );

  // Immediate onChange for text input (no debouncing needed)
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      onChange(newValue);
    },
    [onChange]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="relative flex size-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded border"
        style={{ backgroundColor: localValue }}
      >
        <input
          type="color"
          value={localValue}
          onChange={(e) => debouncedOnChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label || 'Color picker'}
        />
      </div>
      <Input
        type="text"
        value={textValue ?? localValue}
        onChange={handleTextChange}
        className="h-8 flex-1 font-mono text-xs"
        placeholder={placeholder}
        {...textInputProps}
      />
    </div>
  );
};
