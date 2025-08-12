import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { Actions } from './actions';
import { EmailEditor } from './email-editor';
import { ExportEmail } from './export-email';
import { PreviewEmail } from './preview-email';
import { ViewToggle } from './view-toggle';

export const EmailSection = () => {
  return (
    <div className="h-screen py-2">
      <div className="bg-sidebar border-border/40 h-full w-full rounded-lg border">
        <div className="border-border/40 flex h-16 items-center border-b px-4">
          <Actions />
          <Separator orientation="vertical" className="mr-6 ml-4 !h-6" />
          <ViewToggle />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Separator orientation="vertical" className="mr-6 ml-4 !h-6" />
            <PreviewEmail />
            <ExportEmail />
          </div>
        </div>
        <EmailEditor />
      </div>
    </div>
  );
};
