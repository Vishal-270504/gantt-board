import type { Task } from '../types';

export interface TimelineSyncContract {
  /** The flattened list of tasks currently visible (expanded) in the table */
  visibleTasks: Task[];
  /** Reference to synchronize vertical scrolling with the table */
  scrollRef?: React.RefObject<HTMLDivElement | null>;
  /** Callback to notify the table of vertical scroll changes */
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export function TimelinePlaceholder({ visibleTasks, scrollRef, onScroll }: TimelineSyncContract) {
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 m-8 rounded-lg text-muted-foreground overflow-auto"
      ref={scrollRef}
      onScroll={onScroll}
    >
      <div className="text-center">
        <p className="text-lg font-medium">Timeline Component Placeholder</p>
        <p className="text-sm opacity-75 mt-2">Prepared to render {visibleTasks.length} expanded tasks.</p>
        <p className="text-sm opacity-75 mt-1 font-mono bg-muted/50 p-1 rounded inline-block">TimelineSyncContract Validated</p>
      </div>
    </div>
  );
}
