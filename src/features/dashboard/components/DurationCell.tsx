import { GANTT_COLUMNS } from '../constants';

interface DurationCellProps {
  duration: number;
}

export function DurationCell({ duration }: DurationCellProps) {
  const days = Math.floor(duration / 24);
  const hours = duration % 24;

  const parts = [];
  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
  }
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }

  const durationStr = parts.length > 0 ? parts.join(' and ') : '0 hours';

  return (
    <div
      className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0 text-muted-foreground"
      style={{ width: GANTT_COLUMNS[3].width }}
    >
      {durationStr}
    </div>
  );
}
