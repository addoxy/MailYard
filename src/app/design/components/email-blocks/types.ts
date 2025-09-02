export interface BaseBlockProps {
  id: string;
  type: string;
  isSelected?: boolean;
  onClick?: (id: string) => void;
}

export interface HeadingBlockProps extends BaseBlockProps {
  type: 'heading';
  content: string;
  textAlign: 'left' | 'center' | 'right';
  fontSize: string;
  fontWeight: string;
  color: string;
  backgroundColor?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius?: string;
  fontFamily: string;
  lineHeight: string;
  letterSpacing: string;
  textDecoration?: 'none' | 'underline' | 'line-through';
  width: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}

export interface TextBlockProps extends BaseBlockProps {
  type: 'text';
  content: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  fontSize: string;
  fontWeight: string;
  color: string;
  backgroundColor?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius?: string;
  fontFamily: string;
  lineHeight: string;
  letterSpacing: string;
  textDecoration?: 'none' | 'underline' | 'line-through';
  width: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}

export interface ButtonBlockProps extends BaseBlockProps {
  type: 'button';
  content: string;
  href: string;
  textAlign: 'left' | 'center' | 'right';
  fontSize: string;
  fontWeight: string;
  color: string;
  backgroundColor: string;
  borderWidth: string;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius: string;
  fontFamily: string;
  lineHeight: string;
  letterSpacing: string;
  textDecoration?: 'none' | 'underline' | 'line-through';
  width: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}

export interface LinkBlockProps extends BaseBlockProps {
  type: 'link';
  content: string;
  href: string;
  textAlign: 'left' | 'center' | 'right';
  fontSize: string;
  fontWeight: string;
  color: string;
  backgroundColor?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius?: string;
  fontFamily: string;
  lineHeight: string;
  letterSpacing: string;
  textDecoration: 'none' | 'underline' | 'line-through';
  width: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}

export interface DividerBlockProps extends BaseBlockProps {
  type: 'divider';
  width: string;
  height: string;
  borderWidth: string;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
}

export interface ImageBlockProps extends BaseBlockProps {
  type: 'image';
  src: string;
  alt: string;
  width: string;
  height: string;
  textAlign: 'left' | 'center' | 'right';
  borderWidth: string;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}

export type EmailBlockType =
  | HeadingBlockProps
  | TextBlockProps
  | ButtonBlockProps
  | LinkBlockProps
  | DividerBlockProps
  | ImageBlockProps;

export interface BlockDefinition {
  type: string;
  name: string;
  icon: string;
  description: string;
  category: 'basic' | 'layout' | 'content' | 'media';
}
