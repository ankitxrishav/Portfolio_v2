"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroDivider() {
    const lineRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. Load-in drawing animation
        gsap.fromTo(lineRef.current,
            { width: 0, opacity: 0 },
            {
                width: "100px", // Base target width
                opacity: 0.5,
                duration: 1.2,
                delay: 0.3,
                ease: "power2.out"
            }
        );

        // 2. Scroll-triggered fade out and text shift (if handled here or via page.tsx)
        // We'll handle the line's fade out here
        gsap.to(lineRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 20%",
                end: "bottom top",
                scrub: true,
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="flex justify-center my-8 h-px overflow-visible">
            <div
                ref={lineRef}
                className="h-full bg-white/40 blur-[0.5px]"
                style={{ width: '0' }}
            />
        </div>
    );
}
