import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Suspense } from 'react';
import { DesignGallery } from './components/design-gallery';
import { SearchFilterBar } from './components/search-filter-bar';
import { SidebarNavigation } from './components/sidebar-navigation';

export default function HomePage() {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel minSize={12} maxSize={25} defaultSize={16} className="hidden lg:block">
        <Suspense>
          <SidebarNavigation />
        </Suspense>
      </ResizablePanel>
      <ResizableHandle className="hover:bg-border active:bg-border mx-[3px] my-2 hidden w-0.5 rounded-full bg-transparent transition-colors duration-300 lg:block" />
      <ResizablePanel minSize={12} defaultSize={84} className="flex-1 overflow-hidden">
        <div className="h-screen py-2 pr-2 pl-2 lg:pl-0">
          <div className="bg-sidebar border-border/40 flex h-full flex-col rounded-lg border">
            <div className="border-border/40 border-b p-4">
              <SearchFilterBar />
            </div>
            <div className="flex-1 overflow-auto">
              <DesignGallery />
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
