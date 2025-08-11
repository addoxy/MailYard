import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

export const SearchBar = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-3.5" />
      <Input className={cn('pl-8', className)} type={type} {...props} />
    </div>
  );
};
