import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="via-background from-primary/10 to-primary/10 flex min-h-screen w-full items-center justify-center bg-gradient-to-br">
      <div className="max-w-lg space-y-8 px-4 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="from-primary/20 to-background flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br">
              <AlertCircle className="text-muted-foreground h-16 w-16" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-foreground/90 text-6xl font-bold">404</h1>
            <h2 className="text-foreground/80 text-2xl font-semibold">Page Not Found</h2>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/designs/design-1">
            Get Back to Designing
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </div>
  );
}
