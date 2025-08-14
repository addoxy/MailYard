import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AtomicTooltipProps {
  asChild?: boolean;
  children: React.ReactNode | string;
  content: string;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  className?: string;
  delayDuration?: number;
  skipDelayDuration?: number;
}

export const AtomicTooltip = ({
  children,
  content,
  asChild = false,
  align = 'center',
  side = 'top',
  sideOffset = 4,
  className,
  delayDuration = 100,
  skipDelayDuration = 0,
}: AtomicTooltipProps) => {
  return (
    <TooltipProvider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      <Tooltip>
        <TooltipTrigger asChild={asChild} className="cursor-pointer">
          {children}
        </TooltipTrigger>
        <TooltipContent align={align} side={side} sideOffset={sideOffset} className={className}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
