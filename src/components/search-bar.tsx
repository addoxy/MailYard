import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

export const SearchBar = ({ className, type, ...props }: React.ComponentProps<'input'>) => {
  return (
    <div className="relative">
      <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
      <Input className={cn('pr-4 pl-9', className)} type={type} {...props} />
    </div>
  );
};
