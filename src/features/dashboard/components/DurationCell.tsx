import { GANTT_COLUMNS } from '../constants';

interface DurationCellProps {
  duration: number;
}

export function DurationCell({ duration }: DurationCellProps) {
  return (
    <div
      className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0 text-muted-foreground"
      style={{ width: GANTT_COLUMNS[3].width }}
    >
      {duration}d
    </div>
  );
}
