'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

interface LinkControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const LinkControls = ({ block, onUpdate }: LinkControlsProps) => {
  const hasHref = hasProperty(block, 'href');
  const hasTextDecoration = hasProperty(block, 'textDecoration');

  if (!hasHref && !hasTextDecoration) return null;

  const href = getBlockProperty(block, 'href') || '';
  const textDecoration = getBlockProperty(block, 'textDecoration') || 'none';

  const textDecorationOptions = [
    { value: 'none', label: 'None' },
    { value: 'underline', label: 'Underline' },
    { value: 'line-through', label: 'Line Through' },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium">Link Settings</Label>
      
      {hasHref && (
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
      )}

      {hasTextDecoration && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Text Decoration</Label>
          <Select
            value={textDecoration}
            onValueChange={(value) => onUpdate('textDecoration', value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {textDecorationOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};