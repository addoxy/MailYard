'use client';

import { useEmailShortcuts } from '../hooks/use-email-shortcuts';

interface DesignPageContentProps {
  children: React.ReactNode;
}

export function DesignPageContent({ children }: DesignPageContentProps) {
  // Initialize keyboard shortcuts
  useEmailShortcuts();

  return <>{children}</>;
}