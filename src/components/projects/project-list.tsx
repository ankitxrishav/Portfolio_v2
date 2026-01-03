"use client";

import { projectsData } from '@/data/projects';
import type { Project } from '@/data/projects';
import StickyProjectCard from './sticky-project-card';

const PROJECT_PALETTES = [
  { from: '#6366F1', to: '#8B5CF6' }, // Indigo-Purple
  { from: '#4F46E5', to: '#06B6D4' }, // Indigo-Cyan
  { from: '#7C3AED', to: '#DB2777' }, // Purple-Pink
  { from: '#2563EB', to: '#7C3AED' }, // Blue-Purple
  { from: '#F59E0B', to: '#D97706' }, // Amber-Orange
  { from: '#10B981', to: '#059669' }, // Emerald-Green
];

interface ProjectListProps {
  paletteIndex?: number;
  prevPaletteIndex?: number;
  isTransitioning?: boolean;
}

export default function ProjectList({
  paletteIndex = 0,
  prevPaletteIndex = 0,
  isTransitioning = false
}: ProjectListProps) {
  const currentProjects: Project[] = projectsData;

  return (
    <div className="project-card-container overflow-visible">
      {currentProjects.length > 0 ? (
        <div className="flex flex-col">
          {currentProjects.map((project, index) => {
            const cardPalette = PROJECT_PALETTES[(paletteIndex + index) % PROJECT_PALETTES.length];
            const prevCardPalette = PROJECT_PALETTES[(prevPaletteIndex + index) % PROJECT_PALETTES.length];
            return (
              <StickyProjectCard
                key={project.id}
                project={project}
                index={index}
                currentPalette={cardPalette}
                prevPalette={prevCardPalette}
                isTransitioning={isTransitioning}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-muted-foreground text-lg py-10">No projects available at this time.</p>
      )}
    </div>
  );
}

