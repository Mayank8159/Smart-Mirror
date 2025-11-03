import './globals.css'; // Import the global styles you just created
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';

// You can configure a font, but for smart mirrors, a simple system font is often best
// If you want a specific font (e.g., to mimic MagicMirror style), you can load it here
const inter = Inter({ subsets: ['latin'] });

// --- METADATA ---
// Metadata is important for SEO, but for a local smart mirror, it's mostly for clarity
export const metadata: Metadata = {
  title: 'Smart Mirror',
  description: 'A Next.js powered smart mirror display.',
  // Optional: Set a viewport for full-screen display
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

// --- ROOT LAYOUT COMPONENT ---
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* The 'body' tag will use the styles from globals.css (black background, white text)
        The className prop applies the font (if you used one) to the entire body.
      */}
      <body className={inter.className}>
        {/* This is the main application container. It will be full-screen due to the 
          styles applied in globals.css to #__next (which wraps this content).
          
          You can add common components here if needed, but typically, a smart mirror
          has specific regional components (Top, Center, Bottom) defined in the 
          main page.tsx and its children.
        */}
        <div id="__next">
          {children}
        </div>
      </body>
    </html>
  );
}