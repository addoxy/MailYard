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
      <ResizableHandle className="mx-[3px] my-2 w-0.5 rounded-full bg-transparent transition-colors duration-300 hover:bg-zinc-800 active:bg-zinc-800" />
      <ResizablePanel>
        <EmailSection />
      </ResizablePanel>
      <ResizableHandle className="mx-[3px] my-2 w-0.5 rounded-full bg-transparent transition-colors duration-300 hover:bg-zinc-800 active:bg-zinc-800" />
      <ResizablePanel minSize={12} maxSize={20} defaultSize={15}>
        <InspectorSidebar />
      </ResizablePanel>
      <ResizableHandle />
    </ResizablePanelGroup>
  );
}
