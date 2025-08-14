'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BlockSelectorProps {
  children: ReactNode;
  isSelected: boolean;
  onClick: () => void;
  blockId: string;
}

export function BlockSelector({ children, isSelected, onClick, blockId }: BlockSelectorProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div
      className={cn(
        'relative transition-all duration-200 ease-in-out',
        'hover:ring-2 hover:ring-blue-400/50 hover:ring-offset-2',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2',
        'cursor-pointer rounded-sm'
      )}
      onClick={handleClick}
      data-block-id={blockId}
    >
      {children}

      {/* Selection indicator overlay */}
      {isSelected && (
        <div className="absolute -top-6 left-0 z-10">
          <div className="rounded-md bg-blue-500 px-2 py-1 text-xs text-white shadow-lg">
            Selected
          </div>
        </div>
      )}
    </div>
  );
}
