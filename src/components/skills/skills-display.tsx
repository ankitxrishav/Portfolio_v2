"use client";

import { skillsData } from '@/data/skills';
import type { Skill } from '@/data/skills';

export default function SkillsDisplay() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {skillsData.map((category) => (
        <div key={category.name} className="space-y-6">
          <h3 className="font-headline text-xl font-bold text-white flex items-center gap-3 uppercase tracking-wider">
            <div className="p-2 bg-white/10 rounded-lg">
              <category.categoryIcon className="h-5 w-5 text-white" />
            </div>
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-3 pl-2">
            {category.skills.map((skill: Skill) => (
              <div
                key={skill.name}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white rounded-xl transition-all duration-200 text-sm font-semibold"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

