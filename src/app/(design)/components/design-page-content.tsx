'use client';

import { useMobile } from '@/hooks/use-mobile';
import { Monitor, Smartphone } from 'lucide-react';
import { useEmailShortcuts } from '../hooks/use-email-shortcuts';

interface DesignPageContentProps {
  children: React.ReactNode;
}

export function DesignPageContent({ children }: DesignPageContentProps) {
  const isMobile = useMobile();
  useEmailShortcuts();

  if (isMobile) {
    return (
      <div className="via-background from-primary/10 to-primary/10 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br px-4">
        <div className="max-w-md space-y-8 text-center">
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="from-primary/20 to-background flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br">
                  <Monitor className="text-primary h-10 w-10" />
                </div>
                <div className="bg-background border-border absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-2">
                  <Smartphone className="text-muted-foreground h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-foreground text-xl font-semibold">Desktop Required</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The email builder requires a desktop screen for the best experience. Please switch
                to a larger device to start designing.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
