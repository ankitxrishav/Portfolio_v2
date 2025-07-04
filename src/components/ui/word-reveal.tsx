"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface WordRevealProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    duration?: number;
    triggerThreshold?: number;
    cta?: React.ReactNode;
    startTrigger?: boolean;
}

export default function WordReveal({
    text,
    className = "",
    delay = 0,
    stagger = 0.05,
    duration = 0.8,
    triggerThreshold = 0.1,
    cta,
    startTrigger = true
}: WordRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wordsContainerRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!startTrigger) return;

        const container = containerRef.current;
        if (!container) return;

        // Immediately hide words to prevent flash of content
        const words = wordsContainerRef.current?.querySelectorAll('.word-inner');
        if (words) {
            gsap.set(words, {
                y: "110%",
                opacity: 0,
                rotateX: 45,
                scale: 0.9,
            });
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    observer.disconnect();
                }
            },
            { threshold: triggerThreshold, rootMargin: "0px 0px -100px 0px" }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, [triggerThreshold, hasAnimated, startTrigger]);

    useEffect(() => {
        if (!hasAnimated || !wordsContainerRef.current) return;

        const ctx = gsap.context(() => {
            const words = wordsContainerRef.current?.querySelectorAll('.word-inner');
            if (!words) return;

            const tl = gsap.timeline({
                delay: delay / 1000,
                defaults: { ease: "power4.out", force3D: true }
            });

            tl.to(words, {
                y: 0,
                opacity: 1,
                rotateX: 0,
                scale: 1,
                duration: duration,
                stagger: stagger,
            });

            if (ctaRef.current) {
                tl.to(ctaRef.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=0.4");
            }
        }, containerRef);

        return () => ctx.revert();
    }, [hasAnimated, delay, duration, stagger]);

    const words = text.split(" ");

    return (
        <div ref={containerRef} className={`flex flex-col items-center select-none ${className}`}>
            <div ref={wordsContainerRef} className="flex flex-wrap justify-center overflow-hidden py-2 px-1">
                {words.map((word, i) => (
                    <span
                        key={`${word}-${i}`}
                        className="inline-block overflow-hidden mr-[0.25em] mb-[0.1em] perspective-1000"
                    >
                        <span
                            className="word-inner inline-block will-change-transform"
                        >
                            {word}
                        </span>
                    </span>
                ))}
            </div>

            {cta && (
                <div
                    ref={ctaRef}
                    className="mt-12 opacity-0 translate-y-8 scale-95 will-change-transform"
                >
                    {cta}
                </div>
            )}
        </div>
    );
}
