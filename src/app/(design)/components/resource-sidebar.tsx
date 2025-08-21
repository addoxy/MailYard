'use client';

import { Separator } from '@/components/ui/separator';
import { UserMenu } from '@/components/user-menu';
import { BlockLibrary } from './resource-sidebar/block-library';
import { BlockList } from './resource-sidebar/block-list';

export const ResourceSidebar = () => {
  return (
    <aside className="h-screen w-full max-w-72 shrink-0 py-2 pl-2 xl:max-w-80">
      <div className="bg-sidebar border-border/40 flex h-full flex-col overflow-hidden rounded-lg border">
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
