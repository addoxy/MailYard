'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAtom } from 'jotai';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { viewModeAtom } from '../atoms';
import { useDesignData } from '../hooks/use-design-data';
import { useDesignFilters } from '../hooks/use-design-filters';

export function DesignGallery() {
  const { designs, isLoading } = useDesignData();
  const { filteredDesigns } = useDesignFilters(designs);
  const router = useRouter();
  const [viewMode] = useAtom(viewModeAtom);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleDesignClick = (designId: string) => {
    if (isMobile) {
      // On mobile, open preview modal (for now just go to design page, can be updated later)
      router.push(`/designs/${designId}`);
    } else {
      router.push(`/designs/${designId}`);
    }
  };

  if (isLoading) {
    if (viewMode === 'grid') {
      return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Card key={index} className="h-80 animate-pulse">
              <CardContent className="p-0">
                <div className="bg-muted aspect-[4/3] rounded-t-lg" />
              </CardContent>
              <CardFooter className="p-4">
                <div className="w-full space-y-2">
                  <div className="bg-muted h-4 w-3/4 rounded" />
                  <div className="bg-muted h-3 w-1/2 rounded" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-muted-foreground grid grid-cols-12 gap-4 border-b pb-3 text-sm font-medium">
          <div className="col-span-6">Name</div>
          <div className="col-span-3">Last Updated</div>
          <div className="col-span-3">Created</div>
        </div>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="grid animate-pulse grid-cols-12 gap-4 py-3">
            <div className="col-span-6 flex items-center gap-3">
              <div className="bg-muted h-12 w-12 rounded" />
              <div className="bg-muted h-4 w-48 rounded" />
            </div>
            <div className="col-span-3 flex items-center">
              <div className="bg-muted h-3 w-16 rounded" />
            </div>
            <div className="col-span-3 flex items-center">
              <div className="bg-muted h-3 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredDesigns.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-muted-foreground mb-2 text-lg">No designs found</div>
        <div className="text-muted-foreground text-sm">
          Try adjusting your search or filter criteria
        </div>
      </div>
    );
  }

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDesigns.map((design) => (
          <Card
            key={design.id}
            className="group hover:border-input cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg"
            onClick={() => handleDesignClick(design.id)}
          >
            <CardContent className="p-0">
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
                {design.thumbnail ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={design.thumbnail}
                      alt={design.name}
                      className="h-full w-full object-cover"
                    />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-2xl font-bold text-blue-400">
                    {design.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-1.5 p-3">
              <div className="w-full">
                <h3 className="group-hover:text-primary line-clamp-2 text-sm font-medium transition-colors">
                  {design.name}
                </h3>
              </div>
              <div className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs">
                <Calendar className="h-3 w-3" />
                <span>{design.lastModified}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="text-muted-foreground border-b-border/50 bg-sidebar sticky top-0 right-0 left-0 z-10 grid grid-cols-12 gap-4 border-b p-6 text-sm font-medium">
        <div className="text-muted-foreground col-span-6 text-xs">Name</div>
        <div className="text-muted-foreground col-span-3 text-xs">Last Updated</div>
        <div className="text-muted-foreground col-span-3 text-xs">Created</div>
      </div>
      <div className="mt-4 mb-4 space-y-2 px-6">
        {filteredDesigns.map((design) => (
          <div
            key={design.id}
            className="group hover:bg-muted/50 -mx-2 grid cursor-pointer grid-cols-12 gap-4 rounded-md p-2 transition-colors duration-200"
            onClick={() => handleDesignClick(design.id)}
          >
            <div className="col-span-6 flex items-center gap-3">
              <div className="relative h-14 w-20 overflow-hidden rounded bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
                {design.thumbnail ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={design.thumbnail}
                      alt={design.name}
                      className="h-full w-full object-cover"
                    />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm font-bold text-blue-400">
                    {design.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h3 className="group-hover:text-primary line-clamp-1 font-medium transition-colors">
                {design.name}
              </h3>
            </div>
            <div className="text-muted-foreground col-span-3 flex items-center text-sm">
              {design.lastModified}
            </div>
            <div className="text-muted-foreground col-span-3 flex items-center text-sm">
              {design.dateCreated}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
