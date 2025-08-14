'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { EmailBlockType, HeadingBlockProps } from '../../email-blocks/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

interface TextControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const TextControls = ({ block, onUpdate }: TextControlsProps) => {
  const hasContent = hasProperty(block, 'content');
  const hasLevel = hasProperty(block, 'level');

  if (!hasContent) return null;

  const content = getBlockProperty(block, 'content') || '';
  const level = getBlockProperty(block, 'level');

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
      
      {hasLevel && level && (
        <div className="space-y-2">
          <Label className="text-xs font-medium">Heading Level</Label>
          <Select
            value={level.toString()}
            onValueChange={(value) => onUpdate('level', parseInt(value) as HeadingBlockProps['level'])}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">H1</SelectItem>
              <SelectItem value="2">H2</SelectItem>
              <SelectItem value="3">H3</SelectItem>
              <SelectItem value="4">H4</SelectItem>
              <SelectItem value="5">H5</SelectItem>
              <SelectItem value="6">H6</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};