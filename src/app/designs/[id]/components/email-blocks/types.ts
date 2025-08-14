export interface BaseBlockProps {
  id: string;
  type: string;
  isSelected?: boolean;
  onClick?: (id: string) => void;
}

export interface HeadingBlockProps extends BaseBlockProps {
  type: 'heading';
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign: 'left' | 'center' | 'right';
  fontSize: string;
  fontWeight: string;
  color: string;
  fontFamily: string;
  lineHeight: string;
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
  fontFamily: string;
  lineHeight: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
}

export interface ContainerBlockProps extends BaseBlockProps {
  type: 'container';
  backgroundColor: string;
  borderWidth: string;
  borderColor: string;
  borderStyle: 'solid' | 'dashed' | 'dotted' | 'none';
  borderRadius: string;
  width: string;
  height: string;
  marginTop: string;
  marginBottom: string;
  marginLeft: string;
  marginRight: string;
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  children?: EmailBlockType[];
}

export type EmailBlockType = HeadingBlockProps | TextBlockProps | ContainerBlockProps;

export interface BlockDefinition {
  type: string;
  name: string;
  icon: string;
  description: string;
  defaultProps: Partial<EmailBlockType>;
  category: 'basic' | 'layout' | 'content' | 'media';
}