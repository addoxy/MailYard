'use client';

import Silk from '@/components/react-bits/silk';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="bg-muted dark relative mx-auto h-[400px] max-w-5xl overflow-hidden rounded-2xl border">
      <Silk speed={5} scale={1} color="#49494A" noiseIntensity={1.5} rotation={0} />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-foreground text-2xl font-bold">Ready to get started?</h2>
        <p className="text-foreground mt-2">
          Create your first email template today and see how easy it is to build beautiful emails.
        </p>
        <Link
          href="/design"
          className={buttonVariants({
            className: 'group mt-6',
            size: 'lg',
          })}
        >
          Get Started
          <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
