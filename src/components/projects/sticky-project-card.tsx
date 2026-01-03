import type { Project } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';

interface StickyProjectCardProps {
    project: Project;
    index: number;
    currentPalette?: { from: string; to: string };
    prevPalette?: { from: string; to: string };
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

export default function StickyProjectCard({
    project,
    index,
    currentPalette,
    prevPalette,
    isTransitioning
}: StickyProjectCardProps) {
    const hasLive = !!project.liveDemoUrl;
    const hasGithub = !!project.sourceCodeUrl;

    return (
        <div
            className="project-card text-white shadow-2xl relative overflow-hidden"
            style={{
                zIndex: index + 10,
                top: `calc(env(safe-area-inset-top, 0px) + ${index * 20}px + (min(10vw, 100px) + 20px))`
            }}
        >
            {/* Cinematic Cross-fade Layers */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: prevPalette
                        ? `linear-gradient(135deg, ${prevPalette.from} 0%, ${prevPalette.to} 100%)`
                        : undefined
                }}
            />
            <div
                className="absolute inset-0 transition-opacity duration-[5000ms] ease-in-out z-[1]"
                style={{
                    background: currentPalette
                        ? `linear-gradient(135deg, ${currentPalette.from} 0%, ${currentPalette.to} 100%)`
                        : undefined,
                    opacity: isTransitioning ? 1 : 0
                }}
            />
            {/* Dark/Soft Overlay for better text readability on vibrant backgrounds */}
            <div className="absolute inset-0 bg-black/10 z-[2]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                {/* Left Column: Content */}
                <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-between h-full relative z-10 min-h-0">
                    {/* Top: Project Logo placeholder */}
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/30 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shrink-0 transition-transform hover:scale-110 duration-300 shadow-lg">
                        {project.name.charAt(0)}
                    </div>

                    {/* Middle: Title and Tech Tags */}
                    <div className="flex-1 overflow-y-auto no-scrollbar py-4 md:py-6">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tighter mb-3 md:mb-4 lg:mb-5 leading-tight">
                            {project.name}
                        </h2>

                        <div className="flex flex-wrap gap-1 md:gap-2 mb-4 md:mb-6">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-0.5 md:px-3 md:py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-[9px] md:text-[10px] lg:text-[11px] font-bold tracking-wider uppercase"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <p className="text-sm md:text-base lg:text-lg font-medium leading-relaxed opacity-90 max-w-lg">
                            {project.description}
                        </p>
                    </div>

                    {/* Bottom: Buttons */}
                    <div className="shrink-0 flex flex-wrap gap-2 md:gap-3 lg:gap-4 pt-4">
                        {hasLive && (
                            <Link
                                href={project.liveDemoUrl!}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white text-gray-900 px-4 py-2 md:px-6 md:py-3 lg:px-7 lg:py-3.5 rounded-full font-extrabold hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 text-xs md:text-sm shadow-xl"
                            >
                                <span>Live Demo</span>
                                <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </Link>
                        )}

                        {hasGithub && (
                            <Link
                                href={project.sourceCodeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-black/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 md:px-6 md:py-3 lg:px-7 lg:py-3.5 rounded-full font-extrabold hover:bg-black/30 transition-all duration-300 flex items-center gap-2 text-xs md:text-sm"
                            >
                                <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                <span>GitHub</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Right Column: Visuals (Device Mockup) - Hidden on mobile/tablet */}
                <div className="hidden lg:flex relative items-center justify-center lg:p-12 h-full bg-black/5 lg:bg-transparent overflow-hidden">
                    <div className="relative w-full h-full lg:max-h-[65vh] flex items-center justify-center">
                        <div className="relative z-10 w-full h-full flex items-center justify-center transition-all duration-700">
                            {/* Device representation container */}
                            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-[10px] border-black/10 bg-black/5 transition-transform duration-700 hover:scale-[1.02]">
                                <Image
                                    src={project.imageUrl}
                                    alt={project.name}
                                    fill
                                    className="object-cover object-top"
                                    priority={index < 2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
