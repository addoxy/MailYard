import { atom } from 'jotai';
import { EmailBlockType } from './components/email-blocks/types';

type InspectorView = 'style' | 'ai';
type DeviceView = 'desktop' | 'mobile';

export const inspectorViewAtom = atom<InspectorView>('style');
export const deviceViewAtom = atom<DeviceView>('desktop');
export const emailBlocksAtom = atom<EmailBlockType[]>([]);
export const selectedBlockIdAtom = atom<string | null>(null);
