import { SCALE_CONFIGS } from '../../features/Timeline/ScaleConfig';
import type { TimelineScale } from '../../features/dashboard/types';
import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';

interface TimelineHeaderProps {
  startDate: Date;
  endDate: Date;
  scale: TimelineScale;
}

export function TimelineHeader({ startDate, endDate, scale }: TimelineHeaderProps) {
  const config = SCALE_CONFIGS[scale];
  const units = config.getUnits(startDate, endDate);
  const groups = config.getGroups(startDate, endDate);

  const headerStyle = { '--header-w': `${units.length * config.unitWidth}px` } as CSSProperties;

  return (
    <div className="sticky top-0 z-10 bg-background border-b w-[var(--header-w)] h-12" style={headerStyle}>
      {/* Tier 1: groups (e.g. months, weeks, quarters) */}
      <div className="flex border-b h-6">
        {groups.map((g, i) => {
          const groupStyle = { '--group-w': `${g.widthInUnits * config.unitWidth}px` } as CSSProperties;
          return (
            <div
              key={i}
              className="flex items-center justify-center border-r px-2 text-xs font-medium text-muted-foreground w-[var(--group-w)] h-full truncate"
              style={groupStyle}
            >
              {g.label}
            </div>
          );
        })}
      </div>
      {/* Tier 2: units (e.g. days, hours) */}
      <div className="flex h-6">
        {units.map((u, i) => {
          const unitStyle = { '--unit-w': `${config.unitWidth}px` } as CSSProperties;
          return (
            <div
              key={i}
              className={cn(
                'flex items-center justify-center border-r text-[11px] text-muted-foreground w-[var(--unit-w)] h-full',
                isToday(u) && 'bg-primary/10 font-semibold text-primary'
              )}
              style={unitStyle}
            >
              {config.formatUnit(u)}
            </div>
          );
        })}
      </div>
    </div>
  );

}

function isToday(d: Date) {
  const t = new Date();
  return d.toDateString() === t.toDateString();
}