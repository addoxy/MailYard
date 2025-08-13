'use client';

import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { viewModeAtom, viewModeHydratedAtom } from '../atoms';

export function useViewMode() {
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [isHydrated, setIsHydrated] = useAtom(viewModeHydratedAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsHydrated(true);
  }, [setIsHydrated]);

  return {
    viewMode,
    setViewMode,
    isLoading: mounted && isHydrated,
  };
}
