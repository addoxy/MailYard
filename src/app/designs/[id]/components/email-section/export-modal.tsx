'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { pretty, render } from '@react-email/render';
import { useAtomValue } from 'jotai';
import { Check, Copy } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { canvasStylesAtom, emailBlocksAtom } from '../../atoms';
import { generateEmailComponent } from '../../utils/export-utils';
import type { EmailBlockType } from '../email-blocks/types';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type TabType = 'react' | 'html';

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const emailBlocks = useAtomValue(emailBlocksAtom);
  const canvasStyles = useAtomValue(canvasStylesAtom);

  const [tab, setTab] = useState<TabType>('react');
  const [reactCode, setReactCode] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const generateEmailJSX = useCallback((blocks: EmailBlockType[], styles: typeof canvasStyles) => {
    return (
      <div
        style={{
          maxWidth: styles.maxWidth,
          backgroundColor: styles.backgroundColor,
          padding: styles.padding,
          fontFamily: styles.fontFamily,
          margin: '0 auto',
        }}
      >
        {blocks.map((block) => {
          switch (block.type) {
            case 'heading':
              return React.createElement(
                `h${block.level}`,
                {
                  key: block.id,
                  style: {
                    fontSize: block.fontSize,
                    fontWeight: block.fontWeight,
                    color: block.color,
                    fontFamily:
                      block.fontFamily === 'inherit' ? styles.fontFamily : block.fontFamily,
                    lineHeight: block.lineHeight,
                    letterSpacing: block.letterSpacing,
                    textAlign: block.textAlign,
                    margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
                    padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
                  },
                },
                block.content
              );

            case 'text':
              return React.createElement(
                'p',
                {
                  key: block.id,
                  style: {
                    fontSize: block.fontSize,
                    fontWeight: block.fontWeight,
                    color: block.color,
                    fontFamily:
                      block.fontFamily === 'inherit' ? styles.fontFamily : block.fontFamily,
                    lineHeight: block.lineHeight,
                    letterSpacing: block.letterSpacing,
                    textAlign: block.textAlign,
                    margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
                    padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
                  },
                },
                block.content
              );

            case 'button':
              return React.createElement(
                'a',
                {
                  key: block.id,
                  href: block.href,
                  style: {
                    display: 'inline-block',
                    fontSize: block.fontSize,
                    fontWeight: block.fontWeight,
                    color: block.color,
                    backgroundColor: block.backgroundColor,
                    fontFamily:
                      block.fontFamily === 'inherit' ? styles.fontFamily : block.fontFamily,
                    lineHeight: block.lineHeight,
                    letterSpacing: block.letterSpacing,
                    textAlign: block.textAlign,
                    textDecoration: 'none',
                    border:
                      block.borderWidth !== '0px'
                        ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}`
                        : 'none',
                    borderRadius: block.borderRadius,
                    margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
                    padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
                  },
                },
                block.content
              );

            case 'link':
              return React.createElement(
                'a',
                {
                  key: block.id,
                  href: block.href,
                  style: {
                    fontSize: block.fontSize,
                    fontWeight: block.fontWeight,
                    color: block.color,
                    fontFamily:
                      block.fontFamily === 'inherit' ? styles.fontFamily : block.fontFamily,
                    lineHeight: block.lineHeight,
                    letterSpacing: block.letterSpacing,
                    textAlign: block.textAlign,
                    textDecoration: block.textDecoration,
                    margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
                    padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
                  },
                },
                block.content
              );

            case 'divider':
              return React.createElement('hr', {
                key: block.id,
                style: {
                  width: block.width,
                  height: block.height,
                  border:
                    block.borderWidth !== '0px'
                      ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}`
                      : 'none',
                  margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
                },
              });

            case 'image':
              return React.createElement('img', {
                key: block.id,
                src: block.src,
                alt: block.alt,
                style: {
                  width: block.width,
                  height: block.height,
                  border:
                    block.borderWidth !== '0px'
                      ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}`
                      : 'none',
                  borderRadius: block.borderRadius,
                  margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
                  padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
                },
              });

            default:
              return null;
          }
        })}
      </div>
    );
  }, []);

  const generateExports = useCallback(async () => {
    setIsGenerating(true);
    try {
      // Generate React component code with formatting
      const reactComponent = generateEmailComponent(emailBlocks, canvasStyles);
      setReactCode(reactComponent);

      const html = await pretty(await render(generateEmailJSX(emailBlocks, canvasStyles)));
      setHtmlCode(html);
    } catch (error) {
      console.error('Error generating exports:', error);
      setReactCode('// Error generating React code');
      setHtmlCode('<!-- Error generating HTML -->');
    } finally {
      setIsGenerating(false);
    }
  }, [emailBlocks, canvasStyles, generateEmailJSX]);

  useEffect(() => {
    if (open) {
      generateExports();
    }
  }, [open, generateExports]);

  const copyToClipboard = async (text: string, type: 'react' | 'html') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'react') {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] !max-w-7xl">
        <DialogHeader>
          <DialogTitle>Export Email</DialogTitle>
          <DialogDescription>
            Export your email as React component code or clean HTML.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue="react"
          className="w-full"
          value={tab}
          onValueChange={(value) => setTab(value as TabType)}
        >
          <div className="mb-2 flex items-center justify-between">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="react">React Code</TabsTrigger>
              <TabsTrigger value="html">HTML</TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (tab === 'react') {
                  copyToClipboard(reactCode, 'react');
                } else {
                  copyToClipboard(htmlCode, 'html');
                }
              }}
              disabled={isGenerating}
            >
              {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copiedCode ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <TabsContent value="react" className="space-y-4">
            <ScrollArea className="bg-muted/50 h-96 w-full rounded border">
              <pre className="overflow-x-auto p-4 font-mono text-sm break-words whitespace-pre-wrap">
                <code className="text-xs leading-relaxed">
                  {isGenerating ? 'Generating...' : reactCode}
                </code>
              </pre>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="html" className="space-y-4">
            <ScrollArea className="bg-muted/50 h-96 w-full rounded border">
              <pre className="overflow-x-auto p-4 font-mono text-sm break-words whitespace-pre-wrap">
                <code className="text-xs leading-relaxed">
                  {isGenerating ? 'Generating...' : htmlCode}
                </code>
              </pre>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
