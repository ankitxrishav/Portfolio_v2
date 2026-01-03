import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { TimelineEvent } from '@/data/timeline';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  currentPalette?: { from: string; to: string };
  prevPalette?: { from: string; to: string };
  isTransitioning?: boolean;
}

export default function TimelineItem({
  event,
  index,
  currentPalette,
  prevPalette,
  isTransitioning
}: TimelineItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        {
          opacity: 0,
          scale: 0.95,
          x: isEven ? -20 : 20
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%", // Animates when top of card reaches 80% of viewport
            toggleActions: "play none none reverse",
          }
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, [isEven]);

  return (
    <div className={cn(
      "relative w-full flex",
      isEven ? "md:justify-start" : "md:justify-end",
      "justify-end pl-14 md:pl-0" // Shift right on mobile to avoid line
    )}>
      {/* Connector line to the main path */}
      <div className={cn(
        "absolute top-8 h-px bg-slate-800 z-0 hidden md:block",
        isEven ? "left-1/2 right-0 origin-left" : "right-1/2 left-0 origin-right"
      )} />

      <div
        ref={cardRef}
        className={cn(
          "w-full md:w-[42%] relative z-10 overflow-hidden",
          "border border-white/20 p-5 md:p-8 rounded-2xl shadow-xl transition-all duration-300 group"
        )}
      >
        {/* Cinematic Cross-fade Layers */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: prevPalette
              ? `linear-gradient(135deg, ${prevPalette.from} 0%, ${prevPalette.to} 100%)`
              : 'white'
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-[5000ms] ease-in-out z-[1]"
          style={{
            background: currentPalette
              ? `linear-gradient(135deg, ${currentPalette.from} 0%, ${currentPalette.to} 100%)`
              : 'white',
            opacity: isTransitioning ? 1 : 0
          }}
        />
        {/* Dark/Soft Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-[2]" />

        <div className="relative z-10 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#bfff00] py-1 px-3 bg-black/30 rounded-full border border-white/20">
              {event.date}
            </span>
            {event.icon && (
              <div className="p-2 bg-white/10 rounded-lg border border-white/10 group-hover:border-[#bfff00]/30 transition-colors">
                <event.icon className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <h3 className="font-headline text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tighter leading-none mt-2">
            {event.title}
          </h3>

          {event.subtitle && (
            <p className="text-sm md:text-base font-bold text-white/80 uppercase tracking-wide">
              {event.subtitle}
            </p>
          )}

          <p className="text-white/90 text-sm md:text-base leading-relaxed mt-3">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}

