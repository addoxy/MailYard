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
import { getBlockDisplayName, getBlockIcon } from '../email-blocks/block-icons';
import { ImageBlockProps } from '../email-blocks/types';
import { AlignmentControls } from './property-controls/alignment-controls';
import { BorderControls } from './property-controls/border-controls';
import { BulkEditControls } from './property-controls/bulk-edit-controls';
import { CanvasControls } from './property-controls/canvas-controls';
import { ColorControls } from './property-controls/color-controls';
import { ImageControls } from './property-controls/image-controls';
import { LinkControls } from './property-controls/link-controls';
import { SpacingControls } from './property-controls/spacing-controls';
import { TextControls } from './property-controls/text-controls';
import { TypographyControls } from './property-controls/typography-controls';
import { WidthControls } from './property-controls/width-controls';

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
      <div className="px-6 pb-6">
        <CanvasControls canvasStyles={canvasStyles} onUpdate={updateCanvasStyle} />
      </div>
    );
  }

  // Handle multi-select
  if (hasMultipleSelected) {
    const blockTypes = getCommonBlockTypes(selectedBlockIds);

    return (
      <div className="px-6 pb-6">
        <div className="-mx-6 flex h-16 items-center border-b px-6">
          <span className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            Multi-Select
          </span>
        </div>

        <div className="mt-4 space-y-4">
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
            <Separator className="my-4" />
            <AlignmentControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <WidthControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <TypographyControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <ColorControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <BorderControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <SpacingControls block={selectedBlock} onUpdate={updateBlockProperty} />
          </>
        );

      case 'button':
      case 'link':
        return (
          <>
            <TextControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <LinkControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <AlignmentControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <WidthControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <TypographyControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <ColorControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            {(selectedBlock.type === 'button' || selectedBlock.type === 'link') && (
              <>
                <BorderControls block={selectedBlock} onUpdate={updateBlockProperty} />
                <Separator className="my-4" />
              </>
            )}
            <SpacingControls block={selectedBlock} onUpdate={updateBlockProperty} />
          </>
        );

      case 'divider':
        return (
          <>
            <AlignmentControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <WidthControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <ColorControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <SpacingControls block={selectedBlock} onUpdate={updateBlockProperty} />
          </>
        );

      case 'image':
        return (
          <>
            <ImageControls block={selectedBlock as ImageBlockProps} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <AlignmentControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <WidthControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <BorderControls block={selectedBlock} onUpdate={updateBlockProperty} />
            <Separator className="my-4" />
            <SpacingControls block={selectedBlock} onUpdate={updateBlockProperty} />
          </>
        );

      default:
        return <div className="text-muted-foreground text-sm">Unsupported block type</div>;
    }
  };

  // Handle single block selection
  if (!selectedBlock) return null;

  const BlockIcon = getBlockIcon(selectedBlock.type);
  const blockDisplayName = getBlockDisplayName(selectedBlock.type);

  return (
    <div className="space-y-4">
      <div className="flex h-16 items-center gap-3 border-b px-6">
        <BlockIcon className="text-muted-foreground size-3.5" />
        <div className="text-foreground text-sm">{blockDisplayName}</div>
      </div>
      <div className="space-y-4 px-6 pb-6">{renderBlockTypeControls()}</div>
    </div>
  );
};
