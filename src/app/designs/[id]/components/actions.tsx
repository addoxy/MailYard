'use client';

import { AtomicTooltip } from '@/components/atomic-tooltip';
import { Button } from '@/components/ui/button';
import { Redo, Undo } from 'lucide-react';

export const Actions = () => {
  return (
    <>
      <AtomicTooltip content="Undo" asChild>
        <Button variant="ghost" size="icon">
          <Undo />
        </Button>
      </AtomicTooltip>
      <AtomicTooltip content="Redo" asChild>
        <Button variant="ghost" size="icon">
          <Redo />
        </Button>
      </AtomicTooltip>
    </>
  );
};
