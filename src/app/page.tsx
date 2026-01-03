"use client";

import { useState, useEffect } from 'react';
import SectionWrapper from '@/components/ui/section-wrapper';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

import AboutContent from '@/components/about/about-content';
import ProjectList from '@/components/projects/project-list';
import TimelineDisplay from '@/components/journey/timeline-display';
import SkillsDisplay from '@/components/skills/skills-display';
import StaticContactInfo from '@/components/contact/static-contact-info';
import ScrollReveal from '@/components/ui/scroll-reveal';
import FloatingElements from '@/components/hero/floating-elements';
import FloatingLines from '@/components/hero/floating-lines';
import HeroDivider from '@/components/hero/hero-divider';

import WordReveal from '@/components/ui/word-reveal';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HERO_PALETTES = [
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

export default function HomePage() {
  const [paletteIndex, setPaletteIndex] = useState(0); // This is the TARGET color
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0); // This is the STABLE color
  const [isTransitioning, setIsTransitioning] = useState(false);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Start the 5s transition
      const nextIdx = (paletteIndex + 1) % HERO_PALETTES.length;
      setPaletteIndex(nextIdx);
      setIsTransitioning(true);

      // 2. Handover exactly when CSS transition finishes
      const handoverTimeout = setTimeout(() => {
        setCurrentDisplayIndex(nextIdx);
        setIsTransitioning(false);
      }, 5000); // 5s fade duration

      return () => clearTimeout(handoverTimeout);
    }, 10000); // Cycle every 10s

    return () => clearInterval(interval);
  }, [paletteIndex]);

  useEffect(() => {
    // Hero Text Parallax on Scroll
    gsap.to(heroTextRef.current, {
      y: -20,
      opacity: 0.8,
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom center",
        scrub: true,
      }
    });
  }, []);

  const stablePalette = HERO_PALETTES[currentDisplayIndex];
  const nextPalette = HERO_PALETTES[paletteIndex];

  return (
    <div>
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-8 pt-32 pb-20 relative text-white overflow-hidden"
      >
        {/* Cinematic Cross-fade Layers with Breathing Animation */}
        <div
          className="absolute inset-0 z-0 animate-breathing"
          style={{
            background: `linear-gradient(135deg, ${stablePalette.from} 0%, ${stablePalette.to} 100%)`,
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-5000 ease-in-out z-[1] animate-breathing"
          style={{
            background: `linear-gradient(135deg, ${nextPalette.from} 0%, ${nextPalette.to} 100%)`,
            opacity: isTransitioning ? 1 : 0
          }}
        />

        {/* Soft Vignette Overlay */}
        <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] mix-blend-multiply opacity-50 overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" style={{ animationDuration: '40s' }} />
        </div>

        <FloatingElements />
        <FloatingLines />
        <div ref={heroTextRef} className="relative z-10 max-w-6xl mx-auto py-12">
          <WordReveal
            text="Ankit Kumar"
            className="font-headline text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-[0.8] uppercase"
            stagger={0.08}
          />

          <WordReveal
            text="I like turning ideas into things that work."
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight leading-tight opacity-90"
            stagger={0.05}
            delay={400}
          />

          <HeroDivider />

          <WordReveal
            text="AI & Machine Learning • Creative Developer"
            className="text-[10px] md:text-xs lg:text-sm font-black tracking-[0.4em] opacity-60 uppercase mb-20 mt-8"
            stagger={0.03}
            delay={800}
            cta={
              <div className="mt-4">
                <a
                  href="#projects"
                  className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all hover:scale-105 shadow-2xl"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            }
          />
        </div>

        <div className="absolute bottom-16">
          <a
            href="#projects"
            className="text-white/80 hover:text-white transition-colors duration-200 flex flex-col items-center gap-4"
          >
            <span className="text-xs uppercase tracking-widest font-bold">Scroll to explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
          </a>
        </div>
      </section>

      <section className="bg-background py-24 overflow-visible relative section-reveal rounded-[2.5rem] mb-12">
        <SectionWrapper
          id="projects"
          title={<WordReveal text="My Projects" className="text-3xl md:text-5xl font-black uppercase tracking-tighter" />}
          subtitle={
            <ScrollReveal animation="fade-up" delay={500}>
              Here’s a curated list of some of my best work, available on my GitHub:
              <a href='https://github.com/ankitxrishav' target='_blank' rel='noopener noreferrer' className='text-accent hover:underline ml-1' data-cursor-interactive="true">github.com/ankitxrishav</a>
            </ScrollReveal>
          }
          aria-labelledby="projects-heading"
          className="overflow-visible"
        >
          <ProjectList
            paletteIndex={paletteIndex}
            prevPaletteIndex={currentDisplayIndex}
            isTransitioning={isTransitioning}
          />
        </SectionWrapper>
      </section>

      <section className="bg-vibrant-amber py-24 text-white section-reveal rounded-[3rem] mb-12">
        <SectionWrapper
          id="about"
          title={<WordReveal text="About Me" className="text-3xl md:text-5xl font-black uppercase tracking-tighter" />}
          subtitle={<ScrollReveal animation="fade-up" delay={500}>Just a little about how I build and learn.</ScrollReveal>}
          aria-labelledby="about-heading"
          className="bg-transparent"
        >
          <ScrollReveal animation="fade-up" delay={800}>
            <AboutContent />
          </ScrollReveal>
        </SectionWrapper>
      </section>

      <section className="relative overflow-hidden section-reveal space-y-24 bg-[#0a0a0a] py-24 px-4 md:px-8">
        {/* Journey Section - Deep Obsidian Card */}
        <div className="bg-[#020617] rounded-[3.5rem] border border-white/5 shadow-2xl overflow-hidden">
          <SectionWrapper
            id="journey"
            title={<WordReveal text="My Journey" className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white" />}
            subtitle={<ScrollReveal animation="fade-up" delay={500}><span className="text-white opacity-90">How I got here, and what I’ve learned along the way.</span></ScrollReveal>}
            aria-labelledby="journey-heading"
            className="bg-transparent py-20 pb-10"
          >
            <TimelineDisplay
              paletteIndex={paletteIndex}
              prevPaletteIndex={currentDisplayIndex}
              isTransitioning={isTransitioning}
            />
          </SectionWrapper>
        </div>

        {/* Expertise Section - Vibrant Midnight Indigo Card */}
        <div className="bg-[#0c1112] rounded-[3.5rem] border border-white/10 shadow-[0_0_80px_rgba(99,102,241,0.1)] overflow-hidden">
          <SectionWrapper
            id="expertise"
            title={<WordReveal text="My Expertise" className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white" />}
            subtitle={<ScrollReveal animation="fade-up" delay={500}><span className="text-white opacity-90">The tools and technologies I use to build things.</span></ScrollReveal>}
            aria-labelledby="skills-heading"
            className="bg-transparent py-20"
          >
            <SkillsDisplay />
          </SectionWrapper>
        </div>
      </section>

      <section className="bg-vibrant-teal py-24 text-white section-reveal rounded-[3rem] mt-12 mb-12">
        <SectionWrapper
          id="contact"
          title={<WordReveal text="Contact Me" className="text-3xl md:text-5xl font-black uppercase tracking-tighter" />}
          subtitle={<ScrollReveal animation="fade-up" delay={500}>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.</ScrollReveal>}
          aria-labelledby="contact-heading"
          className="bg-transparent"
        >
          <ScrollReveal animation="fade-up" delay={800}>
            <StaticContactInfo />
          </ScrollReveal>
        </SectionWrapper>
      </section>
    </div>
  );
}

