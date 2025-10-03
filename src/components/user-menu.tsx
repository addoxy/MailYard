'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, Ellipsis, Home, Laptop, Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { AtomicTooltip } from './atomic-tooltip';

export const UserMenu = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex w-full items-center gap-2">
      <div className="bg-foreground/10 flex size-6 items-center justify-center rounded">
        <span className="text-[10px]">MY</span>
      </div>
      <AtomicTooltip content="My Workspace">
        <span className="line-clamp-1 text-left text-sm">My Workspace</span>
      </AtomicTooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="ml-auto">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => router.push('/')}>
            <Home />
            Home
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunMoon className="text-muted-foreground mr-2 size-4 shrink-0" /> Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => setTheme('light')}>
                  <Sun /> Light
                  {theme === 'light' && <Check className="ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTheme('dark')}>
                  <Moon /> Dark
                  {theme === 'dark' && <Check className="ml-auto" />}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setTheme('system')}>
                  <Laptop /> System
                  {theme === 'system' && <Check className="ml-auto" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
