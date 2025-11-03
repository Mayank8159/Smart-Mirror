// components/News/NewsFeed.tsx

'use client'; 

import React from 'react';
import { useNews } from '@/hooks/useNews'; // ⬅️ Import the rotation hook

export default function NewsFeed() {
  // ⬅️ Get the currently rotating headline
  const { currentHeadline, isLoading } = useNews(); 

  if (isLoading) {
    return (
        <div className="w-full text-center py-4 text-gray-400">
            Fetching headlines...
        </div>
    );
  }

  if (!currentHeadline) {
    return (
        <div className="w-full text-center py-4 text-gray-500">
            No news headlines to display.
        </div>
    );
  }

  return (
    <div className="w-full text-center py-4">
      <p className="text-2xl font-semibold animate-pulse">
        {currentHeadline.headline}
      </p>
    </div>
  );
}