"use client";

import { useState, useEffect } from 'react';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/layout/app-header';
import AppFooter from '@/components/layout/app-footer';
import SmoothScroll from '@/components/ui/smooth-scroll';
import { PreloaderProvider } from '@/context/preloader-context';
import CinematicPreloader from '@/components/layout/cinematic-preloader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <title>Ankit Kumar Portfolio</title>
        <meta name="description" content="Portfolio of Ankit Kumar, an AIML Enthusiast & Builder." />
        <link rel="icon" href="data:image/x-icon;base64,=" />
        <meta name="theme-color" content="#222222" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <PreloaderProvider>
          <SmoothScroll>
            <CinematicPreloader />
            <AppHeader />
            <main className="flex-grow relative z-10">
              {children}
            </main>
            <AppFooter />
            <Toaster />
          </SmoothScroll>
        </PreloaderProvider>
      </body>
    </html>
  );
}

