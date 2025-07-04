"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface Line {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    duration: number;
    delay: number;
    opacity: number;
    drift: number;
    parallaxFactor: number;
}

export default function FloatingLines() {
    const containerRef = useRef<HTMLDivElement>(null);
    const linesRef = useRef<HTMLDivElement[]>([]);
    const [lines, setLines] = useState<Line[]>([]);

    useEffect(() => {
        // Spatial Rules: Avoid clustering in the center (35% to 65%)
        const generateX = () => {
            const isLeft = Math.random() > 0.5;
            if (isLeft) {
                return Math.random() * 30; // 0% - 30%
            } else {
                return 70 + Math.random() * 30; // 70% - 100%
            }
        };

        const newLines = Array.from({ length: 14 }).map((_, i) => ({
            id: i,
            x: generateX(),
            y: Math.random() * 100,
            width: Math.random() * 1 + 1, // 1-2px
            height: Math.random() * 80 + 60, // 60-140px
            duration: Math.random() * 20 + 25, // 25-45s
            delay: Math.random() * -45,
            opacity: Math.random() * 0.03 + 0.03, // 3-6%
            drift: Math.random() * 2 + 1, // 1-3px horizontal drift
            parallaxFactor: Math.random() * 0.4 + 0.2,
        }));
        setLines(newLines);
    }, []);

    useEffect(() => {
        if (!lines.length) return;

        const ctx = gsap.context(() => {
            // 1. Upward Floating Animation
            linesRef.current.forEach((lineEl, i) => {
                if (!lineEl) return;
                const line = lines[i];

                gsap.to(lineEl, {
                    y: "-120vh",
                    x: `+=${line.drift}`,
                    duration: line.duration,
                    delay: line.delay,
                    ease: "none",
                    repeat: -1,
                });
            });

            // 2. Parallax Interaction (Desktop Only)
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;

                // Calculate normalized mouse position (-0.5 to 0.5)
                const mouseX = (clientX / innerWidth) - 0.5;
                const mouseY = (clientY / innerHeight) - 0.5;

                linesRef.current.forEach((lineEl, i) => {
                    if (!lineEl) return;
                    const line = lines[i];

                    // Subtle horizontal/vertical shift based on parallaxFactor
                    gsap.to(lineEl, {
                        x: mouseX * 40 * line.parallaxFactor,
                        y: mouseY * 40 * line.parallaxFactor,
                        overwrite: "auto",
                        duration: 1.5,
                        ease: "power2.out",
                    });
                });
            };

            if (window.innerWidth > 768) {
                window.addEventListener('mousemove', handleMouseMove);
            }

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        }, containerRef);

        return () => ctx.revert();
    }, [lines]);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            {lines.map((line, i) => (
                <div
                    key={line.id}
                    ref={(el) => {
                        if (el) linesRef.current[i] = el;
                    }}
                    className="absolute bg-slate-100 rounded-full blur-[1px]"
                    style={{
                        left: `${line.x}%`,
                        top: `110%`, // Start below the screen
                        width: `${line.width}px`,
                        height: `${line.height}px`,
                        opacity: line.opacity,
                    }}
                />
            ))}
        </div>
    );
}
