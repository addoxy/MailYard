import { PlaceholderLogo } from './logo';

export const BlocksSidebar = () => {
  return (
    <aside className="flex h-screen flex-col py-2 pl-2">
      <div className="flex h-16 w-full shrink-0 items-center gap-2 rounded-xl border bg-[#F9FAFB] px-6">
        <PlaceholderLogo className="text-primary size-5" />
        <span className="text-sm font-medium">My Workspace</span>
      </div>
      <div className="mt-2 h-full w-full rounded-xl border bg-[#F9FAFB]"></div>
    </aside>
  );
};
