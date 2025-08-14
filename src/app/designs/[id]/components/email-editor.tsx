'use client';

import { cn } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { deviceViewAtom, emailBlocksAtom, canvasStylesAtom } from '../atoms';
import { renderBlock } from './email-blocks/block-registry';
import { useBlockSelection } from '../hooks/use-block-selection';
import { BlockSelector } from './email-section/block-selector';

export const EmailEditor = () => {
  const deviceView = useAtomValue(deviceViewAtom);
  const emailBlocks = useAtomValue(emailBlocksAtom);
  const canvasStyles = useAtomValue(canvasStylesAtom);
  const { selectBlock, isBlockSelected, clearSelection } = useBlockSelection();

  const handleBlockClick = (blockId: string) => {
    selectBlock(blockId);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Clear selection when clicking on empty canvas area
    if (e.target === e.currentTarget) {
      clearSelection();
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center pb-16">
      <div
        className={cn(
          'shadow-md transition-all duration-500',
          deviceView === 'desktop' ? 'h-full w-full' : 'bg-accent h-4/6 w-88 rounded-xl border p-2'
        )}
      >
        <div
          className={cn(
            'h-full w-full overflow-auto',
            deviceView === 'mobile' ? 'rounded-lg border' : ''
          )}
          style={{
            backgroundColor: canvasStyles.backgroundColor,
            padding: canvasStyles.padding,
            fontFamily: canvasStyles.fontFamily,
          }}
          onClick={handleCanvasClick}
        >
          <div 
            className="mx-auto"
            style={{ 
              maxWidth: canvasStyles.maxWidth,
              width: '100%'
            }}
          >
            {emailBlocks.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-muted-foreground text-lg">
                  Click on a block from the sidebar to add it to your email
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {emailBlocks.map((block) => (
                  <BlockSelector
                    key={block.id}
                    blockId={block.id}
                    isSelected={isBlockSelected(block.id)}
                    onClick={() => handleBlockClick(block.id)}
                  >
                    {renderBlock(block, handleBlockClick, isBlockSelected(block.id))}
                  </BlockSelector>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
