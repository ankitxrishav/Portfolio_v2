"use client";

import { Linkedin, Github } from 'lucide-react';
import WordReveal from '@/components/ui/word-reveal';

export default function AboutContent() {
  const text1 = "I’m a third-year AI & Machine Learning student at MITS, Gwalior 👋";
  const text2 = "I spend most of my time building things, breaking them, and fixing them again 😄 That’s how I learn — by trying ideas out and seeing what actually works.";
  const text3 = "Tech feels interesting to me not because of tools, but because of the thinking behind them. I like things that make sense and feel right. If something feels messy, I try to clean it up 😌. Still learning, still experimenting, and enjoying the process.";

  return (
    <div className="max-w-4xl mx-auto space-y-16">
      <div className="flex flex-col gap-12 text-center md:text-left">
        <WordReveal
          text={text1}
          className="text-white font-medium leading-relaxed text-xl md:text-2xl lg:text-3xl tracking-tight"
          stagger={0.03}
          triggerThreshold={0.5}
        />
        <WordReveal
          text={text2}
          className="text-white/90 font-medium leading-relaxed text-xl md:text-2xl lg:text-3xl tracking-tight"
          stagger={0.03}
          triggerThreshold={0.5}
        />
        <WordReveal
          text={text3}
          className="text-white/80 font-medium leading-relaxed text-xl md:text-2xl lg:text-3xl tracking-tight"
          stagger={0.03}
          triggerThreshold={0.5}
        />
      </div>

      <div className="flex items-center justify-center gap-10 pt-12 border-t border-white/20">
        <a
          href="https://www.linkedin.com/in/ankitkx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white transition-all duration-200 flex items-center gap-3 text-lg font-bold uppercase tracking-widest"
        >
          <Linkedin className="h-6 w-6" />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/ankitxrishav"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white transition-all duration-200 flex items-center gap-3 text-lg font-bold uppercase tracking-widest"
        >
          <Github className="h-6 w-6" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
}
