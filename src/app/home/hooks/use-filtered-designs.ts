'use client';

import { useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { activeFilterAtom, searchQueryAtom, sortOrderAtom } from '../atoms';
import { Design } from './use-design-data';

export type SortOrder =
  | 'name-asc'
  | 'name-desc'
  | 'modified-desc'
  | 'modified-asc'
  | 'created-desc'
  | 'created-asc';

export type FilterType = 'all' | 'recent' | 'favorites' | 'trash';

function sortDesigns(designs: Design[], sortOrder: SortOrder): Design[] {
  const sorted = [...designs];

  switch (sortOrder) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case 'modified-desc':
      return sorted.sort((a, b) => b.lastModifiedTimestamp - a.lastModifiedTimestamp);

    case 'modified-asc':
      return sorted.sort((a, b) => a.lastModifiedTimestamp - b.lastModifiedTimestamp);

    case 'created-desc':
      return sorted.sort((a, b) => b.dateCreatedTimestamp - a.dateCreatedTimestamp);

    case 'created-asc':
      return sorted.sort((a, b) => a.dateCreatedTimestamp - b.dateCreatedTimestamp);

    default:
      return sorted;
  }
}

function filterDesignsByCategory(designs: Design[], filterType: FilterType): Design[] {
  const now = Date.now();
  const weekInMs = 7 * 24 * 60 * 60 * 1000;

  switch (filterType) {
    case 'all':
      return designs.filter((design) => !design.isDeleted);

    case 'recent':
      return designs.filter(
        (design) => !design.isDeleted && now - design.lastModifiedTimestamp < weekInMs
      );

    case 'favorites':
      return designs.filter((design) => !design.isDeleted && design.isFavorite);

    case 'trash':
      return designs.filter((design) => design.isDeleted);

    default:
      return designs.filter((design) => !design.isDeleted);
  }
}

function searchDesigns(designs: Design[], query: string): Design[] {
  if (!query.trim()) {
    return designs;
  }
  const searchTerm = query.toLowerCase().trim();
  return designs.filter((design) => design.name.toLowerCase().includes(searchTerm));
}

export function useFilteredDesigns(designs: Design[]) {
  const searchQuery = useAtomValue(searchQueryAtom);
  const sortOrder = useAtomValue(sortOrderAtom);
  const activeFilter = useAtomValue(activeFilterAtom);

  const filteredDesigns = useMemo(() => {
    let filtered = filterDesignsByCategory(designs, activeFilter);
    filtered = searchDesigns(filtered, searchQuery);
    filtered = sortDesigns(filtered, sortOrder);
    return filtered;
  }, [designs, searchQuery, sortOrder, activeFilter]);

  const getCounts = useMemo(() => {
    return {
      all: designs.filter((d) => !d.isDeleted).length,
      recent: designs.filter((d) => {
        const weekInMs = 7 * 24 * 60 * 60 * 1000;
        return !d.isDeleted && Date.now() - d.lastModifiedTimestamp < weekInMs;
      }).length,
      favorites: designs.filter((d) => !d.isDeleted && d.isFavorite).length,
      trash: designs.filter((d) => d.isDeleted).length,
    };
  }, [designs]);

  return {
    filteredDesigns,
    counts: getCounts,
    totalResults: filteredDesigns.length,
    hasActiveFilters: searchQuery.trim() !== '' || activeFilter !== 'all',
  };
}
