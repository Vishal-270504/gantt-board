import type { Task } from '../types';
import { GANTT_COLUMNS } from '../constants';

interface GanttTableRowProps {
  task: Task;
  depth: number;
  isExpanded: boolean;
  hasChildren: boolean;
}

export function GanttTableRow({ task, depth, isExpanded, hasChildren }: GanttTableRowProps) {
  // Placeholders for calculated fields
  const duration = `${task.duration}d`; 
  const progress = `${task.progress}%`; 
  const predecessors = task.predecessors?.join(', ') || '';

  return (
    <div className="flex border-b border-border hover:bg-muted/50 transition-colors text-sm items-center h-10 w-max min-w-full">
      {/* Task Name Column with indentation placeholder */}
      <div 
        className="p-2 border-r border-border truncate flex items-center h-full flex-shrink-0"
        style={{ width: GANTT_COLUMNS[0].width, paddingLeft: `${(depth * 16) + 8}px` }}
      >
        <span className="w-5 h-5 mr-1 flex-shrink-0 flex items-center justify-center text-muted-foreground">
          {hasChildren ? (isExpanded ? '[-]' : '[+]') : ''}
        </span>
        <span className="truncate">{task.title}</span>
      </div>

      {/* Start Date */}
      <div className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0" style={{ width: GANTT_COLUMNS[1].width }}>
        {task.startDate}
      </div>

      {/* End Date */}
      <div className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0" style={{ width: GANTT_COLUMNS[2].width }}>
        {task.endDate}
      </div>

      {/* Duration */}
      <div className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0" style={{ width: GANTT_COLUMNS[3].width }}>
        {duration}
      </div>

      {/* Progress */}
      <div className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0" style={{ width: GANTT_COLUMNS[4].width }}>
        <div className="flex items-center w-full gap-2">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${task.progress}%` }} />
          </div>
          <span className="text-xs w-8 text-right text-muted-foreground">{task.progress}%</span>
        </div>
      </div>

      {/* Predecessor */}
      <div className="p-2 truncate h-full flex items-center flex-shrink-0" style={{ width: GANTT_COLUMNS[5].width }}>
        {predecessors}
      </div>
    </div>
  );
}
