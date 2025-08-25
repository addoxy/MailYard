'use client';

import { Button } from '@/components/ui/button';
import { scrollToId } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative mt-28 sm:mt-40">
      <div className="mx-auto max-w-7xl text-center">
        <motion.h1
          className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          Build Beautiful Emails
          <br />
          Without The Hazzle
        </motion.h1>

        <motion.p
          className="text-muted-foreground mx-auto mb-8 max-w-3xl text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          Create stunning, responsive email templates with our intuitive drag-and-drop editor. No
          coding required - just beautiful emails that work everywhere.
        </motion.p>

        <motion.div
          className="mx-auto grid w-fit grid-cols-2 gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <Button size="lg" asChild className="group mb-12 w-fit">
            <Link href="/design">
              Get Started
              <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="mb-12 w-fit"
            onClick={() =>
              scrollToId({
                id: 'how-it-works',
                offset: -100,
              })
            }
          >
            How It Works
          </Button>
        </motion.div>

        <motion.div
          className="bg-muted mx-auto mt-20 max-w-5xl overflow-hidden rounded-lg border"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        >
          <div className="bg-muted flex aspect-video items-center justify-center">
            A video comes here
          </div>
        </motion.div>
      </div>
    </section>
  );
}
