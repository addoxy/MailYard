'use client';

import { useAtom } from 'jotai';
import { emailBlocksAtom } from '../atoms';
import { EmailBlockType } from '../components/email-blocks/types';

type PropertyValue = string | number | boolean;

interface BulkEditResult {
  hasMultipleValues: boolean;
  commonValue?: PropertyValue;
  mixedValue?: string;
}

export function useBulkEditing() {
  const [emailBlocks, setEmailBlocks] = useAtom(emailBlocksAtom);

  const getCommonProperty = (blockIds: string[], property: string): BulkEditResult => {
    if (blockIds.length === 0) {
      return { hasMultipleValues: false };
    }

    if (blockIds.length === 1) {
      const block = emailBlocks.find(b => b.id === blockIds[0]);
      return {
        hasMultipleValues: false,
        commonValue: block ? (block as unknown as Record<string, PropertyValue>)[property] : undefined
      };
    }

    const selectedBlocks = emailBlocks.filter(block => blockIds.includes(block.id));
    const values = selectedBlocks.map(block => (block as unknown as Record<string, PropertyValue>)[property]);
    const uniqueValues = [...new Set(values)];

    if (uniqueValues.length === 1) {
      return {
        hasMultipleValues: false,
        commonValue: uniqueValues[0]
      };
    }

    return {
      hasMultipleValues: true,
      mixedValue: 'Mixed'
    };
  };

  const updateBulkProperty = (blockIds: string[], property: string, value: PropertyValue) => {
    setEmailBlocks(blocks =>
      blocks.map(block =>
        blockIds.includes(block.id)
          ? { ...block, [property]: value } as EmailBlockType
          : block
      )
    );
  };

  const getCompatibleBlocks = (blockIds: string[]): EmailBlockType[] => {
    return emailBlocks.filter(block => blockIds.includes(block.id));
  };

  const getCommonBlockTypes = (blockIds: string[]): string[] => {
    const selectedBlocks = getCompatibleBlocks(blockIds);
    const types = selectedBlocks.map(block => block.type);
    return [...new Set(types)];
  };

  const canEditProperty = (blockIds: string[], property: string): boolean => {
    const blockTypes = getCommonBlockTypes(blockIds);
    
    // Define which properties are available for which block types
    const propertyCompatibility: Record<string, string[]> = {
      content: ['heading', 'text', 'button', 'link'],
      color: ['heading', 'text', 'button', 'link', 'container'],
      backgroundColor: ['button', 'container'],
      fontSize: ['heading', 'text', 'button', 'link'],
      fontWeight: ['heading', 'text', 'button', 'link'],
      textAlign: ['heading', 'text', 'button', 'link'],
      textDecoration: ['text', 'link'],
      href: ['button', 'link'],
      paddingTop: ['heading', 'text', 'button', 'link', 'container', 'divider'],
      paddingBottom: ['heading', 'text', 'button', 'link', 'container', 'divider'],
      paddingLeft: ['heading', 'text', 'button', 'link', 'container', 'divider'],
      paddingRight: ['heading', 'text', 'button', 'link', 'container', 'divider'],
      marginTop: ['heading', 'text', 'button', 'link', 'container', 'divider'],
      marginBottom: ['heading', 'text', 'button', 'link', 'container', 'divider'],
      borderColor: ['button', 'container', 'divider'],
      borderWidth: ['button', 'container', 'divider'],
      borderStyle: ['button', 'container', 'divider'],
      borderRadius: ['button', 'container']
    };

    const compatibleTypes = propertyCompatibility[property];
    if (!compatibleTypes) return false;

    // All selected block types must support this property
    return blockTypes.every(type => compatibleTypes.includes(type));
  };

  const getEditableProperties = (blockIds: string[]): string[] => {
    const blockTypes = getCommonBlockTypes(blockIds);
    
    if (blockTypes.length === 0) return [];
    
    // If all blocks are the same type, return all properties for that type
    if (blockTypes.length === 1) {
      const type = blockTypes[0];
      switch (type) {
        case 'heading':
        case 'text':
          return ['content', 'color', 'fontSize', 'fontWeight', 'textAlign', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom'];
        case 'button':
          return ['content', 'href', 'color', 'backgroundColor', 'fontSize', 'fontWeight', 'textAlign', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom', 'borderColor', 'borderWidth', 'borderStyle', 'borderRadius'];
        case 'link':
          return ['content', 'href', 'color', 'fontSize', 'fontWeight', 'textAlign', 'textDecoration', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom'];
        case 'container':
          return ['color', 'backgroundColor', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom', 'borderColor', 'borderWidth', 'borderStyle', 'borderRadius'];
        case 'divider':
          return ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom', 'borderColor', 'borderWidth', 'borderStyle'];
        default:
          return [];
      }
    }

    // For mixed types, return only common properties
    const allProperties = ['content', 'color', 'backgroundColor', 'fontSize', 'fontWeight', 'textAlign', 'textDecoration', 'href', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom', 'borderColor', 'borderWidth', 'borderStyle', 'borderRadius'];
    
    return allProperties.filter(prop => canEditProperty(blockIds, prop));
  };

  return {
    getCommonProperty,
    updateBulkProperty,
    getCompatibleBlocks,
    getCommonBlockTypes,
    canEditProperty,
    getEditableProperties
  };
}