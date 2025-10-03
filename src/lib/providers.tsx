'use client';

import { Toaster } from '@/components/ui/sonner';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <JotaiProvider>
        {children}
        <Toaster />
      </JotaiProvider>
    </NextThemesProvider>
  );
};
