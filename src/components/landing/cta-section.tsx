'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="mx-auto max-w-5xl">
      <div className="from-background/40 to-background/20 border-border relative overflow-hidden rounded-2xl border bg-gradient-to-br shadow-sm backdrop-blur-sm">
        <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
        <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />

        <div className="relative flex flex-col items-center justify-center px-8 py-20 text-center sm:py-24">
          <div className="border-primary/20 bg-primary/5 text-primary inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Start Creating Today
          </div>
          <h2 className="text-foreground mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
            Ready to Build Amazing Emails?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl sm:text-lg">
            Join designers and developers who are creating stunning, responsive emails with our
            intuitive drag-and-drop builder.
          </p>
          <div className="mt-8">
            <Link
              href="/design"
              className={buttonVariants({
                size: 'lg',
                className: 'group',
              })}
            >
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
