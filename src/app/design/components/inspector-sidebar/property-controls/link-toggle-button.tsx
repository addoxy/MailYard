'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Scan } from 'lucide-react';

type LinkMode = 'linked' | 'unlinked' | 'xy' | 'single';

interface LinkToggleButtonProps {
  mode: LinkMode;
  onToggle: () => void;
  active?: boolean;
  className?: string;
}

export const LinkToggleButton = ({ mode, onToggle, active, className }: LinkToggleButtonProps) => {
  const isActive = active || mode === 'linked' || mode === 'xy';

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        'hover:!bg-primary/20 size-5 rounded p-0',
        isActive && '!bg-primary hover:!bg-primary !text-background',
        className
      )}
      onClick={onToggle}
    >
      <Scan />
    </Button>
  );
};
