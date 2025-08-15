import { Container, Img } from '@react-email/components';
import { Image } from 'lucide-react';
import { ImageBlockProps } from './types';

export function ImageBlock({
  id,
  src = '',
  alt = 'Image',
  width = '100%',
  height = 'auto',
  textAlign = 'center',
  borderWidth = '0px',
  borderColor = '#e5e7eb',
  borderStyle = 'solid',
  borderRadius = '8px',
  marginTop = '0px',
  marginBottom = '16px',
  marginLeft = '0px',
  marginRight = '0px',
  paddingTop = '0px',
  paddingBottom = '0px',
  paddingLeft = '0px',
  paddingRight = '0px',
  isSelected = false,
  onClick,
}: ImageBlockProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const containerStyle = {
    textAlign,
    margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    cursor: onClick ? 'pointer' : 'default',
  };

  const imageStyle = {
    width,
    height: height !== 'auto' ? height : undefined,
    border: `${borderWidth} ${borderStyle} ${borderColor}`,
    borderRadius,
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
