import { GANTT_COLUMNS } from '../constants';

interface ProgressCellProps {
  progress: number;
}

export function ProgressCell({ progress }: ProgressCellProps) {
  return (
    <div
      className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0"
      style={{ width: GANTT_COLUMNS[4].width }}
    >
      <div className="flex items-center w-full gap-2">
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs w-8 text-right text-muted-foreground">
          {progress}%
        </span>
      </div>
    </div>
  );
}
