import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AtomicTooltipProps {
  asChild?: boolean;
  children: React.ReactNode | string;
  content: string;
}

export const AtomicTooltip = ({ children, content, asChild = false }: AtomicTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild={asChild} className="cursor-pointer">
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
