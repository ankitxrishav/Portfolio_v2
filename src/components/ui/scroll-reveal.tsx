"use client";

import { useEffect, useRef, useState } from 'react';

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
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once && ref.current) {
                        observer.unobserve(ref.current);
                    }
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold, once]);

    const getAnimationClass = () => {
        if (!isVisible) return 'opacity-0 translate-y-8 pointer-events-none';
        switch (animation) {
            case 'scale': return 'animate-scale-in';
            case 'line-reveal': return 'animate-line-reveal';
            default: return 'animate-fade-in-up';
        }
    };

    return (
        <div
            ref={ref}
            className={cn(
                className,
                getAnimationClass(),
                animation === 'line-reveal' ? 'overflow-hidden' : '',
                'transition-all duration-1000 ease-out will-change-[transform,opacity]'
            )}
            style={{
                animationDelay: isVisible ? `${delay}ms` : '0ms',
                animationFillMode: 'forwards'
            }}
        >
            {children}
        </div>
    );
}

import { cn } from '@/lib/utils';

