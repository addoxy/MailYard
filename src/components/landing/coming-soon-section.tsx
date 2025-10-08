import { Database, Layers, LucideIcon, Sparkles, Undo2 } from 'lucide-react';
import { SectionDescription, SectionHeading } from './section-typography';

interface ComingSoonCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ComingSoonCard = ({ title, description, icon }: ComingSoonCardProps) => {
  const Icon = icon;

  return (
    <div className="from-background/40 to-background/20 border-border relative mx-auto h-full overflow-hidden rounded-2xl border bg-gradient-to-br p-6 shadow-sm backdrop-blur-sm max-md:max-w-[560px]">
      <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
      <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div className="mb-1 flex items-center space-x-3">
        <div className="bg-primary/20 border-primary/30 flex size-10 items-center justify-center rounded-full border-2">
          <Icon className="text-primary size-5" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground pr-4 pl-[3.3rem] text-sm text-pretty">{description}</p>
    </div>
  );
};

export function ComingSoonSection() {
  const COMING_SOON_FEATURES = [
    {
      title: 'Advanced Layout',
      description:
        'Create complex layouts with Section Blocks to group multiple elements and Grid Blocks for multi-column designs. Perfect for newsletters and marketing emails.',
      icon: Layers,
    },
    {
      title: 'Undo / Redo System',
      description:
        'Never lose your work with comprehensive undo/redo functionality. Experiment freely knowing you can always go back to any previous state.',
      icon: Undo2,
    },
    {
      title: 'Database & Authentication',
      description:
        'Save your work to the cloud with user accounts. Sync your templates across devices and collaborate with team members on email projects.',
      icon: Database,
    },
    {
      title: 'AI-Powered Email Creation',
      description:
        'Generate professional email templates instantly with AI. Describe your vision and watch as AI creates stunning layouts, copy, and designs tailored to your needs.',
      icon: Sparkles,
    },
  ];

  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <SectionHeading text="Coming Soon" />
          <SectionDescription text="Exciting features in development" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {COMING_SOON_FEATURES.map((feature, index) => (
            <div key={feature.title}>
              <ComingSoonCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
