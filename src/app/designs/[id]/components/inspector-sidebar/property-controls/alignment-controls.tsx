'use client';

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { EmailBlockType } from '../../email-blocks/types';
import { hasProperty, getBlockProperty } from '../utils/block-property-utils';

interface AlignmentControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const AlignmentControls = ({ block, onUpdate }: AlignmentControlsProps) => {
  const hasTextAlign = hasProperty(block, 'textAlign');

  if (!hasTextAlign) return null;

  const textAlign = getBlockProperty(block, 'textAlign') || 'left';
  const isText = block.type === 'text';
  const isButton = block.type === 'button';
  const isImage = block.type === 'image';

  // Use "Alignment" for button and image blocks, "Text Alignment" for text blocks
  const labelText = (isButton || isImage) ? 'Alignment' : 'Text Alignment';

  return (
    <div className="space-y-3">
      <Label className="text-xs font-medium">{labelText}</Label>
      
      <div className="grid grid-cols-4 gap-1">
        <Button
          variant={textAlign === 'left' ? 'default' : 'outline'}
          size="sm"
          className="h-8 w-full"
          onClick={() => onUpdate('textAlign', 'left')}
        >
          <AlignLeft className="h-3 w-3" />
        </Button>
        <Button
          variant={textAlign === 'center' ? 'default' : 'outline'}
          size="sm"
          className="h-8 w-full"
          onClick={() => onUpdate('textAlign', 'center')}
        >
          <AlignCenter className="h-3 w-3" />
        </Button>
        <Button
          variant={textAlign === 'right' ? 'default' : 'outline'}
          size="sm"
          className="h-8 w-full"
          onClick={() => onUpdate('textAlign', 'right')}
        >
          <AlignRight className="h-3 w-3" />
        </Button>
        {isText && (
          <Button
            variant={textAlign === 'justify' ? 'default' : 'outline'}
            size="sm"
            className="h-8 w-full"
            onClick={() => onUpdate('textAlign', 'justify')}
          >
            <AlignJustify className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  );
};