'use client';

import { cn } from '@/lib/utils';
import { useAtomValue, useSetAtom } from 'jotai';
import { deviceViewAtom, emailBlocksAtom, selectedBlockIdAtom } from '../atoms';
import { renderBlock } from './email-blocks/block-registry';

export const EmailEditor = () => {
  const deviceView = useAtomValue(deviceViewAtom);
  const emailBlocks = useAtomValue(emailBlocksAtom);
  const setSelectedBlockId = useSetAtom(selectedBlockIdAtom);

  const handleBlockClick = (blockId: string) => {
    setSelectedBlockId(blockId);
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
            'h-full w-full overflow-auto bg-white',
            deviceView === 'mobile' ? 'rounded-lg border' : '',
            'p-4'
          )}
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
                <div key={block.id}>
                  {renderBlock(block, handleBlockClick)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
