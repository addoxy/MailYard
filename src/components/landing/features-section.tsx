'use client';

import { DragDropIcon, PhoneLaptop } from '@/components/icons';
import { FeatureCard } from '@/components/landing/feature-card';
import { Code, LucideIcon, Palette } from 'lucide-react';
import { motion } from 'motion/react';

const features = [
  {
    title: "Drag & Drop Editor",
    description: "Build emails visually by dragging and dropping blocks. Rearrange text, images, buttons, and more with intuitive controls that make email design effortless.",
    icon: DragDropIcon as LucideIcon,
    type: "dnd" as const
  },
  {
    title: "Live Preview",
    description: "See exactly how your email will look in an inbox on desktop and mobile devices. Preview in real-time as you make changes to ensure perfect presentation every time.",
    icon: PhoneLaptop as LucideIcon,
    type: "preview" as const
  },
  {
    title: "Visual Styling",
    description: "Customize every aspect of your email with intuitive visual controls. Adjust colors, fonts, spacing, and layouts with real-time preview - no coding required.",
    icon: Palette,
    type: "styling" as const
  },
  {
    title: "React Export",
    description: "Export your finished emails as clean React components using @react-email. Perfect for developers who want production-ready code that integrates seamlessly.",
    icon: Code,
    type: "export" as const
  }
];

export function FeaturesSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="mb-4 text-3xl font-bold">Everything You Need</h2>
        <p className="text-muted-foreground text-xl">
          Powerful features to create professional emails
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut", 
              delay: index * 0.1 
            }}
          >
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              type={feature.type}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
