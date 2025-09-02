import { EmailEditor } from './email-editor';
import { EmailSectionHeader } from './email-section/email-section-header';

export const EmailSection = () => {
  return (
    <div className="h-screen w-full py-2">
      <div className="bg-sidebar h-full w-full overflow-hidden rounded-lg border">
        <EmailSectionHeader />
        <EmailEditor />
      </div>
    </div>
  );
};
