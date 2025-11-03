// components/DynamicLoader.tsx
'use client'; 

import dynamic from 'next/dynamic';

// 🚨 FIX APPLIED: Reverting to resolve the DEFAULT EXPORT (`mod.default`).
// This is the standard pattern for Next.js components and should resolve the 
// "undefined" error, assuming the component files use `export default function...`.

export const DynamicClockComponent = dynamic(
  // Assuming the component file exports: `export default function Clock() { ... }`
  () => import('@/components/Clock/Clock').then((mod) => mod.default), 
  { ssr: false }
);

export const DynamicWeatherComponent = dynamic(
  // Assuming the component file exports: `export default function Weather() { ... }`
  () => import('@/components/Weather/Weather').then((mod) => mod.default), 
  { ssr: false }
);

export const DynamicNewsComponent = dynamic(
  // Assuming the component file exports: `export default function NewsFeed() { ... }`
  () => import('@/components/News/NewsFeed').then((mod) => mod.default),
  { ssr: false }
);

export const DynamicCalendarComponent = dynamic(
  // Assuming the component file exports: `export default function Calendar() { ... }`
  () => import('@/components/Calendar/Calendar').then((mod) => mod.default),
  { ssr: false }
);
