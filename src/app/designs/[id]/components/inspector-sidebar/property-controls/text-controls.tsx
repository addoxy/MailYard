'use client';

import { SectionLabel } from '@/components/settings-labels';
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
    <div className="flex flex-col gap-2">
      <SectionLabel text="Content" />
      
      <Textarea
        value={content}
        onChange={(e) => onUpdate('content', e.target.value)}
        placeholder="Enter text content..."
        className="min-h-[80px] text-sm"
      />
    </div>
  );
};