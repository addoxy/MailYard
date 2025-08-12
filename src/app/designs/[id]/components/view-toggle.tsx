'use client';

import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { Monitor, Smartphone } from 'lucide-react';
import { deviceViewAtom } from '../atoms';

export const ViewToggle = () => {
  const [activeView, setActiveView] = useAtom(deviceViewAtom);

  return (
    <div className="flex items-center gap-1.5 rounded-lg">
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
  );
};
