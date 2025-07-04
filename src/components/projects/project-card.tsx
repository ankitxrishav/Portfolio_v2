import type { Project } from '@/data/projects';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const hasDemo = !!project.liveDemoUrl;
  const primaryLink = hasDemo ? project.liveDemoUrl : project.sourceCodeUrl;

  return (
    <Link href={primaryLink!} target="_blank" rel="noopener noreferrer" className="group block">
      <Card className="flex flex-col h-full overflow-hidden bg-card shadow-sm hover:shadow-md transition-all duration-300 border border-border rounded-xl">
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={project.imageUrl}
            alt={project.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-headline text-xl font-medium text-foreground mb-1 leading-snug">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground">{project.year}</p>
            </div>
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center group-hover:bg-secondary transition-colors">
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow pt-0 space-y-4">
          <p className="text-foreground/80 text-base leading-relaxed line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 transition-colors font-normal"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge
                variant="secondary"
                className="text-xs bg-secondary/60 text-muted-foreground font-normal"
              >
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>

          <div className="pt-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2">
            <span>{hasDemo ? 'View demo' : 'View source'}</span>
            <span className="inline-block transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

