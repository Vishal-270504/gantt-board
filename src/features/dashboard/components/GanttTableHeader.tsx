import { GANTT_COLUMNS } from '../constants';

export function GanttTableHeader() {
  return (
    <div className="sticky top-0 z-10 flex bg-muted/90 backdrop-blur-sm border-b border-border text-sm font-medium text-muted-foreground w-max min-w-full h-12">
      {GANTT_COLUMNS.map((col) => (
        <div
          key={col.id}
          className="p-2 border-r border-border last:border-r-0 truncate flex-shrink-0 h-full flex items-center"
          style={{ width: col.width }}
        >
          {col.label}
        </div>
      ))}
    </div>
  );
}
