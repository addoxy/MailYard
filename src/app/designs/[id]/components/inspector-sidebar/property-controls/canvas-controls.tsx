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
import { useState } from 'react';
import { LinkToggleButton } from './link-toggle-button';

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
    { value: '320px', label: '320px (Small Mobile)' },
    { value: '375px', label: '375px (Mobile)' },
    { value: '414px', label: '414px (Large Mobile)' },
    { value: '480px', label: '480px (Small Tablet)' },
    { value: '600px', label: '600px (Standard)' },
    { value: '640px', label: '640px (Wide)' },
    { value: '768px', label: '768px (Tablet)' },
    { value: '1024px', label: '1024px (Desktop)' },
    { value: '100%', label: '100% (Full Width)' },
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
                value={canvasStyles.maxWidth}
                onValueChange={(value) => onUpdate('maxWidth', value)}
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
                </SelectContent>
              </Select>
              <Input
                type="number"
                value={canvasStyles.maxWidth.replace('px', '').replace('%', '')}
                onChange={(e) => {
                  const value = e.target.value;
                  // Only apply px if it's a valid number, keep original format for %
                  if (canvasStyles.maxWidth.includes('%')) {
                    onUpdate('maxWidth', `${value}%`);
                  } else {
                    onUpdate('maxWidth', value ? `${value}px` : '');
                  }
                }}
                className="h-8 w-1/3 font-mono text-xs"
                placeholder="600"
                min="1"
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
              <Input
                type="text"
                value={canvasStyles.padding}
                onChange={(e) => onUpdate('padding', e.target.value)}
                className="mt-1 h-8 text-xs"
                placeholder="20px"
              />
            ) : (
              <div className="mt-1 grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">X (Left/Right)</Label>
                  <Input
                    type="number"
                    value={currentPadding.x}
                    onChange={(e) => updatePaddingX(Number(e.target.value) || 0)}
                    className="h-8 text-xs"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-muted-foreground text-xs">Y (Top/Bottom)</Label>
                  <Input
                    type="number"
                    value={currentPadding.y}
                    onChange={(e) => updatePaddingY(Number(e.target.value) || 0)}
                    className="h-8 text-xs"
                    placeholder="0"
                  />
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
          <div className="flex items-center gap-2">
            <div
              className="relative flex size-[30px] cursor-pointer items-center justify-center overflow-hidden rounded border"
              style={{ backgroundColor: canvasStyles.backgroundColor }}
            >
              <input
                type="color"
                value={canvasStyles.backgroundColor}
                onChange={(e) => onUpdate('backgroundColor', e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
            <Input
              type="text"
              value={canvasStyles.backgroundColor}
              onChange={(e) => onUpdate('backgroundColor', e.target.value)}
              className="h-8 flex-1 font-mono text-xs"
              placeholder="#ffffff"
            />
          </div>
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
