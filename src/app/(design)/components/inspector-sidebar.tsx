'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { BlockEditor } from './inspector-sidebar/block-editor';

export const InspectorSidebar = () => {
  return (
    <aside className="h-screen w-full max-w-72 shrink-0 py-2 pr-2 xl:max-w-80">
      <div className="bg-sidebar border-border/40 flex h-full flex-col rounded-lg border">
        <ScrollArea className="flex-1 overflow-y-auto">
          <BlockEditor />
        </ScrollArea>
      </div>
    </aside>
  );
};
