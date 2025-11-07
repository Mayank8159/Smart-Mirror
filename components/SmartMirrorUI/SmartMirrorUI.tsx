'use client';

import React, { ComponentType, Suspense, useEffect } from 'react';
import gsap from 'gsap';

interface SmartMirrorUIProps {
  ClockComponent: ComponentType<any>;
  WeatherComponent: ComponentType<any>;
  NewsComponent: ComponentType<any>;
  CalendarComponent: ComponentType<any>;
}

function requestFullScreen() {
  const element = document.documentElement;
  if (element.requestFullscreen) element.requestFullscreen();
  else if ((element as any).webkitRequestFullscreen) (element as any).webkitRequestFullscreen();
  else if ((element as any).mozRequestFullScreen) (element as any).mozRequestFullScreen();
  else if ((element as any).msRequestFullscreen) (element as any).msRequestFullscreen();
}

export default function SmartMirrorUI({
  ClockComponent,
  WeatherComponent,
  NewsComponent,
  CalendarComponent,
}: SmartMirrorUIProps) {
  useEffect(() => {
    gsap.set('#glitter-left div, #glitter-right div', {
      transformOrigin: 'center',
    });

    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to('#glitter-left div', {
      opacity: 0.3, // reduced peak opacity
      scale: 1.4,
      rotate: 15,
      duration: 3,
      ease: 'power2.inOut',
      boxShadow: '0 0 30px #3b82f6',
    }).to('#glitter-right div', {
      opacity: 0.3, // reduced peak opacity
      scale: 1.4,
      rotate: -15,
      duration: 3,
      ease: 'power2.inOut',
      boxShadow: '0 0 30px #3b82f6',
    }, '-=2.5');
  }, []);

  return (
    <div className="h-screen w-screen bg-black text-white font-mono relative overflow-hidden">

      {/* Glitter Background (z-0) */}
      <div id="glitter-left" className="absolute top-0 left-0 w-1/3 h-1/3 pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-blue-400 blur-3xl opacity-20"></div>
      </div>
      <div id="glitter-right" className="absolute top-0 right-0 w-1/3 h-1/3 pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-blue-400 blur-3xl opacity-20"></div>
      </div>

      {/* Fullscreen Button */}
      <button
        onClick={requestFullScreen}
        className="absolute top-2 left-1/2 transform -translate-x-1/2 px-4 py-1 text-xs text-white/70 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition duration-150 z-20"
        aria-label="Toggle Fullscreen Mode"
      >
        Go Full Screen
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-3 h-full z-10 px-8 pt-12">

        {/* TOP LEFT */}
        <div className="flex flex-col items-start justify-start space-y-6">
          <Suspense fallback={<div className="text-4xl text-gray-400">Loading Time...</div>}>
            <ClockComponent />
          </Suspense>
          <Suspense fallback={<div className="text-2xl text-gray-400">Loading Weather...</div>}>
            <WeatherComponent />
          </Suspense>
        </div>

        {/* TOP CENTER */}
        <div className="flex items-start justify-center">
          {/* Reserved for future use */}
        </div>

        {/* TOP RIGHT */}
        <div className="flex flex-col items-end justify-start space-y-4">
          <Suspense fallback={<div className="text-2xl text-gray-400">Loading Calendar...</div>}>
            <CalendarComponent />
          </Suspense>
        </div>
      </div>

      {/* BOTTOM NEWS */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
        <Suspense fallback={<div className="text-xl text-gray-400 w-full text-center">Loading News...</div>}>
          <NewsComponent />
        </Suspense>
      </div>
    </div>
  );
}