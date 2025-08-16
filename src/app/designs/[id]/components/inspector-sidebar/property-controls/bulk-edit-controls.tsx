'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useBulkEditing } from '../../../hooks/use-bulk-editing';

interface BulkEditControlsProps {
  selectedBlockIds: string[];
}

export const BulkEditControls = ({ selectedBlockIds }: BulkEditControlsProps) => {
  const {
    getCommonProperty,
    updateBulkProperty,
    getEditableProperties
  } = useBulkEditing();

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
          <div key={property} className="space-y-2">
            <Label className="text-xs font-medium">Content</Label>
            <Input
              value={propertyResult.hasMultipleValues ? '' : (displayValue as string || '')}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={propertyResult.hasMultipleValues ? 'Mixed content...' : 'Enter text content...'}
              className={propertyResult.hasMultipleValues ? 'text-muted-foreground' : ''}
            />
            {propertyResult.hasMultipleValues && (
              <div className="text-xs text-muted-foreground">
                Multiple values - editing will replace all
              </div>
            )}
          </div>
        );

      case 'color':
        return (
          <div key={property} className="space-y-2">
            <Label className="text-xs font-medium">Text Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={propertyResult.hasMultipleValues ? '#000000' : (displayValue as string || '#000000')}
                onChange={(e) => handleChange(e.target.value)}
                className="w-12 h-8 p-1 border rounded"
              />
              <Input
                value={propertyResult.hasMultipleValues ? 'Mixed' : (displayValue as string || '')}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Color value"
                className={propertyResult.hasMultipleValues ? 'text-muted-foreground flex-1' : 'flex-1'}
                readOnly={propertyResult.hasMultipleValues}
              />
            </div>
          </div>
        );

      case 'backgroundColor':
        return (
          <div key={property} className="space-y-2">
            <Label className="text-xs font-medium">Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                value={propertyResult.hasMultipleValues ? '#ffffff' : (displayValue as string || '#ffffff')}
                onChange={(e) => handleChange(e.target.value)}
                className="w-12 h-8 p-1 border rounded"
              />
              <Input
                value={propertyResult.hasMultipleValues ? 'Mixed' : (displayValue as string || '')}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Background color"
                className={propertyResult.hasMultipleValues ? 'text-muted-foreground flex-1' : 'flex-1'}
                readOnly={propertyResult.hasMultipleValues}
              />
            </div>
          </div>
        );

      case 'fontSize':
        return (
          <div key={property} className="space-y-2">
            <Label className="text-xs font-medium">Font Size</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={propertyResult.hasMultipleValues ? '' : (parseInt(displayValue as string) || '')}
                onChange={(e) => handleChange(`${e.target.value}px`)}
                placeholder="16"
                className={propertyResult.hasMultipleValues ? 'text-muted-foreground flex-1' : 'flex-1'}
                readOnly={propertyResult.hasMultipleValues}
                min="1"
              />
              <span className="text-xs text-muted-foreground">px</span>
            </div>
            {propertyResult.hasMultipleValues && (
              <div className="text-xs text-muted-foreground">Mixed values</div>
            )}
          </div>
        );

      case 'textAlign':
        return (
          <div key={property} className="space-y-2">
            <Label className="text-xs font-medium">Text Alignment</Label>
            <Select
              value={propertyResult.hasMultipleValues ? 'mixed' : (displayValue as string || 'left')}
              onValueChange={handleChange}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select alignment" />
              </SelectTrigger>
              <SelectContent>
                {propertyResult.hasMultipleValues && (
                  <SelectItem value="mixed" disabled>Mixed values</SelectItem>
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
          <div key={property} className="space-y-2">
            <Label className="text-xs font-medium">Font Weight</Label>
            <Select
              value={propertyResult.hasMultipleValues ? 'mixed' : (displayValue as string || 'normal')}
              onValueChange={handleChange}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                {propertyResult.hasMultipleValues && (
                  <SelectItem value="mixed" disabled>Mixed values</SelectItem>
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
          <div key={property} className="space-y-2">
            <Label className="text-xs font-medium">Link URL</Label>
            <Input
              value={propertyResult.hasMultipleValues ? 'Mixed' : (displayValue as string || '')}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="https://example.com"
              className={propertyResult.hasMultipleValues ? 'text-muted-foreground' : ''}
              readOnly={propertyResult.hasMultipleValues}
            />
          </div>
        );

      default:
        // Handle spacing properties
        if (property.includes('padding') || property.includes('margin')) {
          return (
            <div key={property} className="space-y-2">
              <Label className="text-xs font-medium capitalize">
                {property.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={propertyResult.hasMultipleValues ? '' : (parseInt(displayValue as string) || '')}
                  onChange={(e) => handleChange(`${e.target.value}px`)}
                  placeholder="0"
                  className={propertyResult.hasMultipleValues ? 'text-muted-foreground flex-1' : 'flex-1'}
                  readOnly={propertyResult.hasMultipleValues}
                  min="0"
                />
                <span className="text-xs text-muted-foreground">px</span>
              </div>
              {propertyResult.hasMultipleValues && (
                <div className="text-xs text-muted-foreground">Mixed values</div>
              )}
            </div>
          );
        }

        // Handle border width properties
        if (property === 'borderWidth') {
          return (
            <div key={property} className="space-y-2">
              <Label className="text-xs font-medium">Border Width</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={propertyResult.hasMultipleValues ? '' : (parseInt(displayValue as string) || '')}
                  onChange={(e) => handleChange(`${e.target.value}px`)}
                  placeholder="0"
                  className={propertyResult.hasMultipleValues ? 'text-muted-foreground flex-1' : 'flex-1'}
                  readOnly={propertyResult.hasMultipleValues}
                  min="0"
                />
                <span className="text-xs text-muted-foreground">px</span>
              </div>
              {propertyResult.hasMultipleValues && (
                <div className="text-xs text-muted-foreground">Mixed values</div>
              )}
            </div>
          );
        }

        // Handle border radius properties
        if (property === 'borderRadius') {
          return (
            <div key={property} className="space-y-2">
              <Label className="text-xs font-medium">Border Radius</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={propertyResult.hasMultipleValues ? '' : (parseInt(displayValue as string) || '')}
                  onChange={(e) => handleChange(`${e.target.value}px`)}
                  placeholder="0"
                  className={propertyResult.hasMultipleValues ? 'text-muted-foreground flex-1' : 'flex-1'}
                  readOnly={propertyResult.hasMultipleValues}
                  min="0"
                />
                <span className="text-xs text-muted-foreground">px</span>
              </div>
              {propertyResult.hasMultipleValues && (
                <div className="text-xs text-muted-foreground">Mixed values</div>
              )}
            </div>
          );
        }

        // Handle other border properties
        if (property.includes('border')) {
          return (
            <div key={property} className="space-y-2">
              <Label className="text-xs font-medium capitalize">
                {property.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </Label>
              <Input
                value={propertyResult.hasMultipleValues ? 'Mixed' : (displayValue as string || '')}
                onChange={(e) => handleChange(e.target.value)}
                placeholder={property === 'borderColor' ? '#000000' : 'solid'}
                className={propertyResult.hasMultipleValues ? 'text-muted-foreground' : ''}
                readOnly={propertyResult.hasMultipleValues}
              />
              {propertyResult.hasMultipleValues && (
                <div className="text-xs text-muted-foreground">Mixed values</div>
              )}
            </div>
          );
        }

        return null;
    }
  };

  // Group properties by type
  const textProps = editableProps.filter(prop => 
    ['content', 'color', 'fontSize', 'fontWeight', 'textAlign', 'textDecoration'].includes(prop)
  );
  
  const spacingProps = editableProps.filter(prop => 
    prop.includes('padding') || prop.includes('margin')
  );
  
  const borderProps = editableProps.filter(prop => 
    prop.includes('border')
  );
  
  const backgroundProps = editableProps.filter(prop => 
    ['backgroundColor'].includes(prop)
  );
  
  const linkProps = editableProps.filter(prop => 
    ['href'].includes(prop)
  );

  if (editableProps.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-4">
        No common properties available for bulk editing
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {textProps.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Text Properties
          </div>
          {textProps.map(renderPropertyControl)}
        </div>
      )}

      {linkProps.length > 0 && (
        <>
          {textProps.length > 0 && <Separator />}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Link Properties
            </div>
            {linkProps.map(renderPropertyControl)}
          </div>
        </>
      )}

      {backgroundProps.length > 0 && (
        <>
          {(textProps.length > 0 || linkProps.length > 0) && <Separator />}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Background
            </div>
            {backgroundProps.map(renderPropertyControl)}
          </div>
        </>
      )}

      {spacingProps.length > 0 && (
        <>
          {(textProps.length > 0 || linkProps.length > 0 || backgroundProps.length > 0) && <Separator />}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Spacing
            </div>
            {spacingProps.map(renderPropertyControl)}
          </div>
        </>
      )}

      {borderProps.length > 0 && (
        <>
          {(textProps.length > 0 || linkProps.length > 0 || backgroundProps.length > 0 || spacingProps.length > 0) && <Separator />}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Border
            </div>
            {borderProps.map(renderPropertyControl)}
          </div>
        </>
      )}
    </div>
  );
};