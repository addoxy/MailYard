'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

interface LinkControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const LinkControls = ({ block, onUpdate }: LinkControlsProps) => {
  const hasHref = hasProperty(block, 'href');
  const showHref = hasHref && (block.type === 'link' || block.type === 'button');

  if (!showHref) return null;

  const href = getBlockProperty(block, 'href') || '';

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium">Link URL</Label>
      
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">URL</Label>
        <Input
          type="url"
          value={href}
          onChange={(e) => onUpdate('href', e.target.value)}
          className="h-8 text-xs"
          placeholder="https://example.com"
        />
      </div>
    </div>
  );
};