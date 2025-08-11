import { BlocksSidebar } from '@/components/blocks-sidebar';
import { EmailSection } from '@/components/email-section';
import { InspectorSidebar } from '@/components/inspector-sidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

interface DesignPageProps {
  params: Promise<{ id: string }>;
}

export default async function DesignPage({ params }: DesignPageProps) {
  const id = (await params).id;

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel minSize={12} maxSize={20} defaultSize={15}>
        <BlocksSidebar />
      </ResizablePanel>
      <ResizableHandle className="mr-2 bg-transparent" />
      <ResizablePanel>
        <EmailSection />
      </ResizablePanel>
      <ResizableHandle className="ml-2 bg-transparent" />
      <ResizablePanel minSize={12} maxSize={20} defaultSize={15}>
        <InspectorSidebar />
      </ResizablePanel>
      <ResizableHandle />
    </ResizablePanelGroup>
  );
}
