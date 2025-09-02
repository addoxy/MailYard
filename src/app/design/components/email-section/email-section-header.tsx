import { ExportEmail } from '../export-email';
import { PreviewEmail } from '../preview-email';
import { SendEmailDialog } from './send-email-dialog';

export const EmailSectionHeader = () => {
  return (
    <div className="flex h-16 items-center justify-between border-b px-4">
      <PreviewEmail />
      <div className="flex items-center gap-2">
        <ExportEmail />
        <SendEmailDialog />
      </div>
    </div>
  );
};
