'use client';

import { AtomicTooltip } from '@/components/atomic-tooltip';
import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import {
  ALargeSmall,
  Box,
  Ellipsis,
  Heading,
  Home,
  LogOut,
  MousePointerClick,
  Table,
} from 'lucide-react';
import { Block } from './block';

export const BlocksSidebar = () => {
  return (
    <aside className="h-screen py-2 pl-2">
      <div className="bg-sidebar border-border/40 flex h-full flex-col rounded-lg border">
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
        <div className="mt-6 flex flex-col px-4">
          <span className="text-muted-foreground mb-4 font-mono text-xs tracking-wider">
            BLOCKS
          </span>
          <SearchBar placeholder="Search for blocks..." />
          <div className="mt-3 flex flex-col gap-1.5">
            <Block icon={Heading} content="Heading" />
            <Block icon={ALargeSmall} content="Text" />
            <Block icon={MousePointerClick} content="Button" />
            <Block icon={Box} content="Container" />
            <Block icon={Table} content="Table" />
          </div>
        </div>
        <Separator orientation="horizontal" className="bg-border/40 mt-10" />
        <div className="mt-6 flex flex-col px-4">
          <span className="text-muted-foreground mb-4 font-mono text-xs tracking-wider">
            ASSETS
          </span>
          <SearchBar placeholder="Search for assets..." />
          <div className="mt-3 flex flex-col gap-1.5">
            <Block icon={Heading} content="Heading" />
            <Block icon={ALargeSmall} content="Text" />
            <Block icon={MousePointerClick} content="Button" />
            <Block icon={Box} content="Container" />
            <Block icon={Table} content="Table" />
          </div>
        </div>
      </div>
    </aside>
  );
};
