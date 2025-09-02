import { EmailEditor } from './email-editor';
import { ExportEmail } from './export-email';
import { PreviewEmail } from './preview-email';

export const EmailSection = () => {
  return (
    <div className="h-screen w-full py-2">
      <div className="bg-sidebar h-full w-full overflow-hidden rounded-lg border">
        <div className="flex h-16 items-center border-b px-4">
          <div className="ml-auto flex items-center gap-2">
            <PreviewEmail />
            <ExportEmail />
          </div>
        </div>
        <EmailEditor />
      </div>
    </div>
  );
};
