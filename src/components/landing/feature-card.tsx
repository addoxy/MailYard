'use client';

import { cn } from '@/lib/utils';
import { Grab, Heading, LucideIcon, MousePointerClick, Text } from 'lucide-react';
import {
  BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockItem,
} from '../ui/code-block';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  type: 'dnd' | 'preview' | 'export' | 'styling';
}

export const FeatureCard = ({ title, description, icon, type }: FeatureCardProps) => {
  const Icon = icon;

  return (
    <div className="from-background/40 to-background/20 relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br shadow-lg backdrop-blur-sm">
      <div className="from-primary/5 absolute inset-0 h-full w-full bg-gradient-to-br to-transparent" />
      <div className="via-primary/20 absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent to-transparent" />
      <div
        className={cn(
          'relative flex h-full w-full flex-col gap-3 pb-6',
          type === 'export' ? 'px-0' : 'px-6 pt-6'
        )}
      >
        {type === 'dnd' && <Dnd />}
        {type === 'preview' && <Preview />}
        {type === 'export' && <Export />}
        {type === 'styling' && <Styling />}
        <div className={cn('mt-auto flex items-center gap-2', type === 'export' && 'px-6')}>
          <Icon className="text-primary size-4" />
          <span className="text-lg font-medium">{title}</span>
        </div>
        <p className={cn('text-muted-foreground text-sm', type === 'export' && 'px-6')}>
          {description}
        </p>
      </div>
    </div>
  );
};

const Dnd = () => {
  return (
    <div className="mx-auto w-full space-y-3 p-4">
      <div className="bg-primary/10 border-primary/20 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-sm">
        <Heading className="text-primary size-4" />
        <span className="text-sm font-medium">Welcome to our newsletter!</span>
      </div>
      <div className="bg-muted border-border relative flex scale-105 items-center gap-3 rounded-lg border px-4 py-3 shadow-sm transition-transform">
        <Text className="text-muted-foreground size-4" />
        <span className="text-sm">Stay updated with our latest news...</span>
        <Grab className="text-primary ml-auto size-4" />
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 shadow-sm dark:border-blue-800 dark:bg-blue-950/50">
        <MousePointerClick className="size-4 text-blue-600" />
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Subscribe Now</span>
      </div>
    </div>
  );
};

const Preview = () => {
  return (
    <div className="mx-auto w-full space-y-3 p-4">
      <div className="bg-background border-border overflow-hidden rounded-lg border shadow-sm">
        <div className="bg-muted/50 border-border flex items-center gap-2 border-b px-3 py-2">
          <div className="size-2 rounded-full bg-red-500"></div>
          <div className="size-2 rounded-full bg-yellow-500"></div>
          <div className="size-2 rounded-full bg-green-500"></div>
          <span className="text-muted-foreground ml-2 text-xs font-medium">Gmail</span>
        </div>
        <div className="space-y-2 p-3">
          <div className="bg-primary/20 text-primary border-primary/10 rounded-md border px-3 py-2 text-sm font-medium">
            Welcome to Our Newsletter!
          </div>
          <div className="text-muted-foreground text-sm leading-relaxed">
            Stay updated with our latest news and updates...
          </div>
          <div className="mt-4 w-fit rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white">
            Subscribe Now
          </div>
        </div>
      </div>
    </div>
  );
};

const Styling = () => {
  return (
    <div className="mx-auto w-full p-4">
      <div className="bg-background rounded-lg border p-4 shadow-sm">
        <div className="flex max-h-44 gap-4">
          <img
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2226&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Email newsletter mockup"
            className="max-h-44 rounded-lg object-cover shadow-lg"
          />
          <div className="flex-1 space-y-3 border-l pl-4">
            <span className="text-muted-foreground text-xs font-medium">Style Panel</span>

            {/* Image Size */}
            <div className="mt-3 flex items-center gap-2">
              <div className="bg-primary h-1 w-8 rounded-full"></div>
              <div className="bg-muted h-1 w-2 rounded-full"></div>
              <span className="text-muted-foreground text-xs">Size: 80%</span>
            </div>

            {/* Border Width */}
            <div className="flex items-center gap-2">
              <div className="bg-primary h-1 w-4 rounded-full"></div>
              <div className="bg-muted h-1 w-6 rounded-full"></div>
              <span className="text-muted-foreground text-xs">Border: 0px</span>
            </div>

            {/* Border Radius */}
            <div className="flex items-center gap-2">
              <div className="bg-primary h-1 w-6 rounded-full"></div>
              <div className="bg-muted h-1 w-4 rounded-full"></div>
              <span className="text-muted-foreground text-xs">Radius: 8px</span>
            </div>

            {/* Border Color */}
            <div className="flex items-center gap-2">
              <div className="size-3 rounded border-2 border-white bg-blue-500 shadow-sm ring-1 ring-black/10"></div>
              <div className="border-border size-3 rounded border bg-green-500"></div>
              <div className="border-border size-3 rounded border bg-red-500"></div>
              <span className="text-muted-foreground text-xs">Color</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Export = () => {
  const code = `import { Html, Body, Container, Text, Button } from '@react-email/components';

export default function EmailTemplate() {
  return (
    <Html>
      <Body style={{ fontFamily: 'Arial, sans-serif' }}>
        <Container>
          <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Welcome to Our Newsletter!
          </Text>
          <Text>
            Stay updated with our latest news...
          </Text>
          <Button
            href="https://example.com"
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
            }}
          >
            Subscribe Now
          </Button>
        </Container>
      </Body>
    </Html>
  );
}`;

  return (
    <div className="mb-2 overflow-hidden">
      <CodeBlock
        data={[
          {
            language: 'tsx',
            filename: 'email-template.tsx',
            code,
          },
        ]}
        defaultValue="tsx"
        className="border-border/50 ml-auto w-11/12 rounded-none rounded-bl-lg border-0 border-b border-l"
      >
        <CodeBlockBody className="max-h-[250px] overflow-auto">
          {(item) => (
            <CodeBlockItem key={item.language} value={item.language}>
              <CodeBlockContent language={item.language as BundledLanguage}>
                {item.code}
              </CodeBlockContent>
            </CodeBlockItem>
          )}
        </CodeBlockBody>
      </CodeBlock>
    </div>
  );
};
