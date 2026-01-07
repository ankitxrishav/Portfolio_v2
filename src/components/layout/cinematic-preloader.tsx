"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePreloader } from '@/context/preloader-context';

const KINETIC_PALETTES = [
    { name: 'The Architect', bg: '#FFFF00', text: '#000000', line: '#FFFFFF' }, // Electric Yellow, Black, White
    { name: 'The Cyber', bg: '#2E5BFF', text: '#FFFFFF', line: '#CCFF00' },     // Cobalt Blue, White, Neon Green
    { name: 'The Minimal', bg: '#111111', text: '#FFFFFF', line: '#888888' },   // Deep Black, White, Grey
    { name: 'The Pop', bg: '#FF007F', text: '#000000', line: '#FFFFFF' },       // Hot Pink, Black, White
];

export default function CinematicPreloader() {
    const { setLoaded } = usePreloader();
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const topPanelRef = useRef<HTMLDivElement>(null);
    const bottomPanelRef = useRef<HTMLDivElement>(null);

    const [palette, setPalette] = useState(KINETIC_PALETTES[0]);
    const [isComplete, setIsComplete] = useState(false);

    // Scroll Lock during Preloader
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        // When component unmounts (isComplete), overflow is restored automatically by cleanup
        return () => {
            document.body.style.overflow = '';
            // Force refresh one last time to ensure page layout is recognized
            ScrollTrigger.refresh();
        };
    }, []);

    useEffect(() => {
        const randomPalette = KINETIC_PALETTES[Math.floor(Math.random() * KINETIC_PALETTES.length)];
        setPalette(randomPalette);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsComplete(true);
                    // Note: setLoaded is called inside the timeline for sync, 
                    // but we ensure clean unmount here.
                }
            });

            const ankitsText = ".text-ankits";
            const portfolioTextTop = ".text-portfolio-top";
            const portfolioTextBottom = ".text-portfolio-bottom";

            // Initial State setup
            gsap.set(containerRef.current, { backgroundColor: 'transparent' }); // Container transparent

            // Phase 1: Bold Landing (0s - 1.0s)
            tl.to({}, { duration: 0.5 });

            // Phase 2: Kinetic Collapse (1.0s - 2.0s)
            // "ANKIT'S" collapses
            tl.to(ankitsText, {
                width: 0,
                opacity: 0,
                paddingRight: 0,
                duration: 1.0,
                ease: "expo.inOut"
            }, "collapse");

            // Phase 3: The Strike-Through (2.0s - 2.5s)
            tl.fromTo(lineRef.current,
                { scaleX: 0 },
                {
                    scaleX: 1,
                    duration: 0.5,
                    ease: "power4.out"
                }
            );

            // Phase 4: Shutter Open (2.5s - 3.5s)
            // Background Panels Slide Apart
            tl.addLabel("open");

            // Sync Signal: Tell app "We are open" right as animation starts
            tl.call(() => setLoaded(true), [], "open");

            // Top Panel Up
            tl.to(topPanelRef.current, {
                yPercent: -100,
                duration: 1.2,
                ease: "expo.inOut"
            }, "open");

            // Bottom Panel Down
            tl.to(bottomPanelRef.current, {
                yPercent: 100,
                duration: 1.2,
                ease: "expo.inOut"
            }, "open");

            // Text Splits and Moves with Panels (or faster)
            tl.to(portfolioTextTop, {
                y: "-100vh", // Fly out
                opacity: 0,
                duration: 1.0,
                ease: "expo.in"
            }, "open");

            tl.to(portfolioTextBottom, {
                y: "100vh", // Fly out
                opacity: 0,
                duration: 1.0,
                ease: "expo.in"
            }, "open");

            // Line fades out or expands? Let's hide it as doors open
            tl.to(lineRef.current, {
                scaleX: 2, // Stretch a bit
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            }, "open");

            // Metadata fades out
            tl.to(".metadata", {
                opacity: 0,
                duration: 0.5
            }, "open");

            // Hold briefly for effect then complete
            tl.to({}, { duration: 0.2 });

        }, containerRef);

        return () => ctx.revert();
    }, [palette, setLoaded]);

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        >
            {/* Background Panels (Split Door) */}
            <div
                ref={topPanelRef}
                className="absolute top-0 left-0 w-full h-[50%] z-0 pointer-events-auto"
                style={{ backgroundColor: palette.bg }}
            />
            <div
                ref={bottomPanelRef}
                className="absolute bottom-0 left-0 w-full h-[50%] z-0 pointer-events-auto"
                style={{ backgroundColor: palette.bg }}
            />

            {/* Metadata (Z-Index above panels) */}
            <div className="metadata absolute top-6 left-6 font-mono text-xs font-bold uppercase tracking-widest z-10" style={{ color: palette.text }}>
                Ankit / 2026
            </div>
            <div className="metadata absolute top-6 right-6 font-mono text-xs font-bold uppercase tracking-widest z-10" style={{ color: palette.text }}>
                Selected Works
            </div>
            <div className="metadata absolute bottom-6 left-6 font-mono text-xs font-bold uppercase tracking-widest z-10" style={{ color: palette.text }}>
                Portfolio V2
            </div>
            <div className="metadata absolute bottom-6 right-6 font-mono text-xs font-bold uppercase tracking-widest z-10" style={{ color: palette.text }}>
                {palette.name}
            </div>

            {/* Main Text Container */}
            <div className="relative z-20 flex items-center justify-center overflow-hidden whitespace-nowrap">
                <span
                    className="text-ankits font-headline text-5xl md:text-8xl font-black tracking-tight overflow-hidden inline-block align-middle"
                    style={{ color: palette.text, whiteSpace: 'nowrap' }}
                >
                    ANKIT'S
                </span>

                {/* Spacer */}
                <span className="text-ankits inline-block w-4 md:w-8 overflow-hidden"></span>

                {/* PORTFOLIO Text - Duplicated for Split Effect */}
                <div className="relative inline-block align-middle">
                    {/* TOP HALF */}
                    <span
                        className="text-portfolio-top font-headline text-5xl md:text-8xl font-black tracking-tight block"
                        style={{
                            color: palette.text,
                            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
                            position: 'relative',
                            zIndex: 10
                        }}
                    >
                        PORTFOLIO
                    </span>

                    {/* BOTTOM HALF */}
                    <span
                        className="text-portfolio-bottom font-headline text-5xl md:text-8xl font-black tracking-tight block absolute inset-0"
                        style={{
                            color: palette.text,
                            clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                            zIndex: 10
                        }}
                    >
                        PORTFOLIO
                    </span>
                </div>
            </div>

            {/* Strike Line */}
            <div
                ref={lineRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                style={{
                    backgroundColor: palette.line,
                    width: '100vw',
                    height: '4px',
                    transform: 'translate(-50%, -50%) scaleX(0)',
                    transformOrigin: 'center center'
                }}
            />
        </div>
    );
}
