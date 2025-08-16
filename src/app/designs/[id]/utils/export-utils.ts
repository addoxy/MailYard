import prettierPluginBabel from 'prettier/plugins/babel';
import prettierPluginEstree from 'prettier/plugins/estree';
import { format as prettierFormatCode } from 'prettier/standalone';
import { EmailBlockType } from '../components/email-blocks/types';

interface CanvasStyles {
  maxWidth: string;
  backgroundColor: string;
  padding: string;
  fontFamily: string;
}

export function generateEmailComponent(
  blocks: EmailBlockType[],
  canvasStyles: CanvasStyles
): string {
  const imports = generateImports(blocks);
  const componentCode = generateComponentBody(blocks, canvasStyles);

  return `${imports}

export default function EmailTemplate() {
  return (
${componentCode}
  );
}`;
}

function generateImports(blocks: EmailBlockType[]): string {
  const usedComponents = new Set<string>();

  // Add container by default for wrapper
  usedComponents.add('Container');

  blocks.forEach((block) => {
    switch (block.type) {
      case 'heading':
        usedComponents.add('Heading');
        break;
      case 'text':
        usedComponents.add('Text');
        break;
      case 'button':
        usedComponents.add('Button');
        break;
      case 'link':
        usedComponents.add('Link');
        break;
      case 'divider':
        usedComponents.add('Hr');
        break;
      case 'image':
        usedComponents.add('Img');
        break;
    }
  });

  const componentsArray = Array.from(usedComponents).sort();
  return `import { ${componentsArray.join(', ')} } from '@react-email/components';`;
}

function generateComponentBody(blocks: EmailBlockType[], canvasStyles: CanvasStyles): string {
  const containerStyles = {
    maxWidth: canvasStyles.maxWidth,
    backgroundColor: canvasStyles.backgroundColor,
    padding: canvasStyles.padding,
    fontFamily: canvasStyles.fontFamily,
    margin: '0 auto',
  };

  const containerStylesString = formatStyles(containerStyles);
  const blocksCode = blocks.map((block) => generateBlockCode(block)).join('\n');

  return `<Container style={${containerStylesString}}>
${blocksCode}
</Container>`;
}

function generateBlockCode(block: EmailBlockType): string {
  switch (block.type) {
    case 'heading':
      const headingStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight,
        color: block.color,
        backgroundColor:
          block.backgroundColor !== 'transparent' ? block.backgroundColor : undefined,
        border:
          block.borderWidth !== '0px'
            ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}`
            : undefined,
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textDecoration: block.textDecoration !== 'none' ? block.textDecoration : undefined,
        textAlign: block.textAlign,
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
      };

      return `<Heading as="h1" style={${formatStyles(headingStyles)}}>${block.content}</Heading>`;

    case 'text':
      const textStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight,
        color: block.color,
        backgroundColor:
          block.backgroundColor !== 'transparent' ? block.backgroundColor : undefined,
        border:
          block.borderWidth !== '0px'
            ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}`
            : undefined,
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textDecoration: block.textDecoration !== 'none' ? block.textDecoration : undefined,
        textAlign: block.textAlign,
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
      };

      return `<Text style={${formatStyles(textStyles)}}>${block.content}</Text>`;

    case 'button':
      const buttonStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight,
        color: block.color,
        backgroundColor: block.backgroundColor,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textAlign: block.textAlign,
        textDecoration: block.textDecoration !== 'none' ? block.textDecoration : undefined,
        border:
          block.borderWidth !== '0px'
            ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}`
            : 'none',
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
      };

      return `<Button href="${block.href}" style={${formatStyles(buttonStyles)}}>${block.content}</Button>`;

    case 'link':
      const linkStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight,
        color: block.color,
        backgroundColor:
          block.backgroundColor !== 'transparent' ? block.backgroundColor : undefined,
        border:
          block.borderWidth !== '0px'
            ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}`
            : undefined,
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textAlign: block.textAlign,
        textDecoration: block.textDecoration,
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
      };

      return `<Link href="${block.href}" style={${formatStyles(linkStyles)}}>${block.content}</Link>`;

    case 'divider':
      const dividerStyles = {
        width: block.width,
        height: block.height,
        border:
          block.borderWidth !== '0px'
            ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}`
            : 'none',
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
      };

      return `<Hr style={${formatStyles(dividerStyles)}} />`;

    case 'image':
      const imageStyles = {
        width: block.width,
        height: block.height,
        border:
          block.borderWidth !== '0px'
            ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}`
            : 'none',
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        marginTop: block.marginTop,
        marginRight: block.marginRight,
        marginBottom: block.marginBottom,
        marginLeft: block.marginLeft,
        paddingTop: block.paddingTop,
        paddingRight: block.paddingRight,
        paddingBottom: block.paddingBottom,
        paddingLeft: block.paddingLeft,
      };

      return `<Img src="${block.src}" alt="${block.alt}" style={${formatStyles(imageStyles)}} />`;

    default:
      return `<!-- Unknown block type: ${(block as EmailBlockType).type} -->`;
  }
}

function formatStyles(styles: Record<string, unknown>): string {
  // Remove undefined values
  const cleanStyles = Object.fromEntries(
    Object.entries(styles).filter(([, value]) => value !== undefined)
  );

  // Convert to simple object string format
  const styleEntries = Object.entries(cleanStyles).map(([key, value]) => {
    return `${key}: '${value}'`;
  });

  if (styleEntries.length === 0) {
    return '{}';
  }

  return `{ ${styleEntries.join(', ')} }`;
}

type Parser = 'babel' | 'typescript' | 'html';

export async function formatCode(code: string, parser: Parser) {
  try {
    const formattedCode = await prettierFormatCode(code, {
      parser: 'babel',
      plugins: [prettierPluginBabel, prettierPluginEstree], // 👈 must include
    });
    return formattedCode;
  } catch (err) {
    console.error('Formatting error:', err);
    return code;
  }
}
