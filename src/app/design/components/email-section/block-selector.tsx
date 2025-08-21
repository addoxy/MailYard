'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BlockSelectorProps {
  children: ReactNode;
  onClick: (multiSelect?: boolean) => void;
  blockId: string;
  isSelected?: boolean;
}

export function BlockSelector({ children, onClick, blockId, isSelected }: BlockSelectorProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const multiSelect = e.ctrlKey || e.metaKey;
    onClick(multiSelect);
  };

  return (
    <div
      className={cn(
        'relative cursor-pointer transition-all duration-200 hover:outline-2 hover:outline-blue-400/50',
        isSelected && 'outline-2 !outline-blue-500'
      )}
      onClick={handleClick}
      data-block-id={blockId}
    >
      {children}
    </div>
  );
}
