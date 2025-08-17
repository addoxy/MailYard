'use client';

import { ClearableNumberInput } from '@/components/clearable-number-input';
import { FieldLabel, SectionLabel } from '@/components/settings-labels';
import { numberToPx, pxToNumber } from '@/lib/style-utils';
import { useState } from 'react';
import { EmailBlockType } from '../../email-blocks/types';
import { getBlockProperty, hasProperty } from '../utils/block-property-utils';
import { LinkToggleButton } from './link-toggle-button';

interface SpacingControlsProps {
  block: EmailBlockType;
  onUpdate: (property: string, value: string | number) => void;
}

export const SpacingControls = ({ block, onUpdate }: SpacingControlsProps) => {
  const [marginLinked, setMarginLinked] = useState(false);
  const [paddingLinked, setPaddingLinked] = useState(false);

  const hasMargin = hasProperty(block, 'marginTop');
  const hasPadding = hasProperty(block, 'paddingTop');

  if (!hasMargin && !hasPadding) return null;

  const marginTop = pxToNumber(getBlockProperty(block, 'marginTop') || '0px');
  const marginRight = pxToNumber(getBlockProperty(block, 'marginRight') || '0px');
  const marginBottom = pxToNumber(getBlockProperty(block, 'marginBottom') || '0px');
  const marginLeft = pxToNumber(getBlockProperty(block, 'marginLeft') || '0px');
  const paddingTop = pxToNumber(getBlockProperty(block, 'paddingTop') || '0px');
  const paddingRight = pxToNumber(getBlockProperty(block, 'paddingRight') || '0px');
  const paddingBottom = pxToNumber(getBlockProperty(block, 'paddingBottom') || '0px');
  const paddingLeft = pxToNumber(getBlockProperty(block, 'paddingLeft') || '0px');

  const updateLinkedMargin = (value: number) => {
    const pxValue = numberToPx(value);
    onUpdate('marginTop', pxValue);
    onUpdate('marginBottom', pxValue);
    onUpdate('marginLeft', pxValue);
    onUpdate('marginRight', pxValue);
  };

  const updateLinkedPadding = (value: number) => {
    const pxValue = numberToPx(value);
    onUpdate('paddingTop', pxValue);
    onUpdate('paddingBottom', pxValue);
    onUpdate('paddingLeft', pxValue);
    onUpdate('paddingRight', pxValue);
  };

  return (
    <div className="flex flex-col gap-4">
      <SectionLabel text="Spacing" />
      {hasMargin && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <SectionLabel text="Margin" />
            <LinkToggleButton
              mode={marginLinked ? 'linked' : 'unlinked'}
              onToggle={() => setMarginLinked(!marginLinked)}
            />
          </div>

          {marginLinked ? (
            <ClearableNumberInput value={marginTop} onChange={updateLinkedMargin} />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <FieldLabel text="Top" />
                <ClearableNumberInput
                  value={marginTop}
                  onChange={(value) => onUpdate('marginTop', numberToPx(value))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel text="Right" />
                <ClearableNumberInput
                  value={marginRight}
                  onChange={(value) => onUpdate('marginRight', numberToPx(value))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel text="Bottom" />
                <ClearableNumberInput
                  value={marginBottom}
                  onChange={(value) => onUpdate('marginBottom', numberToPx(value))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel text="Left" />
                <ClearableNumberInput
                  value={marginLeft}
                  onChange={(value) => onUpdate('marginLeft', numberToPx(value))}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {hasPadding && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <SectionLabel text="Padding" />
            <LinkToggleButton
              mode={paddingLinked ? 'linked' : 'unlinked'}
              onToggle={() => setPaddingLinked(!paddingLinked)}
            />
          </div>

          {paddingLinked ? (
            <ClearableNumberInput value={paddingTop} onChange={updateLinkedPadding} />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <FieldLabel text="Top" />
                <ClearableNumberInput
                  value={paddingTop}
                  onChange={(value) => onUpdate('paddingTop', numberToPx(value))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel text="Right" />
                <ClearableNumberInput
                  value={paddingRight}
                  onChange={(value) => onUpdate('paddingRight', numberToPx(value))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel text="Bottom" />
                <ClearableNumberInput
                  value={paddingBottom}
                  onChange={(value) => onUpdate('paddingBottom', numberToPx(value))}
                />
              </div>
              <div className="flex flex-col gap-1">
                <FieldLabel text="Left" />
                <ClearableNumberInput
                  value={paddingLeft}
                  onChange={(value) => onUpdate('paddingLeft', numberToPx(value))}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
