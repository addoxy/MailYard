'use client';

import { PlaceholderLogo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import Link from 'next/link';
import { GithubIcon, TwitterIcon } from '../icons';
import { buttonVariants } from '../ui/button';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <Link href="/" className="flex items-center space-x-3">
            <PlaceholderLogo className="text-background size-6" />
            <span>MailYard</span>
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          <Link
            href="https://github.com/addoxy/email-builder"
            className={cn(
              buttonVariants({
                size: 'icon',
                variant: 'ghost',
              })
            )}
          >
            <GithubIcon className="size-5" />
          </Link>
          <Link
            href="https://x.com/axiidotsh"
            className={cn(
              buttonVariants({
                size: 'icon',
                variant: 'ghost',
              })
            )}
          >
            <TwitterIcon />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-6 border-t pt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
      >
        <p className="text-muted-foreground text-sm">© {year} MailYard. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
}
