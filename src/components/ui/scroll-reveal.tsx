"use client";

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    animation?: 'fade-up' | 'scale' | 'line-reveal';
    threshold?: number;
    once?: boolean;
}

export default function ScrollReveal({
    children,
    className = '',
    delay = 0,
    animation = 'fade-up',
    threshold = 0.1,
    once = true
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            let fromVars: gsap.TweenVars = { opacity: 0 };
            let toVars: gsap.TweenVars = {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                delay: delay / 1000,
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: once ? "play none none none" : "play reverse play reverse",
                }
            };

            if (animation === 'fade-up') {
                fromVars.y = 30;
                toVars.y = 0;
            } else if (animation === 'scale') {
                fromVars.scale = 0.9;
                toVars.scale = 1;
            } else if (animation === 'line-reveal') {
                // Special handling if needed, but for now simple fade-up
                fromVars.y = 20;
                toVars.y = 0;
            }

            gsap.fromTo(element, fromVars, toVars);
        }, element);

        return () => ctx.revert();
    }, [animation, delay, once]);

    return (
        <div
            ref={ref}
            className={cn(
                className,
                animation === 'line-reveal' ? 'overflow-hidden' : '',
                'will-change-[transform,opacity]'
            )}
        >
            {children}
        </div>
    );
}

