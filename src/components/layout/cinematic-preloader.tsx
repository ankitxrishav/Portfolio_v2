"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { usePreloader } from '@/context/preloader-context';

const KINETIC_PALETTES = [
    { name: 'The Architect', bg: '#FFFF00', text: '#000000', line: '#FFFFFF' }, // Electric Yellow, Black, White
    { name: 'The Cyber', bg: '#2E5BFF', text: '#FFFFFF', line: '#CCFF00' },     // Cobalt Blue, White, Neon Green
    { name: 'The Minimal', bg: '#111111', text: '#FFFFFF', line: '#888888' },   // Deep Black, White, Grey
    { name: 'The Pop', bg: '#FF007F', text: '#000000', line: '#FFFFFF' },       // Hot Pink, Black, White
];

export default function CinematicPreloader() {
    const { setLoaded, refreshScrollTriggers } = usePreloader();
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const topPanelRef = useRef<HTMLDivElement>(null);
    const bottomPanelRef = useRef<HTMLDivElement>(null);

    const [palette, setPalette] = useState(KINETIC_PALETTES[0]);
    const [isComplete, setIsComplete] = useState(false);

    // Scroll Lock during Preloader
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
            refreshScrollTriggers();
        };
    }, [refreshScrollTriggers]);

    useEffect(() => {
        const randomPalette = KINETIC_PALETTES[Math.floor(Math.random() * KINETIC_PALETTES.length)];
        setPalette(randomPalette);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsComplete(true);
                    refreshScrollTriggers();
                }
            });

            const ankitsText = ".text-ankits";
            const portfolioSolid = ".text-portfolio-solid"; // The solid single element
            const portfolioSplit = ".text-portfolio-split"; // The container for split elements
            const portfolioTextTop = ".text-portfolio-top";
            const portfolioTextBottom = ".text-portfolio-bottom";

            // Initial State setup
            gsap.set(containerRef.current, { backgroundColor: 'transparent' });
            gsap.set(portfolioSplit, { opacity: 0 }); // Hide split version initially

            // Phase 1: Bold Landing (0s - 1.0s)
            tl.to({}, { duration: 0.5 });

            // Phase 2: Kinetic Collapse (1.0s - 2.0s)
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

            // Phase 3.5: SWAP Solid for Split (Invisible switch)
            // Just before the doors open, we hide the solid text and show the split text
            // They are identical visually so user sees nothing change until they move
            tl.set(portfolioSolid, { opacity: 0 });
            tl.set(portfolioSplit, { opacity: 1 });

            // Phase 4: Shutter Open (2.5s - 3.5s)
            tl.addLabel("open");

            // Sync Signal
            tl.call(() => setLoaded(true), [], "open");

            // Top Panel Up
            tl.to(topPanelRef.current, {
                yPercent: -120,
                duration: 1.2,
                ease: "expo.inOut"
            }, "open");

            // Bottom Panel Down
            tl.to(bottomPanelRef.current, {
                yPercent: 120,
                duration: 1.2,
                ease: "expo.inOut"
            }, "open");

            // Top Text Up
            tl.to(portfolioTextTop, {
                y: "-120vh",
                opacity: 0,
                duration: 1.0,
                ease: "expo.in"
            }, "open");

            // Bottom Text Down
            tl.to(portfolioTextBottom, {
                y: "120vh",
                opacity: 0,
                duration: 1.0,
                ease: "expo.in"
            }, "open");

            // Strike line expands then fades
            tl.to(lineRef.current, {
                scaleX: 3,
                opacity: 0,
                duration: 0.4,
                ease: "power2.in"
            }, "open");

            // Metadata fades out faster
            tl.to(".metadata", {
                opacity: 0,
                duration: 0.3
            }, "open");

            // Small buffer before unmount
            tl.to({}, { duration: 0.1 });

        }, containerRef);

        return () => ctx.revert();
    }, [palette, setLoaded, refreshScrollTriggers]);

    if (isComplete) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        >
            {/* Background Panels (Split Door) */}
            <div
                ref={topPanelRef}
                className="absolute top-0 left-0 w-full h-[50%] z-0 pointer-events-auto will-change-transform"
                style={{ backgroundColor: palette.bg }}
            />
            <div
                ref={bottomPanelRef}
                className="absolute bottom-0 left-0 w-full h-[50%] z-0 pointer-events-auto will-change-transform"
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

                {/* PORTFOLIO Text Wrapper */}
                <div className="relative inline-block align-middle">

                    {/* SOLID VERSION (Visible during Collapse) */}
                    <span
                        className="text-portfolio-solid font-headline text-5xl md:text-8xl font-black tracking-tight block"
                        style={{ color: palette.text }}
                    >
                        PORTFOLIO
                    </span>

                    {/* SPLIT VERSION (Hidden initially, shown for Split) */}
                    <div className="text-portfolio-split absolute inset-0">
                        {/* TOP HALF */}
                        <span
                            className="text-portfolio-top font-headline text-5xl md:text-8xl font-black tracking-tight block will-change-transform"
                            style={{
                                color: palette.text,
                                clipPath: 'polygon(0 0, 100% 0, 100% 50.5%, 0 50.5%)',
                                position: 'relative',
                                zIndex: 10
                            }}
                        >
                            PORTFOLIO
                        </span>

                        {/* BOTTOM HALF */}
                        <span
                            className="text-portfolio-bottom font-headline text-5xl md:text-8xl font-black tracking-tight block absolute inset-0 will-change-transform"
                            style={{
                                color: palette.text,
                                clipPath: 'polygon(0 49.5%, 100% 49.5%, 100% 100%, 0 100%)',
                                zIndex: 10
                            }}
                        >
                            PORTFOLIO
                        </span>
                    </div>
                </div>
            </div>

            {/* Strike Line */}
            <div
                ref={lineRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 will-change-transform"
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
