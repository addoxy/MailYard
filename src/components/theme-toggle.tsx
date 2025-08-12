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
    <div className="bg-accent flex items-center gap-1 rounded-full p-1">
      <Button
        onClick={() => setTheme('light')}
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="icon"
        className="size-7 rounded-full"
      >
        <Sun />
      </Button>
      <Button
        onClick={() => setTheme('dark')}
        variant={theme === 'dark' ? 'default' : 'ghost'}
        size="icon"
        className="size-7 rounded-full"
      >
        <Moon />
      </Button>
    </div>
  );
};
