import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle';

export function Navbar() {
  return (
    <nav className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <span>MailYard</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild>
              <Link href="/design">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
