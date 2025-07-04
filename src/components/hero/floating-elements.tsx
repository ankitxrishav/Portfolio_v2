"use client";

import { useEffect, useState } from 'react';

export default function FloatingElements() {
    const [elements, setElements] = useState<{ id: number; top: number; left: number; size: number; duration: number; delay: number; depth: number }[]>([]);

    useEffect(() => {
        const newElements = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            top: Math.random() * 100,
            left: Math.random() * 100,
            size: Math.random() * 6 + 2,
            duration: Math.random() * 15 + 15,
            delay: Math.random() * -20, // Start mid-animation
            depth: Math.random() * 20 - 10 // For 3D feel
        }));
        setElements(newElements);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden perspective-[1000px]">
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="absolute bg-white/10 rounded-full animate-float"
                    style={{
                        top: `${el.top}%`,
                        left: `${el.left}%`,
                        width: `${el.size}px`,
                        height: `${el.size}px`,
                        animationDuration: `${el.duration}s`,
                        animationDelay: `${el.delay}s`,
                        transform: `translateZ(${el.depth}px)`,
                        boxShadow: `0 0 ${el.size * 2}px rgba(255,255,255,0.2)`,
                        opacity: 0.1 + (el.size / 10),
                        filter: `blur(${Math.abs(el.depth / 5)}px)`
                    }}
                />
            ))}
        </div>
    );
}

