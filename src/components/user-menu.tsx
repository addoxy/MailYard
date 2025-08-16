'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, Home, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AtomicTooltip } from './atomic-tooltip';

export const UserMenu = () => {
  const router = useRouter();

  return (
    <div className="flex w-full items-center gap-2">
      <img
        src="https://raw.githubusercontent.com/addoxy/axii.sh/refs/heads/main/public/logo.png"
        className="size-6 rounded"
        alt="Axii's Workspace Logo"
      />
      <AtomicTooltip content="Axii's Workspace">
        <span className="line-clamp-1 text-left text-sm">Axii&apos;s Workspace</span>
      </AtomicTooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="ml-auto">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => router.push('/home')}>
            <Home />
            Home
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <LogOut />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
