import { atom } from 'jotai';
import { EmailBlockType } from './components/email-blocks/types';

type InspectorView = 'style' | 'ai';
type DeviceView = 'desktop' | 'mobile';

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

export const inspectorViewAtom = atom<InspectorView>('style');
export const deviceViewAtom = atom<DeviceView>('desktop');
export const emailBlocksAtom = atom<EmailBlockType[]>([]);
export const selectedBlockIdAtom = atom<string | null>(null);
export const selectedBlockIdsAtom = atom<string[]>([]);
export const canvasStylesAtom = atom<CanvasStyles>({
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  paddingTop: '32px',
  paddingRight: '32px',
  paddingBottom: '32px',
  paddingLeft: '32px',
  marginTop: '0px',
  marginBottom: '0px',
  borderWidth: '0px',
  borderStyle: 'solid',
  borderColor: '#cccccc',
  borderRadius: '8px',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
});

// Clipboard for copy/paste functionality
export const clipboardAtom = atom<EmailBlockType[]>([]);
