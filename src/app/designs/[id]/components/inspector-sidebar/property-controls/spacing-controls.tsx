'use client';

import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';
import { LinkToggleButton } from './link-toggle-button';
import { ClearableNumberInput } from '@/components/clearable-number-input';

interface SpacingControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const SpacingControls = ({ block, onUpdate }: SpacingControlsProps) => {
  const [marginLinked, setMarginLinked] = useState(false);
  const [paddingLinked, setPaddingLinked] = useState(false);

  const hasMargin = hasProperty(block, 'marginTop');
  const hasPadding = hasProperty(block, 'paddingTop');

  if (!hasMargin && !hasPadding) return null;

  // Helper functions to convert between px strings and numeric values
  const pxToNumber = (value: string): number => {
    return parseInt(value?.replace('px', '') || '0');
  };
  
  const numberToPx = (value: number): string => {
    return `${value}px`;
  };

  const marginTop = pxToNumber(getBlockProperty(block, 'marginTop') || '0px');
  const marginRight = pxToNumber(getBlockProperty(block, 'marginRight') || '0px');
  const marginBottom = pxToNumber(getBlockProperty(block, 'marginBottom') || '0px');
  const marginLeft = pxToNumber(getBlockProperty(block, 'marginLeft') || '0px');
  const paddingTop = pxToNumber(getBlockProperty(block, 'paddingTop') || '0px');
  const paddingRight = pxToNumber(getBlockProperty(block, 'paddingRight') || '0px');
  const paddingBottom = pxToNumber(getBlockProperty(block, 'paddingBottom') || '0px');
  const paddingLeft = pxToNumber(getBlockProperty(block, 'paddingLeft') || '0px');

  const updateLinkedMargin = (value: number) => {
    const pxValue = numberToPx(value);
    onUpdate('marginTop', pxValue);
    onUpdate('marginBottom', pxValue);
    onUpdate('marginLeft', pxValue);
    onUpdate('marginRight', pxValue);
  };

  const updateLinkedPadding = (value: number) => {
    const pxValue = numberToPx(value);
    onUpdate('paddingTop', pxValue);
    onUpdate('paddingBottom', pxValue);
    onUpdate('paddingLeft', pxValue);
    onUpdate('paddingRight', pxValue);
  };


  return (
    <div className="space-y-4">
      <Label className="text-xs font-medium">Spacing</Label>
      
      {hasMargin && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Margin</Label>
            <LinkToggleButton
              mode={marginLinked ? 'linked' : 'unlinked'}
              onToggle={() => setMarginLinked(!marginLinked)}
            />
          </div>
          
          {marginLinked ? (
            <ClearableNumberInput
              value={marginTop}
              onChange={updateLinkedMargin}
              className="h-8 text-xs"
              placeholder="0"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Top</Label>
                <ClearableNumberInput
                  value={marginTop}
                  onChange={(value) => onUpdate('marginTop', numberToPx(value))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Right</Label>
                <ClearableNumberInput
                  value={marginRight}
                  onChange={(value) => onUpdate('marginRight', numberToPx(value))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Bottom</Label>
                <ClearableNumberInput
                  value={marginBottom}
                  onChange={(value) => onUpdate('marginBottom', numberToPx(value))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Left</Label>
                <ClearableNumberInput
                  value={marginLeft}
                  onChange={(value) => onUpdate('marginLeft', numberToPx(value))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {hasPadding && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Padding</Label>
            <LinkToggleButton
              mode={paddingLinked ? 'linked' : 'unlinked'}
              onToggle={() => setPaddingLinked(!paddingLinked)}
            />
          </div>
          
          {paddingLinked ? (
            <ClearableNumberInput
              value={paddingTop}
              onChange={updateLinkedPadding}
              className="h-8 text-xs"
              placeholder="0"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Top</Label>
                <ClearableNumberInput
                  value={paddingTop}
                  onChange={(value) => onUpdate('paddingTop', numberToPx(value))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Right</Label>
                <ClearableNumberInput
                  value={paddingRight}
                  onChange={(value) => onUpdate('paddingRight', numberToPx(value))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Bottom</Label>
                <ClearableNumberInput
                  value={paddingBottom}
                  onChange={(value) => onUpdate('paddingBottom', numberToPx(value))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Left</Label>
                <ClearableNumberInput
                  value={paddingLeft}
                  onChange={(value) => onUpdate('paddingLeft', numberToPx(value))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};