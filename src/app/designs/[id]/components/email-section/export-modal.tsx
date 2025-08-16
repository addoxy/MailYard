'use client';

import {
  BundledLanguage,
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from '@/components/ui/code-block';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { pretty, render } from '@react-email/render';
import { useAtomValue } from 'jotai';
import React, { useCallback, useEffect, useState } from 'react';
import { canvasStylesAtom, emailBlocksAtom } from '../../atoms';
import { generateEmailComponent } from '../../utils/export-utils';
import type { EmailBlockType } from '../email-blocks/types';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const emailBlocks = useAtomValue(emailBlocksAtom);
  const canvasStyles = useAtomValue(canvasStylesAtom);

  const [reactCode, setReactCode] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
                'h1',
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
      const reactComponent = generateEmailComponent(emailBlocks, canvasStyles);
      setReactCode(reactComponent);

      const htmlComponent = await pretty(await render(generateEmailJSX(emailBlocks, canvasStyles)));
      setHtmlCode(htmlComponent);
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

  const code = [
    {
      language: 'tsx',
      filename: 'email-template.tsx',
      code: reactCode,
    },
    {
      language: 'html',
      filename: 'email-template.html',
      code: htmlCode,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex !max-w-7xl flex-col transition-all">
        <DialogHeader>
          <DialogTitle>Export Email</DialogTitle>
          <DialogDescription>
            Export your email as React component code or clean HTML.
          </DialogDescription>
        </DialogHeader>
        {isGenerating ? (
          <Skeleton className="h-[400px] w-full" />
        ) : (
          <CodeBlock data={code} defaultValue={code[0].language}>
            <CodeBlockHeader>
              <CodeBlockFiles>
                {(item) => (
                  <CodeBlockFilename key={item.language} value={item.language}>
                    {item.filename}
                  </CodeBlockFilename>
                )}
              </CodeBlockFiles>
              <CodeBlockSelect>
                <CodeBlockSelectTrigger>
                  <CodeBlockSelectValue />
                </CodeBlockSelectTrigger>
                <CodeBlockSelectContent>
                  {(item) => (
                    <CodeBlockSelectItem key={item.language} value={item.language}>
                      {item.language}
                    </CodeBlockSelectItem>
                  )}
                </CodeBlockSelectContent>
              </CodeBlockSelect>
              <CodeBlockCopyButton
                onCopy={() => console.log('Copied code to clipboard')}
                onError={() => console.error('Failed to copy code to clipboard')}
              />
            </CodeBlockHeader>
            <CodeBlockBody>
              {(item) => (
                <CodeBlockItem key={item.language} value={item.language}>
                  <CodeBlockContent language={item.language as BundledLanguage}>
                    {item.code}
                  </CodeBlockContent>
                </CodeBlockItem>
              )}
            </CodeBlockBody>
          </CodeBlock>
        )}
      </DialogContent>
    </Dialog>
  );
}
