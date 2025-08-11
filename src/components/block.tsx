import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface BlockProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  content: string;
}

export const Block = ({ icon, content }: BlockProps) => {
  const Icon = icon;

  return (
    <div className="hover:bg-secondary flex cursor-pointer items-center gap-2 rounded-md border border-dashed px-3 py-2 transition-all duration-300 hover:border-solid">
      <Icon className="text-muted-foreground size-3" />
      <span className="text-sm font-medium">{content}</span>
    </div>
  );
};
