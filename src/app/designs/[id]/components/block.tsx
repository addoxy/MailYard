import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface BlockProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  content: string;
  className?: string;
}

export const Block = ({ icon, content, className }: BlockProps) => {
  const Icon = icon;

  return (
    <div
      className={cn(
        'hover:bg-secondary/50 flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 py-2 transition-all duration-300',
        className
      )}
    >
      <Icon className="text-muted-foreground size-3" />
      <span className="text-sm font-medium">{content}</span>
    </div>
  );
};
