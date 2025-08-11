'use client';

import { Paintbrush, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

type View = 'style' | 'ai';

export const InspectorSidebar = () => {
  const [activeView, setActiveView] = useState<View>('style');

  return (
    <aside className="h-screen py-2 pr-2">
      <div className="bg-accent/20 border-border/40 flex h-full flex-col rounded-lg border">
        <div className="border-border/40 flex h-16 items-center border-b px-4">
          <div className="grid w-full grid-cols-2 items-center gap-1 rounded-lg p-1.5">
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
      </div>
    </aside>
  );
};
