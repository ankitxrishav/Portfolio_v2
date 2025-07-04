import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsData } from '@/data/skills';
import type { Skill } from '@/data/skills';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsDisplay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const categories = containerRef.current?.querySelectorAll('.skill-category');

      categories?.forEach((category) => {
        const skills = category.querySelectorAll('.skill-pill');

        gsap.fromTo(skills,
          {
            opacity: 0,
            y: 15,
            scale: 0.9
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: category,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full space-y-12 py-8 px-0 bg-transparent overflow-hidden">
      {skillsData.map((category, index) => (
        <div
          key={category.name}
          className={cn(
            "skill-category group relative w-full py-10",
            index % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"
          )}
        >
          {/* Decorative Ribbon Element */}
          <div className={cn(
            "absolute top-0 bottom-0 w-1 bg-[#bfff00] opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            index % 2 === 0 ? "left-0" : "right-0"
          )} />

          <div className="max-w-6xl mx-auto px-6 md:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-8 md:gap-12">
            {/* Category Sidebar/Header - More Compact */}
            <div className="lg:w-1/4 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-5">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 shadow-xl transition-transform duration-500 group-hover:scale-110">
                <category.categoryIcon className="h-6 w-6 text-[#bfff00]" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-none">
                  {category.name}
                </h3>
                <div className="h-1 w-12 bg-[#bfff00]/50 mt-2 rounded-full" />
              </div>
            </div>

            {/* Skills Ribbon/Grid - More Compact Pills */}
            <div className="lg:w-3/4 flex flex-wrap gap-2 md:gap-3">
              {category.skills.map((skill: Skill) => (
                <div
                  key={skill.name}
                  className={cn(
                    "skill-pill px-4 py-2 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white",
                    "rounded-xl transition-all duration-500 text-sm md:text-base font-bold",
                    "shadow-md hover:shadow-xl flex items-center gap-2 active:scale-95"
                  )}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#bfff00]" />
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

