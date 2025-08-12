'use client';

import { Button } from '@/components/ui/button';
import { Redo, Undo } from 'lucide-react';

export const Actions = () => {
  return (
    <>
      <Button variant="ghost" size="icon">
        <Undo />
      </Button>
      <Button variant="ghost" size="icon">
        <Redo />
      </Button>
    </>
  );
};
