'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Monitor, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { InboxPreview } from './inbox-preview';

export const PreviewModal = () => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Monitor className="h-4 w-4" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="flex h-[90vh] w-[95vw] !max-w-7xl flex-col">
        <DialogTitle className="flex items-center justify-between">Email Preview</DialogTitle>
        <div className="mt-2 mb-4 flex items-center gap-2">
          <Button
            variant={deviceView === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeviceView('desktop')}
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </Button>
          <Button
            variant={deviceView === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setDeviceView('mobile')}
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </Button>
        </div>
        <InboxPreview deviceView={deviceView} />
      </DialogContent>
    </Dialog>
  );
};
