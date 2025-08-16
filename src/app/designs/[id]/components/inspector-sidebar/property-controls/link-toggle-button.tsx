'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Scan } from 'lucide-react';

type LinkMode = 'linked' | 'unlinked' | 'xy' | 'single';

interface LinkToggleButtonProps {
  mode: LinkMode;
  onToggle: () => void;
  className?: string;
}

export const LinkToggleButton = ({ mode, onToggle, className }: LinkToggleButtonProps) => {
  const isActive = mode === 'linked' || mode === 'xy';

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('size-5 rounded p-0', isActive && '!bg-blue-500 !text-white', className)}
      onClick={onToggle}
    >
      <Scan />
    </Button>
  );
};
