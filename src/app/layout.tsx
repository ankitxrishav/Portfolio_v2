"use client";

import { useState, useEffect, useLayoutEffect } from 'react';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import AppHeader from '@/components/layout/app-header';
import AppFooter from '@/components/layout/app-footer';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple fade-in delay
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (loading) {
      document.body.style.overflow = 'hidden';
      const header = document.getElementById('app-header');
      if (header) {
        gsap.set(header, { y: '-100%', opacity: 0 });
      }
    } else {
      const preloader = document.getElementById('preloader');
      const header = document.getElementById('app-header');

      gsap.to(preloader, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          if (preloader) preloader.style.display = 'none';
          document.body.style.overflow = 'auto';
        }
      });

      if (header) {
        gsap.to(header, {
          y: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.2
        });
      }
    }
  }, [loading]);

  return (
    <html lang="en" className={`${plusJakarta.variable} ${spaceGrotesk.variable} dark`}>
      <head>
        <title>Ankit Kumar Portfolio</title>
        <meta name="description" content="Portfolio of Ankit Kumar, an AIML Enthusiast & Builder." />
        <link rel="icon" href="data:image/x-icon;base64,=" />
        <meta name="theme-color" content="#222222" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <div id="preloader" className="fixed inset-0 z-[99999] bg-background transition-opacity"></div>

        <AppHeader />

        <main className="flex-grow relative z-10">
          {children}
        </main>

        <AppFooter />

        <Toaster />
      </body>
    </html>
  );
}

