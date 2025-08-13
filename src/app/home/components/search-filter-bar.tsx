'use client';

import { AtomicTooltip } from '@/components/atomic-tooltip';
import { SearchBar } from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAtom } from 'jotai';
import { Grid3X3, List } from 'lucide-react';
import { searchQueryAtom, sortOrderAtom, viewModeAtom } from '../atoms';
import { SortOrder } from '../hooks/use-design-filters';

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'modified-desc', label: 'Last Modified (Newest)' },
  { value: 'modified-asc', label: 'Last Modified (Oldest)' },
  { value: 'created-desc', label: 'Date Created (Newest)' },
  { value: 'created-asc', label: 'Date Created (Oldest)' },
];

export function SearchFilterBar() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [viewMode, setViewMode] = useAtom(viewModeAtom);

  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-lg font-semibold">All Designs</h1>

      <div className="flex items-center gap-3">
        <SearchBar
          placeholder="Search designs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-96 pr-4 pl-9"
        />
        <div className="flex items-center gap-2">
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
            <SelectTrigger className="gap-4 text-left">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center rounded-md border p-1">
          <AtomicTooltip content="Grid view">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-7 w-7 p-0"
            >
              <Grid3X3 className="h-3 w-3" />
            </Button>
          </AtomicTooltip>

          <AtomicTooltip content="List view">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-7 w-7 p-0"
            >
              <List className="h-3 w-3" />
            </Button>
          </AtomicTooltip>
        </div>
      </div>
    </div>
  );
}
