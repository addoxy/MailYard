'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAtom } from 'jotai';
import { Paintbrush, Sparkles } from 'lucide-react';
import { inspectorViewAtom } from '../atoms';

const StyleView = () => {
  return (
    <div className="p-4">
      <span className="text-muted-foreground font-mono text-xs tracking-wider">PAGE</span>
      <div className="bg-accent mt-2 flex items-center rounded-sm border px-2 text-xs">
        <div className="mr-1.5 size-3 shrink-0 rounded-xs bg-black" />
        <input className="w-full py-1 pr-2 ring-0 outline-none" />
        <div className="ml-auto flex shrink-0 items-center">
          <Separator orientation="vertical" className="mr-2 !h-6" />
          <input className="w-7 py-1 pr-1 ring-0 outline-none" />%
        </div>
      </div>
    </div>
  );
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
        <StyleView />
      </div>
    </aside>
  );
};
