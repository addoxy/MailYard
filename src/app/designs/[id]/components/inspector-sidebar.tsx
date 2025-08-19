'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useAtom } from 'jotai';
import { inspectorViewAtom } from '../atoms';
import { AIAssistView } from './inspector-sidebar/ai-assist';
import { BlockEditor } from './inspector-sidebar/block-editor';

export const InspectorSidebar = () => {
  const [activeView, setActiveView] = useAtom(inspectorViewAtom);

  return (
    <aside className="h-screen py-2 pr-2">
      <div className="bg-sidebar border-border/40 flex h-full flex-col rounded-lg border">
        <ScrollArea className="flex-1 overflow-y-auto">
          {activeView === 'style' && <BlockEditor />}
          {activeView === 'ai' && <AIAssistView />}
        </ScrollArea>
      </div>
    </aside>
  );
};
