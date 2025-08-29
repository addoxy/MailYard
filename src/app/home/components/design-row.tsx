import type { Design } from '../hooks/use-design-data';
import { DesignActionsDropdown } from './actions-dropdown';

interface DesignRowProps {
  design: Design;
  onDesignClick: (designId: string) => void;
  onEditTitle: (design: Design) => void;
  onDelete: (designId: string) => void;
}

export function DesignRow({ design, onDesignClick, onEditTitle, onDelete }: DesignRowProps) {
  return (
    <div
      className="group hover:bg-muted/50 -mx-2 grid cursor-pointer grid-cols-12 gap-4 rounded-md p-2 transition-colors duration-200"
      onClick={() => onDesignClick(design.id)}
    >
      <div className="col-span-5 flex items-center gap-3">
        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-gradient-to-br from-blue-950 to-indigo-900">
          {design.thumbnail ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={design.thumbnail}
                alt={design.name}
                className="h-full w-full object-cover"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-bold text-blue-400">
              {design.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h3 className="group-hover:text-primary line-clamp-1 text-sm font-medium transition-colors">
          {design.name}
        </h3>
      </div>
      <div className="text-muted-foreground col-span-3 flex items-center text-sm">
        {design.lastModified}
      </div>
      <div className="text-muted-foreground col-span-3 flex items-center text-sm">
        {design.dateCreated}
      </div>
      <div className="col-span-1 flex items-center justify-start">
        <DesignActionsDropdown
          design={design}
          onEditTitle={onEditTitle}
          onDelete={onDelete}
          variant="list"
        />
      </div>
    </div>
  );
}
