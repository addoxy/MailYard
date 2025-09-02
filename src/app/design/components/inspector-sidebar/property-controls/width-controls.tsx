'use client';

import { ClearableNumberInput } from '@/components/clearable-number-input';
import { FieldLabel, SectionLabel } from '@/components/settings-labels';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { ButtonBlockProps, EmailBlockType } from '../../email-blocks/types';

interface WidthControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const WidthControls = ({ block, onUpdate }: WidthControlsProps) => {
  // Helper function to get current width value as percentage number
  const getWidthValue = () => {
    if (block.width === 'auto' || !block.width) return 100;
    // Extract percentage value (e.g., "75%" -> 75)
    if (typeof block.width === 'string' && block.width.includes('%')) {
      return parseInt(block.width.replace('%', ''));
    }
    return 100; // Default to 100%
  };

  // Helper function to determine button width mode
  const getButtonWidthMode = () => {
    if (block.type !== 'button') return 'custom';
    const buttonBlock = block as ButtonBlockProps;
    return buttonBlock.width === 'auto' || !buttonBlock.width ? 'fit' : 'custom';
  };

  const [buttonWidthMode, setButtonWidthMode] = useState(getButtonWidthMode());

  const handleWidthChange = (width: number) => {
    // Validate percentage bounds (1-100%)
    const validatedWidth = Math.max(1, Math.min(100, width));
    onUpdate('width', `${validatedWidth}%`);
  };

  const handleButtonWidthModeChange = (mode: string) => {
    setButtonWidthMode(mode);
    if (mode === 'fit') {
      onUpdate('width', 'auto');
    } else {
      // Switch to custom mode with current percentage or default 100%
      const currentWidth = getWidthValue();
      onUpdate('width', `${currentWidth}%`);
    }
  };

  const handleResetWidth = () => {
    if (block.type === 'button') {
      // Reset button to fit mode
      setButtonWidthMode('fit');
      onUpdate('width', 'auto');
    } else {
      // Reset other blocks to 100%
      onUpdate('width', '100%');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <SectionLabel text="Size" />
        <Button
          variant="ghost"
          size="sm"
          onClick={handleResetWidth}
          className="text-muted-foreground hover:text-foreground h-6 px-2 text-xs"
          title="Reset width"
        >
          <RotateCcw className="size-3" />
          Reset
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <FieldLabel text="Width" />
        {block.type === 'button' && (
          <div className="space-y-2">
            <Tabs value={buttonWidthMode} onValueChange={handleButtonWidthModeChange}>
              <TabsList className="grid h-fit w-full grid-cols-2 p-1">
                <TabsTrigger value="fit" className="h-5 rounded-sm px-1 py-0.5 text-xs">
                  Fit
                </TabsTrigger>
                <TabsTrigger value="custom" className="h-5 rounded-sm px-1 py-0.5 text-xs">
                  Custom
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        )}
      </div>

      <div className="mt-2">
        {block.type === 'button' && buttonWidthMode === 'fit' ? (
          <input
            type="text"
            value="Fit"
            disabled
            className="border-input bg-muted text-muted-foreground h-8 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Fit"
          />
        ) : (
          <ClearableNumberInput
            value={getWidthValue()}
            onChange={handleWidthChange}
            placeholder="100"
            min={1}
            max={100}
            className="w-full"
          />
        )}
        {!(block.type === 'button' && buttonWidthMode === 'fit') && (
          <div className="text-muted-foreground mt-1 text-xs">Percentage (1-100%)</div>
        )}
      </div>
    </div>
  );
};
