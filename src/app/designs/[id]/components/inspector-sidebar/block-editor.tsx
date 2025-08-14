'use client';

import { useAtom } from 'jotai';
import { selectedBlockIdAtom, emailBlocksAtom, canvasStylesAtom } from '../../atoms';
import { EmailBlockType } from '../email-blocks/types';
import { TextControls } from './property-controls/text-controls';
import { AlignmentControls } from './property-controls/alignment-controls';
import { ColorControls } from './property-controls/color-controls';
import { TypographyControls } from './property-controls/typography-controls';
import { SpacingControls } from './property-controls/spacing-controls';
import { BorderControls } from './property-controls/border-controls';
import { LinkControls } from './property-controls/link-controls';
import { CanvasControls } from './property-controls/canvas-controls';
import { Separator } from '@/components/ui/separator';

export const BlockEditor = () => {
  const [selectedBlockId] = useAtom(selectedBlockIdAtom);
  const [emailBlocks, setEmailBlocks] = useAtom(emailBlocksAtom);
  const [canvasStyles, setCanvasStyles] = useAtom(canvasStylesAtom);

  const selectedBlock = emailBlocks.find(block => block.id === selectedBlockId);

  // Show canvas controls when no block is selected
  if (!selectedBlock) {
    const updateCanvasStyle = (property: string, value: string) => {
      setCanvasStyles(prev => ({
        ...prev,
        [property]: value
      }));
    };

    return (
      <div className="p-4">
        <CanvasControls 
          canvasStyles={canvasStyles} 
          onUpdate={updateCanvasStyle} 
        />
      </div>
    );
  }

  const updateBlockProperty = (property: string, value: string | number) => {
    setEmailBlocks(blocks =>
      blocks.map(block =>
        block.id === selectedBlockId
          ? { ...block, [property]: value }
          : block
      )
    );
  };

  const renderBlockTypeControls = () => {
    switch (selectedBlock.type) {
      case 'heading':
      case 'text':
        return (
          <>
            <TextControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <AlignmentControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <TypographyControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <ColorControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <SpacingControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
          </>
        );
      
      case 'button':
      case 'link':
        return (
          <>
            <TextControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <LinkControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <AlignmentControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <TypographyControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <ColorControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            {selectedBlock.type === 'button' && (
              <>
                <BorderControls 
                  block={selectedBlock} 
                  onUpdate={updateBlockProperty} 
                />
                <Separator className="my-4" />
              </>
            )}
            <SpacingControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
          </>
        );

      case 'container':
        return (
          <>
            <ColorControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <BorderControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <SpacingControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
          </>
        );

      case 'divider':
        return (
          <>
            <BorderControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
            <Separator className="my-4" />
            <SpacingControls 
              block={selectedBlock} 
              onUpdate={updateBlockProperty} 
            />
          </>
        );

      default:
        return <div className="text-muted-foreground text-sm">Unsupported block type</div>;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="border-b pb-2">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {selectedBlock.type} Block
        </div>
        <div className="text-sm text-foreground capitalize mt-1">
          {selectedBlock.type === 'heading' ? `H${('level' in selectedBlock ? selectedBlock.level : '1')} Heading` : selectedBlock.type}
        </div>
      </div>
      
      <div className="space-y-4">
        {renderBlockTypeControls()}
      </div>
    </div>
  );
};