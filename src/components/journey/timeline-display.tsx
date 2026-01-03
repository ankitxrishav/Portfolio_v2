import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData, type TimelineEvent } from '@/data/timeline';
import TimelineItem from './timeline-item';

gsap.registerPlugin(ScrollTrigger);

interface TimelineDisplayProps {
  paletteIndex?: number;
  prevPaletteIndex?: number;
  isTransitioning?: boolean;
}

const PROJECT_PALETTES = [
  { from: '#6366F1', to: '#8B5CF6' }, // Indigo-Purple
  { from: '#4F46E5', to: '#06B6D4' }, // Indigo-Cyan
  { from: '#7C3AED', to: '#DB2777' }, // Purple-Pink
  { from: '#2563EB', to: '#7C3AED' }, // Blue-Purple
  { from: '#F59E0B', to: '#D97706' }, // Amber-Orange
  { from: '#10B981', to: '#059669' }, // Emerald-Green
  { from: '#EC4899', to: '#8B5CF6' }, // Pink-Purple
  { from: '#06B6D4', to: '#3B82F6' }, // Cyan-Blue
  { from: '#8B5CF6', to: '#EC4899' }, // Purple-Pink-Vibrant
  { from: '#14B8A6', to: '#6366F1' }, // Teal-Indigo
  { from: '#F43F5E', to: '#FB923C' }, // Rose-Orange
  { from: '#3B82F6', to: '#2DD4BF' }, // Blue-Teal
];

export default function TimelineDisplay({
  paletteIndex = 0,
  prevPaletteIndex = 0,
  isTransitioning = false
}: TimelineDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!pathRef.current || !dotRef.current) return;

      const path = pathRef.current;
      const pathLength = path.getTotalLength();

      // Initial state: Path is hidden
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animation: Drawing the line on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center", // Start when top of container reaches center of viewport
          end: "bottom center", // End when bottom of container reaches center of viewport
          scrub: true, // Tied to scroll
        },
      });

      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none",
      });

      // Tracker Dot: Follows the path tip
      tl.to(dotRef.current, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        ease: "none",
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentTimelineData: TimelineEvent[] = [...timelineData].reverse();

  return (
    <div ref={containerRef} className="relative py-24 px-4 overflow-visible bg-transparent">
      {/* Central Vertical Line (SVG Path) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 flex justify-center h-full pointer-events-none">
        <svg
          className="h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 40 1000" // ViewBox will be stretched
        >
          {/* Base Gray Line */}
          <line
            x1="20" y1="0" x2="20" y2="1000"
            className="stroke-slate-800 stroke-[2]"
          />
          {/* Progress Neon-Green Line */}
          <path
            ref={pathRef}
            d="M 20 0 L 20 1000"
            className="stroke-[#bfff00] stroke-[2] fill-none"
            strokeLinecap="round"
          />
          {/* Glowing Tracker Dot */}
          <circle
            ref={dotRef}
            r="6"
            cx="20"
            className="fill-[#bfff00] drop-shadow-[0_0_8px_rgba(191,255,0,0.8)]"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-2 md:px-0">
        {currentTimelineData.length > 0 ? (
          <div className="flex flex-col gap-10 md:gap-12 relative">
            {currentTimelineData.map((event, index) => {
              const cardPalette = PROJECT_PALETTES[(paletteIndex + index) % PROJECT_PALETTES.length];
              const prevCardPalette = PROJECT_PALETTES[(prevPaletteIndex + index) % PROJECT_PALETTES.length];

              return (
                <TimelineItem
                  key={event.id}
                  event={event}
                  index={index}
                  currentPalette={cardPalette}
                  prevPalette={prevCardPalette}
                  isTransitioning={isTransitioning}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg py-10">
            No journey information available.
          </p>
        )}
      </div>
    </div>
  );
}

