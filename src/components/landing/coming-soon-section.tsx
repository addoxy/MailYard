'use client';

import { Database, Home, Layers, LucideIcon, Undo2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ComingSoonCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ComingSoonCard = ({ title, description, icon }: ComingSoonCardProps) => {
  const Icon = icon;

  return (
    <div className="from-background/40 to-background/20 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-6 shadow-lg backdrop-blur-sm">
      <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
      <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />

      <div className="relative">
        <div className="mb-4 flex items-center space-x-3">
          <div className="bg-primary/20 border-primary/30 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg">
            <Icon className="text-primary h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
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
      title: 'Design Gallery',
      description:
        'A beautiful home page showcasing all your email designs with live previews, search functionality, and organization features for easy template management.',
      icon: Home,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="mb-4 text-3xl font-bold">Coming Soon</h2>
          <p className="text-muted-foreground text-xl">Exciting features in development</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {COMING_SOON_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: index * 0.1,
              }}
            >
              <ComingSoonCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
