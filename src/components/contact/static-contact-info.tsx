"use client";

import { Mail, Linkedin, Github } from 'lucide-react';

export default function StaticContactInfo() {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-12">
      <p className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tighter leading-tight uppercase">
        Have a project in mind? <br />
        <span className="opacity-60">Let's build something extraordinary.</span>
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-10 pt-8 border-t border-white/20">
        <a
          href="mailto:ankit.krx2502@gmail.com"
          className="text-white/80 hover:text-white transition-all duration-200 flex items-center gap-4 text-xl font-bold uppercase tracking-widest"
        >
          <Mail className="h-7 w-7" />
          <span>Email</span>
        </a>
        <a
          href="https://www.linkedin.com/in/ankitkx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white transition-all duration-200 flex items-center gap-4 text-xl font-bold uppercase tracking-widest"
        >
          <Linkedin className="h-7 w-7" />
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/ankitxrishav"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white transition-all duration-200 flex items-center gap-4 text-xl font-bold uppercase tracking-widest"
        >
          <Github className="h-7 w-7" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
}

