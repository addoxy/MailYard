'use client';

import { Button } from '@/components/ui/button';
import { UserMenu } from '@/components/user-menu';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import { Clock, Home, Plus, Star, Trash2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { activeFilterAtom } from '../atoms';
import { useDesignData } from '../hooks/use-design-data';
import { FilterType, useFilteredDesigns } from '../hooks/use-filtered-designs';

const getNavigationSections = (counts: Record<string, number>) => [
  {
    title: 'Main',
    items: [
      { id: 'recent' as FilterType, label: 'Recent', icon: Clock, count: counts.recent },
      { id: 'favorites' as FilterType, label: 'Favorites', icon: Star, count: counts.favorites },
      { id: 'all' as FilterType, label: 'All Designs', icon: Home, count: counts.all },
    ],
  },
  {
    title: 'Other',
    items: [{ id: 'trash' as FilterType, label: 'Trash', icon: Trash2, count: counts.trash }],
  },
];

export function SidebarNavigation() {
  const [activeFilter, setActiveFilter] = useAtom(activeFilterAtom);
  const { designs } = useDesignData();
  const { counts } = useFilteredDesigns(designs);
  const navigationSections = getNavigationSections(counts);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const filterFromUrl = searchParams.get('filter') as FilterType;
    if (filterFromUrl && ['all', 'recent', 'favorites', 'trash'].includes(filterFromUrl)) {
      setActiveFilter(filterFromUrl);
    }
  }, [searchParams, setActiveFilter]);

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);

    const params = new URLSearchParams(searchParams);
    if (filter === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', filter);
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '/home';
    router.replace(newUrl, { scroll: false });
  };

  return (
    <aside className="h-screen py-2 pl-2">
      <div className="bg-sidebar border-border/40 flex h-full flex-col rounded-lg border">
        <div className="border-border/40 flex h-16 shrink-0 items-center border-b px-4">
          <UserMenu />
        </div>

        <div className="border-border/40 border-b p-4">
          <Button className="w-full">
            <Plus />
            New Design
          </Button>
        </div>

        <div className="flex-1 space-y-6 overflow-auto px-4 py-2">
          {navigationSections.map((section) => (
            <div key={section.title} className="mt-4">
              <h3 className="text-muted-foreground mb-3 text-xs font-medium tracking-wider uppercase">
                {section.title}
              </h3>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeFilter === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleFilterChange(item.id)}
                      className={cn(
                        'flex w-full cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        isActive && 'bg-accent text-accent-foreground font-medium'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.count !== undefined && (
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-xs',
                            isActive
                              ? 'bg-background text-foreground'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
