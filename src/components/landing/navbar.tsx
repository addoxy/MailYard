'use client';

import { PlaceholderLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import Link from 'next/link';

export function Navbar() {
  return (
    <motion.nav
      className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <PlaceholderLogo className="text-background size-6" />
              <span>MailYard</span>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <Button asChild>
              <Link href="/design">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
