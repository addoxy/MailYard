import { cn } from '@/lib/utils';
import { SectionDescription, SectionHeading } from './section-typography';

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
    <div className={cn('relative mx-auto h-full max-w-[560px]', className)}>
      <div className="from-background/40 to-background/20 border-border relative h-full overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-lg backdrop-blur-sm">
        <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
        <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />

        <div className="relative flex h-full flex-col">
          <div className="bg-primary/20 border-primary/30 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 shadow-lg">
            <span className="text-primary text-2xl font-bold">{step}</span>
          </div>

          {/* Visual mockup */}
          <div className="mb-6">{children}</div>

          <div className="mt-auto">
            <h3 className="mb-1.5 text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <SectionHeading text="How It Works" />
          <SectionDescription text="Get from idea to email in three simple steps" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Step 1 */}
          <div>
            <HowItWorksCard
              step={1}
              title="Choose Your Blocks"
              description="Start with text, images, buttons, and other email elements from our library."
            >
              <div className="space-y-2">
                <div className="bg-primary/10 border-primary/20 flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm">
                  <div className="bg-primary size-2 rounded-full"></div>
                  <span className="text-sm">Heading Block</span>
                </div>
                <div className="bg-muted/50 border-border flex items-center gap-2 rounded-lg border px-3 py-2 shadow-sm">
                  <div className="dark:bg-muted bg-muted-foreground size-2 rounded-full"></div>
                  <span className="text-muted-foreground text-sm">Text Block</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 shadow-sm dark:border-blue-800 dark:bg-blue-950/50">
                  <div className="size-2 rounded-full bg-blue-600 dark:bg-blue-500"></div>
                  <span className="text-sm text-blue-700 dark:text-blue-400">
                    Button Block
                  </span>
                </div>
              </div>
            </HowItWorksCard>
          </div>

          {/* Step 2 */}
          <div>
            <HowItWorksCard
              step={2}
              title="Drag & Customize"
              description="Arrange your blocks and customize colors, fonts, spacing, and more with our visual editor."
            >
              <div className="space-y-3">
                <div className="bg-primary/10 border-primary/20 flex items-center justify-between rounded-lg border px-3 py-2 shadow-sm">
                  <span className="text-sm">Welcome Newsletter!</span>
                  <div className="flex gap-1">
                    <div className="size-3 rounded-full bg-blue-500"></div>
                    <div className="size-3 rounded-full bg-green-500"></div>
                    <div className="size-3 rounded-full bg-red-500"></div>
                  </div>
                </div>

                {/* Text Size Control */}
                <div className="bg-primary/10 border-primary/20 flex items-center justify-between rounded-lg border px-3 py-2 shadow-sm">
                  <div className="text-sm">Text Size</div>
                  <div className="flex items-center gap-2">
                    <div className="bg-primary h-1 w-6 rounded-full"></div>
                    <div className="bg-muted h-1 w-4 rounded-full"></div>
                    <span className="text-muted-foreground text-xs">18px</span>
                  </div>
                </div>

                {/* Text Font Control */}
                <div className="bg-primary/10 border-primary/20 flex items-center justify-between rounded-lg border px-3 py-2 shadow-sm">
                  <div className="text-sm">Font Family</div>
                  <div className="text-xs">Arial, sans-serif</div>
                </div>
              </div>
            </HowItWorksCard>
          </div>

          {/* Step 3 */}
          <div>
            <HowItWorksCard
              step={3}
              title="Export & Send"
              description="Export your email as React code to use in your projects, or send it directly through our platform."
            >
              <div className="space-y-2">
                <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-2 pb-4 shadow-sm dark:border-green-800 dark:bg-green-950/50">
                  <span className="mb-1 text-xs font-medium text-green-700 dark:text-green-300">
                    React Export
                  </span>
                  <div className="font-mono text-xs text-green-600 dark:text-green-400">
                    <span>&lt;Html&gt;</span>
                    <br />
                    <span className="ml-4">&lt;Body&gt;...</span>
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-lg border border-blue-300 bg-blue-50 px-3 py-2 shadow-sm dark:border-blue-800 dark:bg-blue-950/50">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                    Ready to use in your project!
                  </span>
                </div>
              </div>
            </HowItWorksCard>
          </div>
        </div>
      </div>
    </section>
  );
}
