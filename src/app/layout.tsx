import { Providers } from '@/lib/providers';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'MailMoss - Visual Email Builder',
    template: '%s | MailMoss',
  },
  description:
    'Create beautiful, responsive emails with our intuitive drag-and-drop email builder. No coding required - design professional emails in minutes.',
  keywords: [
    'email builder',
    'email template builder',
    'drag and drop email builder',
    'visual email editor',
    'responsive email design',
    'email marketing tool',
    'no-code email builder',
    'HTML email builder',
    'email design tool',
    'react email builder',
  ],
  authors: [{ name: 'MailMoss' }],
  creator: 'MailMoss',
  publisher: 'MailMoss',
  metadataBase: new URL('https://mailmoss.axii.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MailMoss - Visual Email Builder',
    description:
      'Create beautiful, responsive emails with our intuitive drag-and-drop email builder. No coding required - design professional emails in minutes.',
    url: 'https://mailmoss.axii.xyz',
    siteName: 'MailMoss',
    images: [
      {
        url: '/hero-light.png',
        width: 1200,
        height: 630,
        alt: 'MailMoss Email Builder Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MailMoss - Visual Email Builder',
    description:
      'Create beautiful, responsive emails with our intuitive drag-and-drop email builder. No coding required - design professional emails in minutes.',
    images: ['/hero-light.png'],
    creator: '@axiidotsh',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          'min-h-screen w-full antialiased',
          process.env.NODE_ENV === 'development' && 'debug-screens'
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
