'use client';

import { useAtomValue } from 'jotai';
import { Mail } from 'lucide-react';
import React from 'react';
import { canvasStylesAtom, emailBlocksAtom } from '../../atoms';
import { ButtonBlock } from '../email-blocks/button-block';
import { DividerBlock } from '../email-blocks/divider-block';
import { HeadingBlock } from '../email-blocks/heading-block';
import { ImageBlock } from '../email-blocks/image-block';
import { LinkBlock } from '../email-blocks/link-block';
import { TextBlock } from '../email-blocks/text-block';
import {
  ButtonBlockProps,
  DividerBlockProps,
  EmailBlockType,
  HeadingBlockProps,
  ImageBlockProps,
  LinkBlockProps,
  TextBlockProps,
} from '../email-blocks/types';

interface InboxPreviewProps {
  deviceView: 'desktop' | 'mobile';
}

export const InboxPreview: React.FC<InboxPreviewProps> = ({ deviceView }) => {
  const emailBlocks = useAtomValue(emailBlocksAtom);
  const canvasStyles = useAtomValue(canvasStylesAtom);

  const renderEmailBlock = (block: EmailBlockType) => {
    switch (block.type) {
      case 'heading':
        return (
          <HeadingBlock
            key={block.id}
            {...(block as HeadingBlockProps)}
            isSelected={false}
            onClick={undefined}
          />
        );
      case 'text':
        return (
          <TextBlock
            key={block.id}
            {...(block as TextBlockProps)}
            isSelected={false}
            onClick={undefined}
          />
        );
      case 'button':
        return (
          <ButtonBlock
            key={block.id}
            {...(block as ButtonBlockProps)}
            isSelected={false}
            onClick={undefined}
          />
        );
      case 'link':
        return (
          <LinkBlock
            key={block.id}
            {...(block as LinkBlockProps)}
            isSelected={false}
            onClick={undefined}
          />
        );
      case 'divider':
        return (
          <DividerBlock
            key={block.id}
            {...(block as DividerBlockProps)}
            isSelected={false}
            onClick={undefined}
          />
        );
      case 'image':
        return (
          <ImageBlock
            key={block.id}
            {...(block as ImageBlockProps)}
            isSelected={false}
            onClick={undefined}
          />
        );
      default:
        return null;
    }
  };

  const getEmailSubject = () => {
    // Try to get subject from first heading block, fallback to default
    const firstHeading = emailBlocks.find((block) => block.type === 'heading');
    if (firstHeading && 'content' in firstHeading) {
      return firstHeading.content || 'Welcome to our newsletter!';
    }
    return 'Welcome to our newsletter!';
  };

  const getEmailPreview = () => {
    // Try to get preview from first text block, fallback to default
    const firstText = emailBlocks.find((block) => block.type === 'text');
    if (firstText && 'content' in firstText) {
      return firstText.content.slice(0, 100) + (firstText.content.length > 100 ? '...' : '');
    }
    return 'Check out our latest updates and offers...';
  };

  const emailSubject = getEmailSubject();
  const emailPreviewText = getEmailPreview();

  if (deviceView === 'mobile') {
    return (
      <div className="bg-background h-full overflow-hidden rounded-lg border py-10">
        {/* Mobile Phone Frame */}
        <div className="bg-accent mx-auto h-full max-w-sm overflow-hidden rounded-xl border p-2">
          <div className="h-full overflow-auto rounded-lg border bg-white">
            {/* Phone Status Bar */}
            <div className="flex items-center justify-between border-b border-b-black/10 px-6 py-2 text-xs font-medium">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 w-1 rounded-full ${index < 3 ? 'bg-black' : 'bg-gray-300'}`}
                    ></div>
                  ))}
                </div>
                <span className="ml-2 text-black">Gmail</span>
              </div>
              <div className="flex items-center gap-1 text-black">
                <span>2:34</span>
                <div className="ml-2 flex items-center gap-0.5">
                  <div className="h-2 w-4 rounded-full border border-black">
                    <div className="h-1.5 w-3 rounded-full bg-black"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Header */}
            <div className="border border-b border-b-black/10 bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                  <span className="text-sm font-semibold text-white">YC</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-black/80">Your Company</h3>
                  </div>
                  <p className="text-muted-foreground mb-1 text-xs">hello@yourcompany.com</p>
                  <p className="text-muted-foreground text-xs">2:34 PM</p>
                </div>
              </div>
            </div>

            {/* Email Content */}
            <div className="flex-1 overflow-auto">
              <div
                className="p-4"
                style={{
                  backgroundColor: canvasStyles.backgroundColor,
                }}
              >
                <div
                  style={{
                    backgroundColor: canvasStyles.backgroundColor,
                    padding: canvasStyles.padding,
                    fontFamily: canvasStyles.fontFamily,
                    borderRadius: '8px',
                  }}
                >
                  {emailBlocks.length === 0 ? (
                    <div className="py-12 text-center">
                      <Mail className="text-muted-foreground mx-auto mb-3 h-8 w-8" />
                      <h3 className="mb-2 text-base font-medium">No content yet</h3>
                      <p className="text-muted-foreground text-sm">Add blocks to see your email</p>
                    </div>
                  ) : (
                    emailBlocks.map((block) => renderEmailBlock(block))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background flex h-full overflow-hidden rounded-lg border">
      {/* Desktop Email List */}
      <div className="flex w-80 flex-col border-r">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold">Inbox</h2>
        </div>

        <div className="flex-1 overflow-auto">
          {/* Featured Email */}
          <div className="bg-muted cursor-pointer border-b border-l-4 border-l-blue-500 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                <span className="text-xs font-semibold text-white">YC</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold">Your Company</p>
                  <div className="text-muted-foreground flex items-center gap-1 text-xs">
                    <span>2:34 PM</span>
                  </div>
                </div>
                <p className="mb-1 line-clamp-1 text-sm font-medium">{emailSubject}</p>
                <p className="text-muted-foreground line-clamp-2 text-xs">{emailPreviewText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Email Content */}
      <div className="flex flex-1 flex-col">
        {/* Email Header */}
        <div className="border-b p-4">
          <div className="mb-3 flex items-center justify-between"></div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
              <span className="text-sm font-semibold text-white">YC</span>
            </div>
            <div className="flex-1">
              <h1 className="mb-1 text-lg font-semibold">{emailSubject}</h1>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <span className="text-foreground font-medium">Your Company</span>
                <span>&lt;hello@yourcompany.com&gt;</span>
                <span>•</span>
                <span>2:34 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div
          className="flex-1 overflow-auto p-6"
          style={{
            backgroundColor: canvasStyles.backgroundColor,
          }}
        >
          <div
            style={{
              maxWidth: canvasStyles.maxWidth,
              backgroundColor: canvasStyles.backgroundColor,
              padding: canvasStyles.padding,
              fontFamily: canvasStyles.fontFamily,
              margin: '0 auto',
            }}
          >
            {emailBlocks.length === 0 ? (
              <div className="py-12 text-center">
                <Mail className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
                <h3 className="mb-2 text-lg font-medium">No content yet</h3>
                <p className="text-muted-foreground">
                  Add some blocks to see how your email will look in an inbox
                </p>
              </div>
            ) : (
              emailBlocks.map((block) => renderEmailBlock(block))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
