import type { TimelineEvent } from '@/data/timeline';
import { cn } from '@/lib/utils';

interface TimelineItemProps {
  event: TimelineEvent;
  isLast: boolean;
}

export default function TimelineItem({ event, isLast }: TimelineItemProps) {
  const IconComponent = event.icon;
  return (
    <div className="relative pl-8 sm:pl-10 py-10 group">
      {!isLast && (
        <div className="absolute left-2 sm:left-3 top-0 w-px h-full bg-white/20" />
      )}

      <div className={cn(
        "absolute left-[0.4rem] sm:left-[0.6rem] top-[2.5rem] w-3 h-3 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center",
      )}
      >
        {IconComponent && <IconComponent className="w-2 h-2 text-white/80" />}
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <h3 className="font-headline text-lg md:text-xl font-bold text-white tracking-tight">{event.title}</h3>
          <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/60">{event.date}</p>
        </div>
        {event.subtitle && <p className="text-base font-medium text-white/80 italic">{event.subtitle}</p>}
        <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">{event.description}</p>
      </div>
    </div>
  );
}

