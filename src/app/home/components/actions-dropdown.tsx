import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react';
import type { Design } from '../hooks/use-design-data';

interface DesignActionsDropdownProps {
  design: Design;
  onEditTitle: (design: Design) => void;
  onDelete: (designId: string) => void;
  variant?: 'grid' | 'list';
}

export function DesignActionsDropdown({
  design,
  onEditTitle,
  onDelete,
  variant = 'grid',
}: DesignActionsDropdownProps) {
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const buttonClass = variant === 'grid' 
    ? "h-6 w-6 shrink-0 p-0 opacity-0 transition-opacity group-hover:opacity-100"
    : "h-8 w-8 p-0";

  const iconClass = variant === 'grid' ? "h-3 w-3" : "h-4 w-4";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={handleDropdownClick}>
        <Button variant="ghost" size="sm" className={buttonClass}>
          <MoreHorizontal className={iconClass} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onEditTitle(design);
          }}
        >
          <Edit className={`mr-2 ${iconClass}`} />
          Edit title
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(design.id);
          }}
        >
          <Trash2 className={`mr-2 ${iconClass}`} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}