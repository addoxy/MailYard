import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import type { Design } from '../hooks/use-design-data';
import { DesignActionsDropdown } from './actions-dropdown';

interface DesignCardProps {
  design: Design;
  onDesignClick: (designId: string) => void;
  onEditTitle: (design: Design) => void;
  onDelete: (designId: string) => void;
}

export function DesignCard({ design, onDesignClick, onEditTitle, onDelete }: DesignCardProps) {
  return (
    <Card
      className="group hover:border-input cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg"
      onClick={() => onDesignClick(design.id)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
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
            <div className="flex h-full items-center justify-center text-2xl font-bold text-blue-400">
              {design.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-1.5 p-3">
        <div className="flex w-full items-start justify-between">
          <h3 className="group-hover:text-primary line-clamp-2 text-sm font-medium transition-colors">
            {design.name}
          </h3>
          <DesignActionsDropdown
            design={design}
            onEditTitle={onEditTitle}
            onDelete={onDelete}
            variant="grid"
          />
        </div>
        <div className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
          <Calendar className="h-3 w-3" />
          <span>{design.lastModified}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
