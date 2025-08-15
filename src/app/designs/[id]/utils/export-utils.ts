import { EmailBlockType } from '../components/email-blocks/types';

interface CanvasStyles {
  maxWidth: string;
  backgroundColor: string;
  padding: string;
  fontFamily: string;
}

export function generateEmailComponent(blocks: EmailBlockType[], canvasStyles: CanvasStyles): string {
  const imports = generateImports(blocks);
  const componentCode = generateComponentBody(blocks, canvasStyles);
  
  const code = `${imports}

export default function EmailTemplate() {
  return (
${componentCode}
  );
}`;

  // Simple browser-compatible formatting
  return formatCode(code);
}

function generateImports(blocks: EmailBlockType[]): string {
  const usedComponents = new Set<string>();
  
  // Add container by default for wrapper
  usedComponents.add('Container');
  
  blocks.forEach(block => {
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
    margin: '0 auto'
  };
  
  const containerStylesString = formatStyles(containerStyles);
  
  const blocksCode = blocks.map(block => generateBlockCode(block)).join('\n');
  
  return `    <Container style={${containerStylesString}}>
${blocksCode}
    </Container>`;
}

function generateBlockCode(block: EmailBlockType): string {
  const indent = '      ';
  
  switch (block.type) {
    case 'heading':
      const headingStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight,
        color: block.color,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textAlign: block.textAlign,
        margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
        padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
      };
      
      return `${indent}<Heading as="h${block.level}" style={${formatStyles(headingStyles)}}>
${indent}  ${block.content}
${indent}</Heading>`;
      
    case 'text':
      const textStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight,
        color: block.color,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textAlign: block.textAlign,
        margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
        padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
      };
      
      return `${indent}<Text style={${formatStyles(textStyles)}}>
${indent}  ${block.content}
${indent}</Text>`;
      
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
        textDecoration: 'none',
        border: block.borderWidth !== '0px' ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}` : 'none',
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
        padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
      };
      
      return `${indent}<Button href="${block.href}" style={${formatStyles(buttonStyles)}}>
${indent}  ${block.content}
${indent}</Button>`;
      
    case 'link':
      const linkStyles = {
        fontSize: block.fontSize,
        fontWeight: block.fontWeight,
        color: block.color,
        fontFamily: block.fontFamily === 'inherit' ? undefined : block.fontFamily,
        lineHeight: block.lineHeight,
        letterSpacing: block.letterSpacing !== '0px' ? block.letterSpacing : undefined,
        textAlign: block.textAlign,
        textDecoration: block.textDecoration,
        margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
        padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
      };
      
      return `${indent}<Link href="${block.href}" style={${formatStyles(linkStyles)}}>
${indent}  ${block.content}
${indent}</Link>`;
      
    case 'divider':
      const dividerStyles = {
        width: block.width,
        height: block.height,
        border: block.borderWidth !== '0px' ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}` : 'none',
        margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
      };
      
      return `${indent}<Hr style={${formatStyles(dividerStyles)}} />`;
      
    case 'image':
      const imageStyles = {
        width: block.width,
        height: block.height,
        border: block.borderWidth !== '0px' ? `${block.borderWidth} ${block.borderStyle} ${block.borderColor}` : 'none',
        borderRadius: block.borderRadius !== '0px' ? block.borderRadius : undefined,
        margin: `${block.marginTop} ${block.marginRight} ${block.marginBottom} ${block.marginLeft}`,
        padding: `${block.paddingTop} ${block.paddingRight} ${block.paddingBottom} ${block.paddingLeft}`,
      };
      
      return `${indent}<Img src="${block.src}" alt="${block.alt}" style={${formatStyles(imageStyles)}} />`;
      
    default:
      return `${indent}<!-- Unknown block type: ${(block as EmailBlockType).type} -->`;
  }
}

function formatStyles(styles: Record<string, unknown>): string {
  // Remove undefined values
  const cleanStyles = Object.fromEntries(
    Object.entries(styles).filter(([, value]) => value !== undefined)
  );
  
  // Convert to string format
  const styleEntries = Object.entries(cleanStyles).map(([key, value]) => {
    return `    ${key}: '${value}'`;
  });
  
  if (styleEntries.length === 0) {
    return '{}';
  }
  
  return `{
${styleEntries.join(',\n')}
  }`;
}

function formatCode(code: string): string {
  // Simple code formatter for better readability
  const lines = code.split('\n');
  let indentLevel = 0;
  const formattedLines: string[] = [];
  
  for (let line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines but preserve them
    if (trimmedLine === '') {
      formattedLines.push('');
      continue;
    }
    
    // Decrease indent for closing brackets/braces
    if (trimmedLine.startsWith('}') || trimmedLine.startsWith(')') || trimmedLine.startsWith('</')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    
    // Add current line with proper indentation
    const indent = '  '.repeat(indentLevel);
    formattedLines.push(indent + trimmedLine);
    
    // Increase indent for opening brackets/braces
    if (trimmedLine.endsWith('{') || trimmedLine.endsWith('(') || 
        (trimmedLine.startsWith('<') && !trimmedLine.endsWith('/>') && !trimmedLine.includes('</'))) {
      indentLevel++;
    }
    
    // Special handling for JSX self-closing tags and other patterns
    if (trimmedLine.includes('return (')) {
      indentLevel++;
    }
  }
  
  return formattedLines.join('\n');
}