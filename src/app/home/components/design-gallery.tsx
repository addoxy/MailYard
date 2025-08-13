'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDesignData } from '../hooks/use-design-data';
import { useDesignFilters } from '../hooks/use-design-filters';

export function DesignGallery() {
  const { designs, isLoading } = useDesignData();
  const { filteredDesigns } = useDesignFilters(designs);
  const router = useRouter();
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

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
