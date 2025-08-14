import { atom } from 'jotai';
import { EmailBlockType } from './components/email-blocks/types';

type InspectorView = 'style' | 'ai';
type DeviceView = 'desktop' | 'mobile';

interface CanvasStyles {
  maxWidth: string;
  backgroundColor: string;
  padding: string;
  fontFamily: string;
}

export const inspectorViewAtom = atom<InspectorView>('style');
export const deviceViewAtom = atom<DeviceView>('desktop');
export const emailBlocksAtom = atom<EmailBlockType[]>([]);
export const selectedBlockIdAtom = atom<string | null>(null);
export const selectedBlockIdsAtom = atom<string[]>([]);
export const canvasStylesAtom = atom<CanvasStyles>({
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  padding: '20px',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
});
