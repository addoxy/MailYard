'use client';

import { Img, Section } from '@react-email/components';
import { Image } from 'lucide-react';
import { blockDefaults, createBaseStyle } from '@/lib/style-utils';
import { ImageBlockProps } from './types';

const defaults = blockDefaults.image;

export function ImageBlock({
  id,
  src = defaults.src,
  alt = defaults.alt,
  width = defaults.width,
  height = defaults.height,
  textAlign = defaults.textAlign,
  borderWidth = defaults.borderWidth,
  borderColor = defaults.borderColor,
  borderStyle = defaults.borderStyle,
  borderRadius = defaults.borderRadius,
  marginTop = defaults.marginTop,
  marginBottom = defaults.marginBottom,
  marginLeft = defaults.marginLeft,
  marginRight = defaults.marginRight,
  paddingTop = defaults.paddingTop,
  paddingBottom = defaults.paddingBottom,
  paddingLeft = defaults.paddingLeft,
  paddingRight = defaults.paddingRight,
  isSelected = false,
  onClick,
}: ImageBlockProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const containerStyle = {
    ...createBaseStyle({
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    }),
    display: 'block',
  };

  // Create proper alignment styles for the image
  const getImageAlignment = () => {
    switch (textAlign) {
      case 'center':
        return { marginLeft: 'auto', marginRight: 'auto' };
      case 'right':
        return { marginLeft: 'auto', marginRight: '0' };
      case 'left':
      default:
        return { marginLeft: '0', marginRight: 'auto' };
    }
  };

  const imageStyle = {
    ...createBaseStyle({
      width,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
    }),
    ...getImageAlignment(),
    height: height !== 'auto' ? height : undefined,
    display: 'block',
    maxWidth: '100%',
    boxSizing: 'border-box' as const,
  };

  const placeholderStyle = {
    ...getImageAlignment(),
    width: width,
    height: '200px',
    border: '2px dashed #e5e7eb',
    borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    color: '#9ca3af',
    fontSize: '14px',
    textAlign: 'center' as const,
    flexDirection: 'column' as const,
    gap: '8px',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box' as const,
  };

  return (
    <>
      {src ? (
        <Section style={containerStyle} onClick={handleClick}>
          <Img src={src} alt={alt} style={imageStyle} />
        </Section>
      ) : (
        <div style={containerStyle}>
          <div style={placeholderStyle}>
            <Image aria-label="Image placeholder icon" />
            <div>
              <div style={{ fontWeight: '500', marginBottom: '4px' }}>No image URL provided</div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>
                Add an image URL to display the image
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
