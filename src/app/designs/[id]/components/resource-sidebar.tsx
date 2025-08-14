'use client';

import { AtomicTooltip } from '@/components/atomic-tooltip';
import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserMenu } from '@/components/user-menu';
import { Plus } from 'lucide-react';
import { BlockLibrary } from './resource-sidebar/block-library';


const AssetsSection = () => {
  return (
    <div className="flex h-[calc(100vh-100px)] flex-col overflow-auto px-4">
      <div className="mt-6 mb-4 flex items-center justify-between gap-2">
        <span className="text-muted-foreground font-mono text-xs tracking-wider">ASSETS</span>
        <AtomicTooltip content="Add an asset" asChild>
          <Button size="icon" className="size-5 rounded-sm" variant="secondary">
            <Plus />
          </Button>
        </AtomicTooltip>
      </div>
      <SearchBar placeholder="Search for assets..." />
      <div className="mt-3 flex flex-col gap-1.5">
        <p className="text-muted-foreground mt-10 text-center text-sm">No assets uploaded.</p>
      </div>
    </div>
  );
};

export const ResourceSidebar = () => {
  return (
    <aside className="h-screen py-2 pl-2">
      <div className="bg-sidebar border-border/40 flex h-full flex-col rounded-lg border">
        <div className="border-border/40 flex h-16 shrink-0 items-center border-b px-4">
          <UserMenu />
        </div>
        <BlockLibrary />
        <Separator orientation="horizontal" className="bg-border/40" />
        <AssetsSection />
      </div>
    </aside>
  );
};
