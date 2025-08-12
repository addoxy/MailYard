'use client';

import { cn } from '@/lib/utils';
import { useAtomValue } from 'jotai';
import { deviceViewAtom } from '../atoms';

export const EmailEditor = () => {
  const deviceView = useAtomValue(deviceViewAtom);

  return (
    <div className="flex h-full w-full items-center justify-center pb-16">
      <div
        className={cn(
          'bg-accent h-full w-full rounded-xl border p-2 shadow-md transition-all duration-500',
          deviceView === 'desktop' ? 'h-5/6 w-5/6' : 'h-4/6 w-88'
        )}
      >
        <div className="h-full w-full rounded-lg border bg-white"></div>
      </div>
    </div>
  );
};
