'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { scrollToId } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BorderBeam } from '../ui/border-beam';
import { GridPattern } from '../ui/grid-pattern';

export function HeroSection() {
  return (
    <section className="relative mt-20 sm:mt-32">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-8 text-center sm:p-20">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          className="-z-10 m-auto h-64 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)] opacity-50"
        />
        <div className="absolute inset-0 bottom-full -mx-4 border-t" />
        <div className="absolute inset-0 top-full -mx-4 border-t" />
        <div className="absolute inset-0 right-full -my-4 border-l" />
        <div className="absolute inset-0 left-full -my-4 border-l" />
        <BorderBeam
          size={100}
          duration={16}
          colorFrom="var(--accent)"
          colorTo="var(--foreground)"
        />
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-6xl">
          Build Beautiful Emails
          <br />
          Without The Hassle
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-3xl sm:text-xl">
          Create eye-catching, responsive emails in minutes with our intuitive drag-and-drop editor.
          No coding required, just beautiful emails that look great on every device.
        </p>
        <div className="grid grid-cols-2 gap-1">
          <Link
            href="/design"
            className={buttonVariants({
              className: 'group w-fit',
              size: 'lg',
            })}
          >
            Get Started
            <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="w-fit"
            onClick={() =>
              scrollToId({
                id: 'how-it-works',
                offset: -100,
              })
            }
          >
            How It Works
          </Button>
        </div>
      </div>
      <div className="relative mt-12 overflow-hidden mask-b-from-55% sm:mt-20 md:mt-32">
        <div className="ring-background bg-background relative mx-auto max-w-6xl overflow-hidden rounded-xl border shadow-lg ring-1 inset-shadow-2xs shadow-zinc-950/15 dark:inset-shadow-white/20">
          <Image
            src={'/hero-dark.png'}
            height={1920}
            width={1080}
            alt="MailMoss Interface"
            className="border-border/50 mx-auto hidden w-full rounded-xl dark:block"
          />
          <Image
            src={'/hero-light.png'}
            height={1920}
            width={1080}
            alt="MailMoss Interface"
            className="border-border/50 mx-auto block w-full rounded-xl dark:hidden"
          />
        </div>
      </div>
    </section>
  );
}
