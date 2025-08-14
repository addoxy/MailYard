import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { EmailSection } from './components/email-section';
import { InspectorSidebar } from './components/inspector-sidebar';
import { ResourceSidebar } from './components/resource-sidebar';

interface DesignPageProps {
  params: Promise<{ id: string }>;
}

export default async function DesignPage({ params }: DesignPageProps) {
  const id = (await params).id;

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel minSize={12} maxSize={20} defaultSize={15}>
        <ResourceSidebar />
      </ResizablePanel>
      <ResizableHandle className="hover:bg-border active:bg-border mx-[3px] my-2 w-0.5 rounded-full bg-transparent transition-colors duration-300" />
      <ResizablePanel minSize={12} maxSize={70} defaultSize={70}>
        <EmailSection />
      </ResizablePanel>
      <ResizableHandle className="hover:bg-border active:bg-border mx-[3px] my-2 w-0.5 rounded-full bg-transparent transition-colors duration-300" />
      <ResizablePanel minSize={12} maxSize={20} defaultSize={15}>
        <InspectorSidebar />
      </ResizablePanel>
      <ResizableHandle />
    </ResizablePanelGroup>
  );
}
