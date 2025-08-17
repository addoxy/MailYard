import { Container, Img } from '@react-email/components';
import { Image } from 'lucide-react';
import { blockDefaults, createBaseStyle } from '../../../../../lib/style-utils';
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
      textAlign,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
    }),
    cursor: onClick ? 'pointer' : 'default',
  };

  const imageStyle = {
    ...createBaseStyle({
      width,
      borderWidth,
      borderColor,
      borderStyle,
      borderRadius,
    }),
    height: height !== 'auto' ? height : undefined,
    display: 'block',
    maxWidth: '100%',
  };

  const placeholderStyle = {
    width,
    height: height !== 'auto' ? height : '200px',
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
  };

  return (
    <Container style={containerStyle} onClick={handleClick}>
      {src ? (
        <Img src={src} alt={alt} style={imageStyle} />
      ) : (
        <div style={placeholderStyle}>
          <Image aria-label="Image placeholder icon" />
          <div>
            <div style={{ fontWeight: '500', marginBottom: '4px' }}>No image URL provided</div>
            <div style={{ fontSize: '12px', opacity: 0.7 }}>
              Add an image URL to display the image
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
