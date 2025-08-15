'use client';

import { UserMenu } from '@/components/user-menu';
import { Separator } from '@/components/ui/separator';
import { BlockLibrary } from './resource-sidebar/block-library';
import { BlockList } from './resource-sidebar/block-list';

export const ResourceSidebar = () => {
  return (
    <aside className="h-screen py-2 pl-2">
      <div className="bg-sidebar border-border/40 flex h-full flex-col rounded-lg border">
        <div className="border-border/40 flex h-16 shrink-0 items-center border-b px-4">
          <UserMenu />
        </div>
        <BlockLibrary />
        <Separator orientation="horizontal" className="bg-border/40" />
        <BlockList />
      </div>
    </aside>
  );
};
