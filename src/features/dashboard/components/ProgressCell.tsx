interface ProgressCellProps {
  progress: number;
  width: number;
}

export function ProgressCell({ progress, width }: ProgressCellProps) {
  return (
    <div
      className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0"
      style={{ width }}
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
