import { Button, Container, Heading, Hr, Img, Link, Section, Text } from '@react-email/components';
import React from 'react';
import { EmailBlockType } from '../components/email-blocks/types';

interface CanvasStyles {
  maxWidth: string;
  backgroundColor: string;
  paddingTop: string;
  paddingRight: string;
  paddingBottom: string;
  paddingLeft: string;
  marginTop: string;
  marginBottom: string;
  borderWidth: string;
  borderStyle: string;
  borderColor: string;
  borderRadius: string;
  fontFamily: string;
}

export function generateEmailComponent(blocks: EmailBlockType[], canvasStyles: CanvasStyles) {
  const containerStyles = {
    marginTop: canvasStyles.marginTop,
    marginLeft: 'auto' as const,
    marginRight: 'auto' as const,
    marginBottom: canvasStyles.marginBottom,
    maxWidth: canvasStyles.maxWidth,
    backgroundColor: canvasStyles.backgroundColor,
    paddingTop: canvasStyles.paddingTop,
    paddingRight: canvasStyles.paddingRight,
    paddingBottom: canvasStyles.paddingBottom,
    paddingLeft: canvasStyles.paddingLeft,
    borderWidth: canvasStyles.borderWidth,
    borderStyle: canvasStyles.borderStyle as 'solid' | 'dashed' | 'dotted',
    borderColor: canvasStyles.borderColor,
    borderRadius: canvasStyles.borderRadius,
    fontFamily: canvasStyles.fontFamily,
  };

  function GeneratedEmail() {
    return (
      <Container style={containerStyles}>{blocks.map((block) => renderBlock(block))}</Container>
    );
  }

  return GeneratedEmail;
}

function renderBlock(block: EmailBlockType): React.ReactElement {
  switch (block.type) {
    case 'heading':
      const headingStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight as
          | 'normal'
          | 'bold'
          | '100'
          | '200'
          | '300'
          | '400'
          | '500'
          | '600'
          | '700'
          | '800'
          | '900',
        color: block.color,
        backgroundColor:
          block.backgroundColor !== 'transparent' ? block.backgroundColor : undefined,
        borderWidth: block.borderWidth !== '0px' ? block.borderWidth : undefined,
        borderStyle: block.borderWidth !== '0px' ? block.borderStyle : undefined,
        borderColor: block.borderWidth !== '0px' ? block.borderColor : undefined,
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textDecoration:
          block.textDecoration !== 'none'
            ? (block.textDecoration as 'underline' | 'line-through')
            : undefined,
        textAlign: block.textAlign as 'left' | 'center' | 'right' | 'justify',
        width: block.width === '100%' ? '100%' : block.width,
        maxWidth: '100%',
        wordWrap: 'break-word' as const,
        wordBreak: 'break-word' as const,
        overflowWrap: 'break-word' as const,
        boxSizing: 'border-box' as const,
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
      };

      return (
        <Heading key={block.id} as="h1" style={headingStyles}>
          {block.content}
        </Heading>
      );

    case 'text':
      const textStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight as
          | 'normal'
          | 'bold'
          | '100'
          | '200'
          | '300'
          | '400'
          | '500'
          | '600'
          | '700'
          | '800'
          | '900',
        color: block.color,
        backgroundColor:
          block.backgroundColor !== 'transparent' ? block.backgroundColor : undefined,
        borderWidth: block.borderWidth !== '0px' ? block.borderWidth : undefined,
        borderStyle: block.borderWidth !== '0px' ? block.borderStyle : undefined,
        borderColor: block.borderWidth !== '0px' ? block.borderColor : undefined,
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textDecoration:
          block.textDecoration !== 'none'
            ? (block.textDecoration as 'underline' | 'line-through')
            : undefined,
        textAlign: block.textAlign as 'left' | 'center' | 'right' | 'justify',
        width: block.width === '100%' ? '100%' : block.width,
        maxWidth: '100%',
        wordWrap: 'break-word' as const,
        wordBreak: 'break-word' as const,
        overflowWrap: 'break-word' as const,
        boxSizing: 'border-box' as const,
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
      };

      return (
        <Text key={block.id} style={textStyles}>
          {block.content}
        </Text>
      );

    case 'button':
      const buttonContainerStyles = {
        textAlign: block.textAlign,
        width: '100%',
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
      };

      const buttonStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight as
          | 'normal'
          | 'bold'
          | '100'
          | '200'
          | '300'
          | '400'
          | '500'
          | '600'
          | '700'
          | '800'
          | '900',
        color: block.color,
        backgroundColor: block.backgroundColor,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textDecoration:
          block.textDecoration !== 'none'
            ? (block.textDecoration as 'underline' | 'line-through')
            : undefined,
        borderWidth: block.borderWidth,
        borderStyle: block.borderWidth !== '0px' ? block.borderStyle : 'none',
        borderColor: block.borderWidth !== '0px' ? block.borderColor : undefined,
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        width: block.width,
        maxWidth: '100%',
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
        display: 'inline-block' as const,
        textAlign: 'center' as const,
        boxSizing: 'border-box' as const,
      };

      return (
        <Section key={block.id} style={buttonContainerStyles}>
          <Button href={block.href} style={buttonStyles}>
            {block.content}
          </Button>
        </Section>
      );

    case 'link':
      const linkContainerStyles = {
        textAlign: block.textAlign as 'left' | 'center' | 'right' | 'justify',
        width: '100%',
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
      };

      const linkStyles = {
        display: 'block' as const,
        fontSize: block.fontSize,
        fontWeight: block.fontWeight as
          | 'normal'
          | 'bold'
          | '100'
          | '200'
          | '300'
          | '400'
          | '500'
          | '600'
          | '700'
          | '800'
          | '900',
        color: block.color,
        backgroundColor:
          block.backgroundColor !== 'transparent' ? block.backgroundColor : undefined,
        borderWidth: block.borderWidth !== '0px' ? block.borderWidth : undefined,
        borderStyle: block.borderWidth !== '0px' ? block.borderStyle : undefined,
        borderColor: block.borderWidth !== '0px' ? block.borderColor : undefined,
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textDecoration: block.textDecoration as 'none' | 'underline' | 'line-through',
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
      };

      return (
        <Section key={block.id} style={linkContainerStyles}>
          <Link href={block.href} style={linkStyles}>
            {block.content}
          </Link>
        </Section>
      );

    case 'divider':
      const dividerContainerStyles = {
        width: '100%',
        marginTop: block.marginTop,
        marginBottom: block.marginBottom,
      };

      const getDividerAlignment = () => {
        switch (block.textAlign) {
          case 'center':
            return { marginLeft: 'auto' as const, marginRight: 'auto' as const };
          case 'right':
            return { marginLeft: 'auto' as const, marginRight: '0' };
          case 'left':
          default:
            return { marginLeft: '0', marginRight: 'auto' as const };
        }
      };

      const dividerStyles = {
        width: block.width,
        height: '0px',
        border: 'none',
        borderTop: `${block.height} solid ${block.color}`,
        backgroundColor: 'transparent',
        margin: '0',
        display: 'block' as const,
        ...getDividerAlignment(),
      };

      return (
        <Section key={block.id} style={dividerContainerStyles}>
          <Hr style={dividerStyles} />
        </Section>
      );

    case 'image':
      const sectionStyles = {
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
        display: 'block' as const,
      };

      // Handle image alignment
      const getImageAlignment = () => {
        switch (block.textAlign) {
          case 'center':
            return { marginLeft: 'auto' as const, marginRight: 'auto' as const };
          case 'right':
            return { marginLeft: 'auto' as const, marginRight: '0' };
          case 'left':
          default:
            return { marginLeft: '0', marginRight: 'auto' as const };
        }
      };

      const imageStyles = {
        width: block.width,
        height: block.height !== 'auto' ? block.height : undefined,
        borderWidth: block.borderWidth !== '0px' ? block.borderWidth : undefined,
        borderStyle: block.borderWidth !== '0px' ? block.borderStyle : undefined,
        borderColor: block.borderWidth !== '0px' ? block.borderColor : undefined,
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        display: 'block' as const,
        maxWidth: '100%',
        boxSizing: 'border-box' as const,
        ...getImageAlignment(),
      };

      return (
        <Section key={block.id} style={sectionStyles}>
          <Img src={block.src || ''} alt={block.alt} style={imageStyles} />
        </Section>
      );

    default:
      return <></>;
  }
}
