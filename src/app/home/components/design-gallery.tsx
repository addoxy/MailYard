'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useMobile } from '@/hooks/use-mobile';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Design } from '../hooks/use-design-data';
import { useDesignData } from '../hooks/use-design-data';
import { useFilteredDesigns } from '../hooks/use-filtered-designs';
import { useViewMode } from '../hooks/use-view-mode';
import { DesignCard } from './design-card';
import { DesignRow } from './design-row';
import { DeleteConfirmationDialog, EditTitleDialog } from './dialogs';

export function DesignGallery() {
  const { designs, isLoading: isDesignDataLoading, updateDesign, deleteDesign } = useDesignData();
  const { filteredDesigns } = useFilteredDesigns(designs);
  const { viewMode, isLoading: isViewModeLoading } = useViewMode();
  const isMobile = useMobile();
  const router = useRouter();
  const [deletingDesignId, setDeletingDesignId] = useState<string | null>(null);
  const [editingDesign, setEditingDesign] = useState<Design | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const handleDesignClick = (designId: string) => {
    if (isMobile) {
      // TODO: on mobile, open preview modal
      router.push(`/designs/${designId}`);
    } else {
      router.push(`/designs/${designId}`);
    }
  };

  const handleEditTitle = (design: Design) => {
    setEditingDesign(design);
    setNewTitle(design.name);
  };

  const handleSaveTitle = () => {
    if (editingDesign && newTitle.trim()) {
      updateDesign(editingDesign.id, { name: newTitle.trim() });
    }
    setEditingDesign(null);
    setNewTitle('');
  };

  const handleCancelEdit = () => {
    setEditingDesign(null);
    setNewTitle('');
  };

  const handleDeleteDesign = (designId: string) => {
    setDeletingDesignId(designId);
  };

  const confirmDelete = () => {
    if (deletingDesignId) {
      deleteDesign(deletingDesignId);
      setDeletingDesignId(null);
    }
  };

  const cancelDelete = () => {
    setDeletingDesignId(null);
  };

  if (!isViewModeLoading) {
    return null;
  }

  if (!isDesignDataLoading && filteredDesigns.length === 0) {
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
      <>
        <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isDesignDataLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-80 w-full" />
              ))
            : filteredDesigns.map((design) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  onDesignClick={handleDesignClick}
                  onEditTitle={handleEditTitle}
                  onDelete={handleDeleteDesign}
                />
              ))}
        </div>

        <DeleteConfirmationDialog
          isOpen={!!deletingDesignId}
          onClose={cancelDelete}
          onConfirm={confirmDelete}
        />

        <EditTitleDialog
          design={editingDesign}
          newTitle={newTitle}
          onTitleChange={setNewTitle}
          onSave={handleSaveTitle}
          onCancel={handleCancelEdit}
        />
      </>
    );
  }

  return (
    <>
      <div className="relative">
        <div className="text-muted-foreground border-b-border/50 bg-sidebar sticky top-0 right-0 left-0 z-10 grid grid-cols-12 gap-4 border-b p-6 text-sm font-medium">
          <div className="text-muted-foreground col-span-5 text-xs">Name</div>
          <div className="text-muted-foreground col-span-3 text-xs">Last Updated</div>
          <div className="text-muted-foreground col-span-3 text-xs">Created</div>
          <div className="text-muted-foreground col-span-1 text-left text-xs">Actions</div>
        </div>
        <div className="mt-4 mb-4 space-y-2 px-6">
          {isDesignDataLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="grid animate-pulse grid-cols-12 gap-4 py-3">
                  <div className="col-span-5 flex items-center gap-3">
                    <Skeleton className="bg-muted h-14 w-20 rounded" />
                    <Skeleton className="bg-muted h-4 w-48 rounded" />
                  </div>
                  <div className="col-span-3 flex items-center">
                    <Skeleton className="bg-muted h-3 w-16 rounded" />
                  </div>
                  <div className="col-span-3 flex items-center">
                    <Skeleton className="bg-muted h-3 w-16 rounded" />
                  </div>
                  <div className="col-span-1 flex items-center">
                    <Skeleton className="bg-muted h-4 w-4 rounded" />
                  </div>
                </div>
              ))
            : filteredDesigns.map((design) => (
                <DesignRow
                  key={design.id}
                  design={design}
                  onDesignClick={handleDesignClick}
                  onEditTitle={handleEditTitle}
                  onDelete={handleDeleteDesign}
                />
              ))}
        </div>
      </div>

      <DeleteConfirmationDialog
        isOpen={!!deletingDesignId}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />

      <EditTitleDialog
        design={editingDesign}
        newTitle={newTitle}
        onTitleChange={setNewTitle}
        onSave={handleSaveTitle}
        onCancel={handleCancelEdit}
      />
    </>
  );
}
