'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

interface TextControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const TextControls = ({ block, onUpdate }: TextControlsProps) => {
  const hasContent = hasProperty(block, 'content');

  if (!hasContent) return null;

  const content = getBlockProperty(block, 'content') || '';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium">Content</Label>
      </div>
      
      <Textarea
        value={content}
        onChange={(e) => onUpdate('content', e.target.value)}
        placeholder="Enter text content..."
        className="min-h-[80px] text-sm"
      />
    </div>
  );
};