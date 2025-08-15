'use client';

import { Button } from '@/components/ui/button';
import { Code } from 'lucide-react';
import { useState } from 'react';
import { ExportModal } from './email-section/export-modal';

export const ExportEmail = () => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsExportModalOpen(true)}>
        <Code />
        Export
      </Button>
      <ExportModal
        open={isExportModalOpen}
        onOpenChange={setIsExportModalOpen}
      />
    </>
  );
};
