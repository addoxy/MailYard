'use client';

import { Code, Eye, Monitor, Redo, Smartphone, Undo } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

type View = 'desktop' | 'mobile';

export const EmailSection = () => {
  const [activeView, setActiveView] = useState<View>('desktop');

  return (
    <div className="flex h-screen py-2">
      <div className="bg-accent/20 border-border/40 h-full w-full rounded-lg border">
        <div className="border-border/40 flex h-16 items-center border-b px-4">
          <Button variant="ghost" size="icon">
            <Undo />
          </Button>
          <Button variant="ghost" size="icon">
            <Redo />
          </Button>
          <Separator orientation="vertical" className="mr-6 ml-4 !h-6" />
          <div className="flex items-center gap-1 rounded-lg p-1.5">
            <Button
              onClick={() => setActiveView('desktop')}
              variant={activeView === 'desktop' ? 'default' : 'ghost'}
            >
              <Monitor /> Desktop
            </Button>
            <Button
              onClick={() => setActiveView('mobile')}
              variant={activeView === 'mobile' ? 'default' : 'ghost'}
            >
              <Smartphone /> Mobile
            </Button>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="secondary">
              <Eye />
              Preview
            </Button>
            <Button>
              <Code />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
