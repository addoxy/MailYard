'use client';

import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { viewModeAtom, viewModeHydratedAtom } from '../atoms';

export function useHydratedViewMode() {
  const [viewMode, setViewMode] = useAtom(viewModeAtom);
  const [isHydrated, setIsHydrated] = useAtom(viewModeHydratedAtom);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Small delay to ensure localStorage has been read
    const timer = setTimeout(() => {
      setIsHydrated(true);
    }, 10);

    return () => clearTimeout(timer);
  }, [setIsHydrated]);

  return {
    viewMode,
    setViewMode,
    isHydrated: mounted && isHydrated,
  };
}