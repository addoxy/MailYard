import { cn } from '@/lib/utils';
import { Label } from './ui/label';

interface LabelProps {
  text: string;
  className?: string;
}

export const SectionLabel = ({ text, className }: LabelProps) => {
  return <Label className={cn('text-xs', className)}>{text}</Label>;
};

export const FieldLabel = ({ text, className }: LabelProps) => {
  return <Label className={cn('text-muted-foreground text-xs', className)}>{text}</Label>;
};
