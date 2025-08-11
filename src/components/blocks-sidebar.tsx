'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, Home, LogOut } from 'lucide-react';
import { AtomicTooltip } from './atomic-tooltip';
import { Button } from './ui/button';

export const BlocksSidebar = () => {
  return (
    <aside className="h-screen py-2 pl-2">
      <div className="bg-accent/20 border-border/40 flex h-full flex-col rounded-lg border">
        <div className="border-border/40 flex h-16 items-center border-b px-4">
          <div className="flex items-center gap-2">
            <img
              src="https://raw.githubusercontent.com/addoxy/axii.sh/refs/heads/main/public/logo.png"
              className="size-6 rounded"
            />
            <AtomicTooltip content="Axii's Workspace">
              <span className="line-clamp-1 text-sm">Axii's Workspace</span>
            </AtomicTooltip>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="ml-auto">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
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
      </div>
    </aside>
  );
};
