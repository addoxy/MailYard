'use client';

import Silk from '@/components/react-bits/silk';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export function CTASection() {
  return (
    <motion.section
      className="bg-muted relative mx-auto h-[400px] max-w-5xl overflow-hidden rounded-2xl border"
      initial={{ opacity: 0, scale: 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Silk speed={5} scale={1} color="#49494A" noiseIntensity={1.5} rotation={0} />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <motion.h2
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        >
          Ready to get started?
        </motion.h2>
        <motion.p
          className="text-foreground mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          Create your first email template today and see how easy it is to build beautiful emails.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        >
          <Button asChild className="mt-6" size="lg">
            <Link href="/design" className="group">
              Get Started
              <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
