'use client';

import { useEffect, useState } from 'react';

export interface Design {
  id: string;
  name: string;
  thumbnail?: string;
  lastModified: string;
  dateCreated: string;
  lastModifiedTimestamp: number;
  dateCreatedTimestamp: number;
  isFavorite: boolean;
  isDeleted: boolean;
}

function generateMockDesigns(): Design[] {
  const baseNames = [
    'Weekly Newsletter',
    'Product Launch',
    'Welcome Email',
    'Sales Announcement',
    'Monthly Update',
    'Holiday Special',
    'Event Invitation',
    'Customer Survey',
    'Thank You',
    'Black Friday',
    'Spring Collection',
    'Company News',
    'Feature Update',
    'Seasonal Greetings',
    'Promotional Campaign',
    'Brand Story',
    'User Onboarding',
    'Feedback Request',
    'Special Offer',
    'Community Update',
    'Partnership Announcement',
    'Industry Report',
    'Workshop Invitation',
    'Success Stories',
  ];

  return baseNames.map((baseName, index) => {
    const createdDaysAgo = Math.floor(Math.random() * 90) + 1;
    const modifiedDaysAgo = Math.floor(Math.random() * createdDaysAgo) + 1;

    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - createdDaysAgo);

    const modifiedDate = new Date();
    modifiedDate.setDate(modifiedDate.getDate() - modifiedDaysAgo);

    return {
      id: `design-${index + 1}`,
      name: `${baseName} ${index > 15 ? 'V2' : ''}`.trim(),
      lastModified: formatRelativeDate(modifiedDate),
      dateCreated: formatRelativeDate(createdDate),
      lastModifiedTimestamp: modifiedDate.getTime(),
      dateCreatedTimestamp: createdDate.getTime(),
      isFavorite: Math.random() > 0.8,
      isDeleted: Math.random() > 0.9,
    };
  });
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    }
    return `${diffInHours}h ago`;
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}w ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `${months}mo ago`;
  }
}

export function useDesignData() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      const mockDesigns = generateMockDesigns();
      setDesigns(mockDesigns);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const updateDesign = (id: string, updates: Partial<Design>) => {
    setDesigns((prev) =>
      prev.map((design) => (design.id === id ? { ...design, ...updates } : design))
    );
  };

  const deleteDesign = (id: string) => {
    setDesigns((prev) =>
      prev.map((design) => (design.id === id ? { ...design, isDeleted: true } : design))
    );
  };

  const restoreDesign = (id: string) => {
    setDesigns((prev) =>
      prev.map((design) => (design.id === id ? { ...design, isDeleted: false } : design))
    );
  };

  const toggleFavorite = (id: string) => {
    setDesigns((prev) =>
      prev.map((design) =>
        design.id === id ? { ...design, isFavorite: !design.isFavorite } : design
      )
    );
  };

  return {
    designs,
    isLoading,
    updateDesign,
    deleteDesign,
    restoreDesign,
    toggleFavorite,
  };
}
