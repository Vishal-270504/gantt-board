import { SCALE_CONFIGS, getOffset } from '../../features/Timeline/ScaleConfig';
import type { TimelineScale } from '../../features/dashboard/types';
import { cn } from '@/lib/utils';
import type { CSSProperties } from 'react';

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  scale: TimelineScale;
  rowHeight: number;
  rowCount: number;
}

export function TimelineGrid({ startDate, endDate, scale, rowHeight, rowCount }: TimelineGridProps) {
  const config = SCALE_CONFIGS[scale];
  const units = config.getUnits(startDate, endDate);
  const todayLeft = getOffset(new Date(), startDate, scale);

  const containerStyle = {
    '--grid-w': `${units.length * config.unitWidth}px`,
    '--grid-h': `${rowCount * rowHeight}px`,
  } as CSSProperties;

  return (
    <div className="relative w-[var(--grid-w)] h-[var(--grid-h)]" style={containerStyle}>
      {units.map((u, i) => {
        const colStyle = {
          '--col-left': `${i * config.unitWidth}px`,
          '--col-w': `${config.unitWidth}px`,
        } as CSSProperties;
        return (
          <div
            key={i}
            className={cn(
              'absolute top-0 bottom-0 border-r border-border/60 left-[var(--col-left)] w-[var(--col-w)]',
              isToday(u) && 'bg-primary/5'
            )}
            style={colStyle}
          />
        );
      })}
      {Array.from({ length: rowCount }).map((_, i) => {
        const rowStyle = {
          '--row-top': `${i * rowHeight}px`,
          '--row-h': `${rowHeight}px`,
        } as CSSProperties;
        return (
          <div
            key={i}
            className="absolute left-0 right-0 border-b border-border/40 top-[var(--row-top)] h-[var(--row-h)]"
            style={rowStyle}
          />
        );
      })}
      <div
        className="absolute top-0 bottom-0 w-px bg-red-500 left-[var(--today-left)]"
        style={{ '--today-left': `${todayLeft}px` } as CSSProperties}
      />
    </div>
  );
}

function isToday(d: Date) {
  return d.toDateString() === new Date().toDateString();
}