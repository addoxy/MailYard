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
} from '@/components/ui/code-block';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { canvasStylesAtom, emailBlocksAtom } from '../../atoms';
import { formatCode, generateEmailComponent } from '../../utils/export-utils';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const emailBlocks = useAtomValue(emailBlocksAtom);
  const canvasStyles = useAtomValue(canvasStylesAtom);

  const [reactCode, setReactCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateExports = useCallback(async () => {
    setIsGenerating(true);
    try {
      const reactComponent = generateEmailComponent(emailBlocks, canvasStyles);
      const formattedReactCode = await formatCode(reactComponent);
      setReactCode(formattedReactCode);
    } catch (error) {
      console.error('Error generating exports:', error);
      setReactCode('// Error generating React code');
    } finally {
      setIsGenerating(false);
    }
  }, [emailBlocks, canvasStyles]);

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
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex !max-w-7xl flex-col transition-all">
        <DialogHeader>
          <DialogTitle>Export Email</DialogTitle>
          <DialogDescription>Export your email as React component code.</DialogDescription>
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
              <CodeBlockCopyButton
                onCopy={() => console.log('Copied code to clipboard')}
                onError={() => console.error('Failed to copy code to clipboard')}
              />
            </CodeBlockHeader>
            <CodeBlockBody className="max-h-[80vh] overflow-auto">
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
