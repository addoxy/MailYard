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

  const marginTop = getBlockProperty(block, 'marginTop') || '0px';
  const marginRight = getBlockProperty(block, 'marginRight') || '0px';
  const marginBottom = getBlockProperty(block, 'marginBottom') || '0px';
  const marginLeft = getBlockProperty(block, 'marginLeft') || '0px';
  const paddingTop = getBlockProperty(block, 'paddingTop') || '0px';
  const paddingRight = getBlockProperty(block, 'paddingRight') || '0px';
  const paddingBottom = getBlockProperty(block, 'paddingBottom') || '0px';
  const paddingLeft = getBlockProperty(block, 'paddingLeft') || '0px';

  const updateLinkedMargin = (value: string) => {
    onUpdate('marginTop', value);
    onUpdate('marginBottom', value);
    onUpdate('marginLeft', value);
    onUpdate('marginRight', value);
  };

  const updateLinkedPadding = (value: string) => {
    onUpdate('paddingTop', value);
    onUpdate('paddingBottom', value);
    onUpdate('paddingLeft', value);
    onUpdate('paddingRight', value);
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
              type="text"
              value={marginTop}
              onChange={(e) => updateLinkedMargin(e.target.value)}
              className="h-8 text-xs"
              placeholder="0px"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Top</Label>
                <Input
                  type="text"
                  value={marginTop}
                  onChange={(e) => onUpdate('marginTop', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="0px"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Right</Label>
                <Input
                  type="text"
                  value={marginRight}
                  onChange={(e) => onUpdate('marginRight', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="0px"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Bottom</Label>
                <Input
                  type="text"
                  value={marginBottom}
                  onChange={(e) => onUpdate('marginBottom', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="0px"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Left</Label>
                <Input
                  type="text"
                  value={marginLeft}
                  onChange={(e) => onUpdate('marginLeft', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="0px"
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
              type="text"
              value={paddingTop}
              onChange={(e) => updateLinkedPadding(e.target.value)}
              className="h-8 text-xs"
              placeholder="0px"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Top</Label>
                <Input
                  type="text"
                  value={paddingTop}
                  onChange={(e) => onUpdate('paddingTop', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="0px"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Right</Label>
                <Input
                  type="text"
                  value={paddingRight}
                  onChange={(e) => onUpdate('paddingRight', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="0px"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Bottom</Label>
                <Input
                  type="text"
                  value={paddingBottom}
                  onChange={(e) => onUpdate('paddingBottom', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="0px"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Left</Label>
                <Input
                  type="text"
                  value={paddingLeft}
                  onChange={(e) => onUpdate('paddingLeft', e.target.value)}
                  className="h-8 text-xs"
                  placeholder="0px"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};