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

import WordReveal from '@/components/ui/word-reveal';
import { ArrowRight } from 'lucide-react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Prepare for transition
      const nextIndex = (paletteIndex + 1) % HERO_PALETTES.length;
      setPaletteIndex(nextIndex);
      setIsTransitioning(true);

      // 2. After the 5s fade completes, update the stable index
      const handoverTimeout = setTimeout(() => {
        setCurrentDisplayIndex(nextIndex);
        setIsTransitioning(false);
      }, 5000); // Wait for transition duration

      return () => clearTimeout(handoverTimeout);
    }, 10000); // Cycle every 10 seconds

    return () => clearInterval(interval);
  }, [paletteIndex]);

  const stablePalette = HERO_PALETTES[currentDisplayIndex];
  const nextPalette = HERO_PALETTES[paletteIndex];

  return (
    <div>
      <section
        id="home"
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-8 py-20 relative text-white overflow-hidden"
      >
        {/* Cinematic Cross-fade Layers */}
        {/* Layer 0: Always shows the stable (last confirmed) color */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, ${stablePalette.from} 0%, ${stablePalette.to} 100%)`,
          }}
        />
        {/* Layer 1: Fades in/out on top with the new color */}
        <div
          className="absolute inset-0 transition-opacity duration-[5000ms] ease-in-out z-[1]"
          style={{
            background: `linear-gradient(135deg, ${nextPalette.from} 0%, ${nextPalette.to} 100%)`,
            opacity: isTransitioning ? 1 : 0
          }}
        />

        <FloatingElements />
        <div className="relative z-10 max-w-6xl mx-auto py-12">
          <WordReveal
            text="Ankit Kumar"
            className="font-headline text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-[0.8] uppercase"
            stagger={0.08}
          />

          <WordReveal
            text="Turning ideas into intelligent systems."
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-12 tracking-tight leading-tight opacity-90"
            stagger={0.05}
            delay={400}
          />

          <WordReveal
            text="AI & Machine Learning • Creative Developer"
            className="text-[10px] md:text-xs lg:text-sm font-black tracking-[0.4em] opacity-60 uppercase mb-20"
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

      <section className="bg-background py-24 overflow-visible relative section-reveal">
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

      <section className="bg-vibrant-amber py-24 text-white section-reveal">
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

      <section className="bg-vibrant-indigo py-24 text-white section-reveal">
        <SectionWrapper
          id="journey-skills"
          title={<WordReveal text="Journey & Expertise" className="text-3xl md:text-5xl font-black uppercase tracking-tighter" />}
          subtitle={<ScrollReveal animation="fade-up" delay={500}>Exploring my professional path and the skills I've honed along the way.</ScrollReveal>}
          aria-labelledby="journey-skills-heading"
          className="bg-transparent"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 items-start">
            <ScrollReveal animation="fade-up" delay={800}>
              <div>
                <Card className="relative overflow-visible mb-8 p-4 text-center bg-white/10 backdrop-blur-sm border-white/20">
                  <h3 className="font-headline text-2xl font-bold text-white">My Journey</h3>
                  <div className="absolute left-1/2 bottom-0 w-3 h-3 bg-indigo-500 transform -translate-x-1/2 translate-y-1/2 rotate-45 border-b border-r border-white/20"></div>
                </Card>
                <TimelineDisplay />
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={1000}>
              <div>
                <Card className="relative overflow-visible mb-8 p-4 text-center bg-white/10 backdrop-blur-sm border-white/20">
                  <h3 className="font-headline text-2xl font-bold text-white">My Skillset</h3>
                  <div className="absolute left-1/2 bottom-0 w-3 h-3 bg-indigo-500 transform -translate-x-1/2 translate-y-1/2 rotate-45 border-b border-r border-white/20"></div>
                </Card>
                <SkillsDisplay />
              </div>
            </ScrollReveal>
          </div>
        </SectionWrapper>
      </section>

      <section className="bg-vibrant-teal py-24 text-white section-reveal">
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

