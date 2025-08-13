'use client';

import { atom } from 'jotai';
import { SortOrder, FilterType } from './hooks/use-design-filters';

// Search and filtering atoms
export const searchQueryAtom = atom<string>('');

export const sortOrderAtom = atom<SortOrder>('modified-desc');

export const activeFilterAtom = atom<FilterType>('all');

export const viewModeAtom = atom<'grid' | 'list'>('grid');

// Selection atoms (for potential multi-select functionality)
export const selectedDesignIdsAtom = atom<string[]>([]);

// UI state atoms
export const sidebarCollapsedAtom = atom<boolean>(false);

export const showAdvancedFiltersAtom = atom<boolean>(false);

// Derived atoms
export const hasActiveSearchAtom = atom(
  (get) => get(searchQueryAtom).trim() !== ''
);

export const isDefaultViewAtom = atom(
  (get) => {
    const searchQuery = get(searchQueryAtom);
    const activeFilter = get(activeFilterAtom);
    const sortOrder = get(sortOrderAtom);
    
    return searchQuery === '' && 
           activeFilter === 'all' && 
           sortOrder === 'modified-desc';
  }
);

// Action atoms (for complex state updates)
export const clearAllFiltersAtom = atom(
  null,
  (get, set) => {
    set(searchQueryAtom, '');
    set(activeFilterAtom, 'all');
    set(sortOrderAtom, 'modified-desc');
    set(selectedDesignIdsAtom, []);
  }
);

export const toggleDesignSelectionAtom = atom(
  null,
  (get, set, designId: string) => {
    const currentSelection = get(selectedDesignIdsAtom);
    
    if (currentSelection.includes(designId)) {
      set(selectedDesignIdsAtom, currentSelection.filter(id => id !== designId));
    } else {
      set(selectedDesignIdsAtom, [...currentSelection, designId]);
    }
  }
);

export const selectAllDesignsAtom = atom(
  null,
  (get, set, designIds: string[]) => {
    set(selectedDesignIdsAtom, designIds);
  }
);

export const clearSelectionAtom = atom(
  null,
  (get, set) => {
    set(selectedDesignIdsAtom, []);
  }
);