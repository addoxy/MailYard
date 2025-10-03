'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export const ThemeToggle = () => {
  const { resolvedTheme: theme, setTheme } = useTheme();

  if (!theme) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      size="icon"
      className="rounded-full"
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
    </Button>
  );
};
