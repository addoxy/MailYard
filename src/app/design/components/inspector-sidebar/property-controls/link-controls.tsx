'use client';

import { FieldLabel, SectionLabel } from '@/components/settings-labels';
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
    <div className="flex flex-col gap-4">
      <SectionLabel text="Link URL" />
      
      <Input
        type="url"
        value={href}
        onChange={(e) => onUpdate('href', e.target.value)}
        className="h-8 text-xs"
        placeholder="https://example.com"
      />
    </div>
  );
};