import { cn } from '@/lib/utils';

interface TypographyProps {
  text: string;
  className?: string;
}

export const SectionHeading = ({ text, className }: TypographyProps) => {
  return <h2 className={cn('mb-4 text-4xl font-bold', className)}>{text}</h2>;
};

export const SectionDescription = ({ text, className }: TypographyProps) => {
  return <p className={cn('text-muted-foreground text-xl', className)}>{text}</p>;
};
