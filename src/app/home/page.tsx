'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarNavigation } from './components/sidebar-navigation';
import { SearchFilterBar } from './components/search-filter-bar';
import { DesignGallery } from './components/design-gallery';

export default function HomePage() {
  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      {/* Left Sidebar - Hidden on mobile, shown on desktop */}
      <ResizablePanel minSize={12} maxSize={25} defaultSize={16} className="hidden lg:block">
        <SidebarNavigation />
      </ResizablePanel>
      
      <ResizableHandle className="hidden lg:block hover:bg-border active:bg-border mx-[3px] my-2 w-0.5 rounded-full bg-transparent transition-colors duration-300" />
      
      {/* Main Content Area */}
      <ResizablePanel>
        <div className="h-screen py-2 pr-2 lg:pl-0 pl-2">
          <div className="bg-sidebar border-border/40 flex h-full flex-col rounded-lg border">
            {/* Search and Filter Bar */}
            <div className="border-border/40 border-b p-4">
              <SearchFilterBar />
            </div>

            {/* Design Gallery */}
            <div className="flex-1 overflow-auto p-4">
              <DesignGallery />
            </div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}