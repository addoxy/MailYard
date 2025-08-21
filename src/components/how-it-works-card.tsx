import { cn } from '@/lib/utils';

interface HowItWorksCardProps {
  step: number;
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export const HowItWorksCard = ({
  step,
  title,
  description,
  children,
  className,
}: HowItWorksCardProps) => {
  return (
    <div className={cn('relative h-full', className)}>
      <div className="from-background/40 to-background/20 relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-lg backdrop-blur-sm">
        <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
        <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />

        <div className="relative flex h-full flex-col">
          <div className="bg-primary/20 border-primary/30 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-lg">
            <span className="text-primary text-2xl font-bold">{step}</span>
          </div>

          {/* Visual mockup */}
          <div className="mb-6">{children}</div>

          <div className="mt-auto">
            <h3 className="mb-3 text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
