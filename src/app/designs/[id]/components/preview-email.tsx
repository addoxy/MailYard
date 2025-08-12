'use client';

import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

export const PreviewEmail = () => {
  return (
    <Button variant="secondary">
      <Eye />
      Preview
    </Button>
  );
};
