import { atom } from 'jotai';

type InspectorView = 'style' | 'ai';
type DeviceView = 'desktop' | 'mobile';

export const inspectorViewAtom = atom<InspectorView>('style');
export const deviceViewAtom = atom<DeviceView>('desktop');
