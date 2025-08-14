'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CanvasControlsProps {
  canvasStyles: {
    maxWidth: string;
    backgroundColor: string;
    padding: string;
    fontFamily: string;
  };
  onUpdate: (property: string, value: string) => void;
}

export const CanvasControls = ({ canvasStyles, onUpdate }: CanvasControlsProps) => {
  const maxWidthPresets = [
    { value: '600px', label: '600px (Standard)' },
    { value: '640px', label: '640px (Wide)' },
    { value: '100%', label: '100% (Full Width)' },
    { value: '480px', label: '480px (Mobile)' },
  ];

  const fontFamilyOptions = [
    { value: 'Inter, system-ui, -apple-system, sans-serif', label: 'Inter' },
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'Times New Roman, serif', label: 'Times New Roman' },
    { value: 'Helvetica, Arial, sans-serif', label: 'Helvetica' },
    { value: 'Verdana, sans-serif', label: 'Verdana' },
    { value: 'system-ui, -apple-system, sans-serif', label: 'System UI' },
  ];

  return (
    <div className="space-y-4">
      <div className="border-b pb-2">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Canvas Settings
        </div>
        <div className="text-sm text-foreground mt-1">
          Page Layout & Defaults
        </div>
      </div>
      
      {/* Layout Settings */}
      <div className="space-y-3">
        <Label className="text-xs font-medium">Layout</Label>
        
        <div className="space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">Max Width</Label>
            <div className="flex items-center gap-2 mt-1">
              <Select
                value={canvasStyles.maxWidth}
                onValueChange={(value) => onUpdate('maxWidth', value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {maxWidthPresets.map(preset => (
                    <SelectItem key={preset.value} value={preset.value}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="text"
                value={canvasStyles.maxWidth}
                onChange={(e) => onUpdate('maxWidth', e.target.value)}
                className="h-8 w-20 text-xs font-mono"
                placeholder="600px"
              />
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground">Container Padding</Label>
            <Input
              type="text"
              value={canvasStyles.padding}
              onChange={(e) => onUpdate('padding', e.target.value)}
              className="h-8 text-xs mt-1"
              placeholder="20px"
            />
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="space-y-3">
        <Label className="text-xs font-medium">Background</Label>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Background Color</Label>
          <div className="flex items-center gap-2">
            <Input
              type="color"
              value={canvasStyles.backgroundColor}
              onChange={(e) => onUpdate('backgroundColor', e.target.value)}
              className="h-8 w-12 p-1 cursor-pointer"
            />
            <Input
              type="text"
              value={canvasStyles.backgroundColor}
              onChange={(e) => onUpdate('backgroundColor', e.target.value)}
              className="h-8 flex-1 text-xs font-mono"
              placeholder="#ffffff"
            />
          </div>
        </div>
      </div>

      {/* Default Font */}
      <div className="space-y-3">
        <Label className="text-xs font-medium">Default Font</Label>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Font Family</Label>
          <Select
            value={canvasStyles.fontFamily}
            onValueChange={(value) => onUpdate('fontFamily', value)}
          >
            <SelectTrigger className="h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {fontFamilyOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};