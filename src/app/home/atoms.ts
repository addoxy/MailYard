'use client';

import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { FilterType, SortOrder } from './hooks/use-filtered-designs';

export const searchQueryAtom = atom<string>('');
export const sortOrderAtom = atom<SortOrder>('modified-desc');
export const activeFilterAtom = atom<FilterType>('all');

export const viewModeAtom = atomWithStorage<'grid' | 'list'>('home-view-mode', 'grid');
export const viewModeHydratedAtom = atom<boolean>(false);
