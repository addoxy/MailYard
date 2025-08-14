import { Container } from '@react-email/components';
import { ContainerBlockProps, EmailBlockType } from './types';
import { HeadingBlock } from './heading-block';
import { TextBlock } from './text-block';

export function ContainerBlock({
  id,
  backgroundColor = 'transparent',
  borderWidth = '0px',
  borderColor = '#e5e7eb',
  borderStyle = 'solid',
  borderRadius = '0px',
  width = '100%',
  height = 'auto',
  marginTop = '0px',
  marginBottom = '16px',
  marginLeft = '0px',
  marginRight = '0px',
  paddingTop = '16px',
  paddingBottom = '16px',
  paddingLeft = '16px',
  paddingRight = '16px',
  children = [],
  isSelected = false,
  onClick
}: ContainerBlockProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const baseStyle = {
    backgroundColor,
    border: `${borderWidth} ${borderStyle} ${borderColor}`,
    borderRadius,
    width,
    height: height !== 'auto' ? height : undefined,
    margin: `${marginTop} ${marginRight} ${marginBottom} ${marginLeft}`,
    padding: `${paddingTop} ${paddingRight} ${paddingBottom} ${paddingLeft}`,
    cursor: onClick ? 'pointer' : 'default',
    outline: isSelected ? '2px solid #3b82f6' : 'none',
    outlineOffset: isSelected ? '2px' : '0',
    transition: 'outline 0.2s ease-in-out',
    minHeight: children && children.length === 0 ? '50px' : undefined,
  };

  const renderChild = (child: EmailBlockType, index: number) => {
    switch (child.type) {
      case 'heading':
        return <HeadingBlock key={child.id || index} {...child} />;
      case 'text':
        return <TextBlock key={child.id || index} {...child} />;
      case 'container':
        return <ContainerBlock key={child.id || index} {...child} />;
      default:
        return null;
    }
  };

  return (
    <Container
      style={baseStyle}
      onClick={handleClick}
    >
      {children && children.length > 0 ? (
        children.map((child, index) => renderChild(child, index))
      ) : (
        <div style={{ color: '#9ca3af', fontSize: '14px', textAlign: 'center' as const }}>
          Empty container - drop blocks here
        </div>
      )}
    </Container>
  );
}