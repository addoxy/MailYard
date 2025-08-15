'use client';

import { Provider } from 'jotai';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <Provider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </Provider>
  );
};
