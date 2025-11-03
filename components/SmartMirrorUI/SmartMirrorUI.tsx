'use client';

import React, { ComponentType, Suspense } from 'react';

// Define props to accept your dynamically imported components
interface SmartMirrorUIProps {
  ClockComponent: ComponentType<any>;
  WeatherComponent: ComponentType<any>;
  NewsComponent: ComponentType<any>;
  CalendarComponent: ComponentType<any>;
}

/**
 * Handles the browser's Fullscreen API.
 * This must be called from a user-initiated event (like a click).
 */
function requestFullScreen() {
  const element = document.documentElement;

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if ((element as any).mozRequestFullScreen) { // Firefox
    (element as any).mozRequestFullScreen();
  } else if ((element as any).webkitRequestFullscreen) { // Chrome, Safari and Opera
    (element as any).webkitRequestFullscreen();
  } else if ((element as any).msRequestFullscreen) { // IE/Edge
    (element as any).msRequestFullscreen();
  }
}

/**
 * The main layout for the smart mirror.
 * Now a Client Component to handle fullscreen functionality.
 */
export default function SmartMirrorUI({
  ClockComponent,
  WeatherComponent,
  NewsComponent,
  CalendarComponent,
}: SmartMirrorUIProps) {
  return (
    // Outer container: Fixed screen size, absolute black background, low-contrast text.
    <div className="h-screen w-screen bg-black text-white p-8 font-mono relative overflow-hidden">
      
      {/* Fullscreen Button - Positioned Top Center for easy access */}
      <button
        onClick={requestFullScreen}
        className="absolute top-2 left-1/2 transform -translate-x-1/2 px-4 py-1 text-xs text-white/50 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full hover:bg-white/10 transition duration-150 z-20"
        aria-label="Toggle Fullscreen Mode"
      >
        Go Full Screen
      </button>

      {/* Main Grid Structure (Top Section) */}
      <div className="grid grid-cols-3 h-full">
        
        {/* TOP LEFT (Clock & Weather) */}
        <div className="flex flex-col items-start justify-start space-y-6 z-10">
          <Suspense fallback={<div className="text-4xl text-gray-600">Loading Time...</div>}>
            <ClockComponent />
          </Suspense>
          
          <Suspense fallback={<div className="text-2xl text-gray-600">Loading Weather...</div>}>
            <WeatherComponent />
          </Suspense>
        </div>

        {/* TOP CENTER (Future Use) */}
        <div className="flex items-start justify-center z-10">
          {/* Placeholder for custom messages, stock tickers, etc. */}
        </div>

        {/* TOP RIGHT (Calendar) */}
        <div className="flex flex-col items-end justify-start space-y-4 z-10">
          <Suspense fallback={<div className="text-2xl text-gray-600">Loading Calendar...</div>}>
            <CalendarComponent />
          </Suspense>
        </div>
        
        {/* --- The center and bottom areas remain empty for a clean aesthetic --- */}

      </div>
      
      {/* BOTTOM (News Feed) - Absolute Positioning for fixed footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <Suspense fallback={<div className="text-xl text-gray-600 w-full text-center">Loading News...</div>}>
          <NewsComponent />
        </Suspense>
      </div>

      {/* Low-Contrast Visual Aesthetic Overlay (Optional) */}
      {/* This helps enforce the mirror's low-contrast look */}
      <div className="absolute inset-0 bg-black opacity-100 mix-blend-multiply pointer-events-none"></div>
    </div>
  );
}
