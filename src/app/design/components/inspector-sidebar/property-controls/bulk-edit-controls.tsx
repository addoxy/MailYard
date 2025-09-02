'use client';

import { ClearableNumberInput } from '@/components/clearable-number-input';
import { ColorPicker } from '@/components/color-picker';
import { FieldLabel, SectionLabel } from '@/components/settings-labels';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useBulkEditing } from '../../../hooks/use-bulk-editing';

interface BulkEditControlsProps {
  selectedBlockIds: string[];
}

export const BulkEditControls = ({ selectedBlockIds }: BulkEditControlsProps) => {
  const { getCommonProperty, updateBulkProperty, getEditableProperties } = useBulkEditing();

  const editableProps = getEditableProperties(selectedBlockIds);

  const renderPropertyControl = (property: string) => {
    const propertyResult = getCommonProperty(selectedBlockIds, property);
    const displayValue = propertyResult.hasMultipleValues
      ? propertyResult.mixedValue
      : propertyResult.commonValue;

    const handleChange = (value: string | number) => {
      updateBulkProperty(selectedBlockIds, property, value);
    };

    switch (property) {
      case 'content':
        return (
          <div key={property} className="flex flex-col gap-2">
            <SectionLabel text="Content" />
            <Textarea
              value={propertyResult.hasMultipleValues ? '' : (displayValue as string) || ''}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={
                propertyResult.hasMultipleValues ? 'Mixed content...' : 'Enter text content...'
              }
              className={propertyResult.hasMultipleValues ? 'text-muted-foreground h-8' : 'h-8'}
            />
            {propertyResult.hasMultipleValues && (
              <div className="text-muted-foreground text-xs">
                Multiple values - editing will replace all
              </div>
            )}
          </div>
        );

      case 'color':
        return (
          <div key={property} className="flex flex-col gap-2">
            <FieldLabel text="Text Color" />
            <ColorPicker
              value={
                propertyResult.hasMultipleValues ? '#000000' : (displayValue as string) || '#000000'
              }
              textValue={propertyResult.hasMultipleValues ? 'Mixed' : undefined}
              onChange={handleChange}
              label="Text Color"
              placeholder="#000000"
              textInputProps={{
                className: propertyResult.hasMultipleValues ? 'text-muted-foreground' : '',
                readOnly: propertyResult.hasMultipleValues,
              }}
            />
          </div>
        );

      case 'backgroundColor':
        return (
          <div key={property} className="flex flex-col gap-2">
            <FieldLabel text="Background Color" />
            <ColorPicker
              value={
                propertyResult.hasMultipleValues ? '#ffffff' : (displayValue as string) || '#ffffff'
              }
              textValue={propertyResult.hasMultipleValues ? 'Mixed' : undefined}
              onChange={handleChange}
              label="Background Color"
              placeholder="#ffffff"
              textInputProps={{
                className: propertyResult.hasMultipleValues ? 'text-muted-foreground' : '',
                readOnly: propertyResult.hasMultipleValues,
              }}
            />
          </div>
        );

      case 'fontSize':
        return (
          <div key={property} className="flex flex-col gap-2">
            <FieldLabel text="Font Size" />
            {propertyResult.hasMultipleValues ? (
              <Input value="Mixed" className="text-muted-foreground h-8" readOnly />
            ) : (
              <ClearableNumberInput
                value={parseInt(displayValue as string) || 16}
                onChange={(value) => handleChange(`${value}px`)}
                placeholder="16"
                min={8}
                max={72}
              />
            )}
            {propertyResult.hasMultipleValues && (
              <div className="text-muted-foreground text-xs">Mixed values</div>
            )}
          </div>
        );

      case 'textAlign':
        return (
          <div key={property} className="flex flex-col gap-2">
            <FieldLabel text="Text Alignment" />
            <Select
              value={
                propertyResult.hasMultipleValues ? 'mixed' : (displayValue as string) || 'left'
              }
              onValueChange={handleChange}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                {propertyResult.hasMultipleValues && (
                  <SelectItem value="mixed" disabled>
                    Mixed values
                  </SelectItem>
                )}
                <SelectItem value="left">Left</SelectItem>
                <SelectItem value="center">Center</SelectItem>
                <SelectItem value="right">Right</SelectItem>
                <SelectItem value="justify">Justify</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 'fontWeight':
        return (
          <div key={property} className="flex flex-col gap-2">
            <FieldLabel text="Font Weight" />
            <Select
              value={
                propertyResult.hasMultipleValues ? 'mixed' : (displayValue as string) || 'normal'
              }
              onValueChange={handleChange}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                {propertyResult.hasMultipleValues && (
                  <SelectItem value="mixed" disabled>
                    Mixed values
                  </SelectItem>
                )}
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
                <SelectItem value="lighter">Lighter</SelectItem>
                <SelectItem value="bolder">Bolder</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );

      case 'href':
        return (
          <div key={property} className="flex flex-col gap-2">
            <SectionLabel text="Link URL" />
            <Input
              value={propertyResult.hasMultipleValues ? 'Mixed' : (displayValue as string) || ''}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="https://example.com"
              className={propertyResult.hasMultipleValues ? 'text-muted-foreground h-8' : 'h-8'}
              readOnly={propertyResult.hasMultipleValues}
            />
          </div>
        );

      default:
        // Handle spacing properties
        if (property.includes('padding') || property.includes('margin')) {
          return (
            <div key={property} className="flex flex-col gap-2">
              <FieldLabel
                text={property
                  .replace(/([A-Z])/g, ' $1')
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase())}
              />
              {propertyResult.hasMultipleValues ? (
                <Input value="Mixed" className="text-muted-foreground h-8" readOnly />
              ) : (
                <ClearableNumberInput
                  value={parseInt(displayValue as string) || 0}
                  onChange={(value) => handleChange(`${value}px`)}
                  placeholder="0"
                  min={0}
                />
              )}
              {propertyResult.hasMultipleValues && (
                <div className="text-muted-foreground text-xs">Mixed values</div>
              )}
            </div>
          );
        }

        // Handle border width properties
        if (property === 'borderWidth') {
          return (
            <div key={property} className="flex flex-col gap-2">
              <FieldLabel text="Border Width" />
              {propertyResult.hasMultipleValues ? (
                <Input value="Mixed" className="text-muted-foreground h-8" readOnly />
              ) : (
                <ClearableNumberInput
                  value={parseInt(displayValue as string) || 0}
                  onChange={(value) => handleChange(`${value}px`)}
                  placeholder="0"
                  min={0}
                />
              )}
              {propertyResult.hasMultipleValues && (
                <div className="text-muted-foreground text-xs">Mixed values</div>
              )}
            </div>
          );
        }

        // Handle border radius properties
        if (property === 'borderRadius') {
          return (
            <div key={property} className="flex flex-col gap-2">
              <FieldLabel text="Border Radius" />
              {propertyResult.hasMultipleValues ? (
                <Input value="Mixed" className="text-muted-foreground h-8" readOnly />
              ) : (
                <ClearableNumberInput
                  value={parseInt(displayValue as string) || 0}
                  onChange={(value) => handleChange(`${value}px`)}
                  placeholder="0"
                  min={0}
                />
              )}
              {propertyResult.hasMultipleValues && (
                <div className="text-muted-foreground text-xs">Mixed values</div>
              )}
            </div>
          );
        }

        // Handle width property
        if (property === 'width') {
          return (
            <div key={property} className="flex flex-col gap-2">
              <FieldLabel text="Width (%)" />
              {propertyResult.hasMultipleValues ? (
                <Input value="Mixed" className="text-muted-foreground h-8" readOnly />
              ) : (
                <ClearableNumberInput
                  value={
                    displayValue === 'auto' || displayValue === '100%' 
                      ? 100
                      : parseInt(displayValue as string) || 100
                  }
                  onChange={(value) => handleChange(`${value}%`)}
                  placeholder="100"
                  min={1}
                  max={100}
                />
              )}
              {propertyResult.hasMultipleValues && (
                <div className="text-muted-foreground text-xs">Mixed values</div>
              )}
            </div>
          );
        }

        // Handle other border properties
        if (property.includes('border')) {
          return (
            <div key={property} className="flex flex-col gap-2">
              <FieldLabel
                text={property
                  .replace(/([A-Z])/g, ' $1')
                  .toLowerCase()
                  .replace(/^\w/, (c) => c.toUpperCase())}
              />
              <Input
                value={propertyResult.hasMultipleValues ? 'Mixed' : (displayValue as string) || ''}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={property === 'borderColor' ? '#000000' : 'solid'}
                className={propertyResult.hasMultipleValues ? 'text-muted-foreground h-8' : 'h-8'}
                readOnly={propertyResult.hasMultipleValues}
              />
              {propertyResult.hasMultipleValues && (
                <div className="text-muted-foreground text-xs">Mixed values</div>
              )}
            </div>
          );
        }

        return null;
    }
  };

  // Group properties by type
  const textProps = editableProps.filter((prop) =>
    ['content', 'color', 'fontSize', 'fontWeight', 'textAlign', 'textDecoration'].includes(prop)
  );

  const spacingProps = editableProps.filter(
    (prop) => prop.includes('padding') || prop.includes('margin')
  );

  const borderProps = editableProps.filter((prop) => prop.includes('border'));

  const backgroundProps = editableProps.filter((prop) => ['backgroundColor'].includes(prop));

  const linkProps = editableProps.filter((prop) => ['href'].includes(prop));

  const layoutProps = editableProps.filter((prop) => ['width'].includes(prop));

  if (editableProps.length === 0) {
    return (
      <div className="text-muted-foreground py-4 text-center text-sm">
        No common properties available for bulk editing
      </div>
    );
  }

  // Determine which sections are present and their order
  const sections = [
    { key: 'text', props: textProps, label: 'Text' },
    { key: 'link', props: linkProps, label: 'Link' },
    { key: 'layout', props: layoutProps, label: 'Layout' },
    { key: 'background', props: backgroundProps, label: 'Background' },
    { key: 'spacing', props: spacingProps, label: 'Spacing' },
    { key: 'border', props: borderProps, label: 'Border' },
  ].filter((section) => section.props.length > 0);

  return (
    <div className="flex flex-col gap-6">
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;
        return (
          <div key={section.key} className="flex flex-col gap-4">
            <SectionLabel text={section.label} />
            <div className="flex flex-col gap-4">{section.props.map(renderPropertyControl)}</div>
            {!isLast && <Separator className="mt-2" />}
          </div>
        );
      })}
    </div>
  );
};
