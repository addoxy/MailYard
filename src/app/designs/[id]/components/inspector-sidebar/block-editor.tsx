'use client';

import { Separator } from '@/components/ui/separator';
import { useAtom } from 'jotai';
import {
  canvasStylesAtom,
  emailBlocksAtom,
  selectedBlockIdAtom,
  selectedBlockIdsAtom,
} from '../../atoms';
import { useBulkEditing } from '../../hooks/use-bulk-editing';
import { AlignmentControls } from './property-controls/alignment-controls';
import { BorderControls } from './property-controls/border-controls';
import { BulkEditControls } from './property-controls/bulk-edit-controls';
import { CanvasControls } from './property-controls/canvas-controls';
import { ColorControls } from './property-controls/color-controls';
import { LinkControls } from './property-controls/link-controls';
import { SpacingControls } from './property-controls/spacing-controls';
import { TextControls } from './property-controls/text-controls';
import { TypographyControls } from './property-controls/typography-controls';

export const BlockEditor = () => {
  const [selectedBlockId] = useAtom(selectedBlockIdAtom);
  const [selectedBlockIds] = useAtom(selectedBlockIdsAtom);
  const [emailBlocks, setEmailBlocks] = useAtom(emailBlocksAtom);
  const [canvasStyles, setCanvasStyles] = useAtom(canvasStylesAtom);
  const { updateBulkProperty, getCommonBlockTypes } = useBulkEditing();

  const selectedBlock = emailBlocks.find((block) => block.id === selectedBlockId);
  const hasMultipleSelected = selectedBlockIds.length > 1;

  // Show canvas controls when no block is selected
  if (!selectedBlock && selectedBlockIds.length === 0) {
    const updateCanvasStyle = (property: string, value: string) => {
      setCanvasStyles((prev) => ({
        ...prev,
        [property]: value,
      }));
    };

    return (
      <div className="p-6">
        <CanvasControls canvasStyles={canvasStyles} onUpdate={updateCanvasStyle} />
      </div>
    );
  }

  // Handle multi-select
  if (hasMultipleSelected) {
    const blockTypes = getCommonBlockTypes(selectedBlockIds);

    return (
      <div className="p-6">
        <div className="border-b pb-4">
          <div className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Multi-Select
          </div>
          <div className="text-foreground mt-1 text-sm">
            {selectedBlockIds.length} blocks selected
          </div>
        </div>

        <div className="mt-6 space-y-6">
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
      setEmailBlocks((blocks) =>
        blocks.map((block) =>
          block.id === selectedBlockId ? { ...block, [property]: value } : block
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
            <TextControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <AlignmentControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <TypographyControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <ColorControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <BorderControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <SpacingControls block={selectedBlock} onUpdate={updateBlockProperty} />
          </>
        );

      case 'button':
      case 'link':
        return (
          <>
            <TextControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <LinkControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <AlignmentControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <TypographyControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <ColorControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            {(selectedBlock.type === 'button' || selectedBlock.type === 'link') && (
              <>
                <BorderControls block={selectedBlock} onUpdate={updateBlockProperty} />
                <Separator className="my-6" />
              </>
            )}
            <SpacingControls block={selectedBlock} onUpdate={updateBlockProperty} />
          </>
        );

      case 'divider':
        return (
          <>
            <BorderControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <SpacingControls block={selectedBlock} onUpdate={updateBlockProperty} />
          </>
        );

      case 'image':
        return (
          <>
            <div className="space-y-3">
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Image Source
                </label>
                <input
                  type="url"
                  value={('src' in selectedBlock ? selectedBlock.src : '') || ''}
                  onChange={(e) => updateBlockProperty('src', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-1 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={('alt' in selectedBlock ? selectedBlock.alt : '') || ''}
                  onChange={(e) => updateBlockProperty('alt', e.target.value)}
                  placeholder="Image description"
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-1 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div>
                <label className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Width
                </label>
                <input
                  type="text"
                  value={('width' in selectedBlock ? selectedBlock.width : '') || ''}
                  onChange={(e) => updateBlockProperty('width', e.target.value)}
                  placeholder="300px"
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring mt-1 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <Separator className="my-6" />
            <AlignmentControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <BorderControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-6" />
            <SpacingControls block={selectedBlock} onUpdate={updateBlockProperty} />
          </>
        );

      default:
        return <div className="text-muted-foreground text-sm">Unsupported block type</div>;
    }
  };

  // Handle single block selection
  if (!selectedBlock) return null;

  return (
    <div className="space-y-6 p-6">
      <div className="border-b pb-4">
        <div className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
          {selectedBlock.type} Block
        </div>
        <div className="text-foreground mt-1.5 text-sm capitalize">{selectedBlock.type}</div>
      </div>
      <div className="space-y-6">{renderBlockTypeControls()}</div>
    </div>
  );
};
