import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { GithubIcon, TwitterIcon } from '../icons';
import { buttonVariants } from '../ui/button';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-12">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/logo-dark.png"
              alt=""
              width={24}
              height={24}
              className="hidden rounded-md dark:block"
            />
            <Image
              src="/logo-light.png"
              alt=""
              width={24}
              height={24}
              className="rounded-md dark:hidden"
            />
            <span>MailYard</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <a
            target="_blank"
            href="https://github.com/addoxy/email-builder"
            className={cn(
              buttonVariants({
                size: 'icon',
                variant: 'ghost',
              })
            )}
          >
            <GithubIcon className="size-5" />
          </a>
          <a
            target="_blank"
            href="https://x.com/axiidotsh"
            className={cn(
              buttonVariants({
                size: 'icon',
                variant: 'ghost',
              })
            )}
          >
            <TwitterIcon />
          </a>
        </div>
      </div>

      <div className="mt-6 border-t pt-6 text-center">
        <p className="text-muted-foreground text-sm">© {year} MailYard. All rights reserved.</p>
      </div>
    </footer>
  );
}
