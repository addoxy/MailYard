'use client';

import { useAtom } from 'jotai';
import { selectedBlockIdAtom, selectedBlockIdsAtom, emailBlocksAtom, canvasStylesAtom } from '../../atoms';
import { TextControls } from './property-controls/text-controls';
import { AlignmentControls } from './property-controls/alignment-controls';
import { ColorControls } from './property-controls/color-controls';
import { TypographyControls } from './property-controls/typography-controls';
import { SpacingControls } from './property-controls/spacing-controls';
import { BorderControls } from './property-controls/border-controls';
import { LinkControls } from './property-controls/link-controls';
import { CanvasControls } from './property-controls/canvas-controls';
import { BulkEditControls } from './property-controls/bulk-edit-controls';
import { Separator } from '@/components/ui/separator';
import { useBulkEditing } from '../../hooks/use-bulk-editing';

export const BlockEditor = () => {
  const [selectedBlockId] = useAtom(selectedBlockIdAtom);
  const [selectedBlockIds] = useAtom(selectedBlockIdsAtom);
  const [emailBlocks, setEmailBlocks] = useAtom(emailBlocksAtom);
  const [canvasStyles, setCanvasStyles] = useAtom(canvasStylesAtom);
  const { updateBulkProperty, getCommonBlockTypes } = useBulkEditing();

  const selectedBlock = emailBlocks.find(block => block.id === selectedBlockId);
  const hasMultipleSelected = selectedBlockIds.length > 1;

  // Show canvas controls when no block is selected
  if (!selectedBlock && selectedBlockIds.length === 0) {
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

  // Handle multi-select
  if (hasMultipleSelected) {
    const blockTypes = getCommonBlockTypes(selectedBlockIds);
    
    return (
      <div className="p-4">
        <div className="border-b pb-2">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Multi-Select
          </div>
          <div className="text-sm text-foreground mt-1">
            {selectedBlockIds.length} blocks selected
            {blockTypes.length > 1 && (
              <span className="text-muted-foreground ml-1">
                ({blockTypes.join(', ')})
              </span>
            )}
          </div>
        </div>
        
        <div className="space-y-4 mt-4">
          <BulkEditControls selectedBlockIds={selectedBlockIds} />
        </div>
      </div>
    );
  }

  // Handle single block selection
  const updateBlockProperty = (property: string, value: string | number) => {
    if (hasMultipleSelected) {
      updateBulkProperty(selectedBlockIds, property, value);
    } else {
      setEmailBlocks(blocks =>
        blocks.map(block =>
          block.id === selectedBlockId
            ? { ...block, [property]: value }
            : block
        )
      );
    }
  };

  const renderBlockTypeControls = () => {
    if (!selectedBlock) return null;
    
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

  // Handle single block selection
  if (!selectedBlock) return null;

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