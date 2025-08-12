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
          'shadow-md transition-all duration-500',
          deviceView === 'desktop' ? 'h-full w-full' : 'bg-accent h-4/6 w-88 rounded-xl border p-2'
        )}
      >
        <div
          className={cn(
            'h-full w-full overflow-auto bg-white',
            deviceView === 'mobile' ? 'rounded-lg border' : ''
          )}
        ></div>
      </div>
    </div>
  );
};
