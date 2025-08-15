'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, Unlink } from 'lucide-react';
import { useState } from 'react';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

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
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setMarginLinked(!marginLinked)}
            >
              {marginLinked ? <Link className="h-3 w-3" /> : <Unlink className="h-3 w-3" />}
            </Button>
          </div>
          
          {marginLinked ? (
            <Input
              type="number"
              value={marginTop}
              onChange={(e) => updateLinkedMargin(Number(e.target.value) || 0)}
              className="h-8 text-xs"
              placeholder="0"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Top</Label>
                <Input
                  type="number"
                  value={marginTop}
                  onChange={(e) => onUpdate('marginTop', numberToPx(Number(e.target.value) || 0))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Right</Label>
                <Input
                  type="number"
                  value={marginRight}
                  onChange={(e) => onUpdate('marginRight', numberToPx(Number(e.target.value) || 0))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Bottom</Label>
                <Input
                  type="number"
                  value={marginBottom}
                  onChange={(e) => onUpdate('marginBottom', numberToPx(Number(e.target.value) || 0))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Left</Label>
                <Input
                  type="number"
                  value={marginLeft}
                  onChange={(e) => onUpdate('marginLeft', numberToPx(Number(e.target.value) || 0))}
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
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setPaddingLinked(!paddingLinked)}
            >
              {paddingLinked ? <Link className="h-3 w-3" /> : <Unlink className="h-3 w-3" />}
            </Button>
          </div>
          
          {paddingLinked ? (
            <Input
              type="number"
              value={paddingTop}
              onChange={(e) => updateLinkedPadding(Number(e.target.value) || 0)}
              className="h-8 text-xs"
              placeholder="0"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Top</Label>
                <Input
                  type="number"
                  value={paddingTop}
                  onChange={(e) => onUpdate('paddingTop', numberToPx(Number(e.target.value) || 0))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Right</Label>
                <Input
                  type="number"
                  value={paddingRight}
                  onChange={(e) => onUpdate('paddingRight', numberToPx(Number(e.target.value) || 0))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Bottom</Label>
                <Input
                  type="number"
                  value={paddingBottom}
                  onChange={(e) => onUpdate('paddingBottom', numberToPx(Number(e.target.value) || 0))}
                  className="h-8 text-xs"
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Left</Label>
                <Input
                  type="number"
                  value={paddingLeft}
                  onChange={(e) => onUpdate('paddingLeft', numberToPx(Number(e.target.value) || 0))}
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