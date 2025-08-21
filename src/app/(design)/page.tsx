import { DesignPageContent } from './components/design-page-content';
import { EmailSection } from './components/email-section';
import { InspectorSidebar } from './components/inspector-sidebar';
import { ResourceSidebar } from './components/resource-sidebar';

interface DesignPageProps {
  params: Promise<{ id: string }>;
}

export default async function DesignPage({ params }: DesignPageProps) {
  const id = (await params).id;

  return (
    <DesignPageContent>
      <div className="flex gap-1.5">
        <ResourceSidebar />
        <EmailSection />
        <InspectorSidebar />
      </div>
    </DesignPageContent>
  );
}
