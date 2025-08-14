'use client';

import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { Paintbrush, Sparkles } from 'lucide-react';
import { inspectorViewAtom } from '../atoms';
import { BlockEditor } from './inspector-sidebar/block-editor';

const StyleView = () => {
  return <BlockEditor />;
};

const AIAssistView = () => {
  return <div className="text-muted-foreground mt-10 p-4 text-center">Coming soon</div>;
};

export const InspectorSidebar = () => {
  const [activeView, setActiveView] = useAtom(inspectorViewAtom);

  return (
    <aside className="h-screen py-2 pr-2">
      <div className="bg-sidebar border-border/40 flex h-full flex-col rounded-lg border">
        <div className="border-border/40 flex h-16 items-center border-b px-4">
          <div className="grid w-full grid-cols-2 items-center gap-1.5 rounded-lg">
            <Button
              onClick={() => setActiveView('style')}
              variant={activeView === 'style' ? 'default' : 'ghost'}
            >
              <Paintbrush /> Style
            </Button>
            <Button
              onClick={() => setActiveView('ai')}
              variant={activeView === 'ai' ? 'default' : 'ghost'}
            >
              <Sparkles /> AI Assist
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeView === 'style' && <StyleView />}
          {activeView === 'ai' && <AIAssistView />}
        </div>
      </div>
    </aside>
  );
};
