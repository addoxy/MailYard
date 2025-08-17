'use client';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

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
  placeholder = "#000000",
  className,
  textValue,
  textInputProps
}: ColorPickerProps) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className="relative flex size-[30px] cursor-pointer items-center justify-center overflow-hidden rounded border"
        style={{ backgroundColor: value }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label || "Color picker"}
        />
      </div>
      <Input
        type="text"
        value={textValue ?? value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 flex-1 font-mono text-xs"
        placeholder={placeholder}
        {...textInputProps}
      />
    </div>
  );
};