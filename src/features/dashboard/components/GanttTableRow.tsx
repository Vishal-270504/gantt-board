import type { Task } from '../types';
import type { ColumnWidths } from '../constants';
import { TaskNameCell } from './TaskNameCell';
import { StartDateCell } from './StartDateCell';
import { EndDateCell } from './EndDateCell';
import { DurationCell } from './DurationCell';
import { ProgressCell } from './ProgressCell';
import { PredecessorCell } from './PredecessorCell';

interface GanttTableRowProps {
  task: Task;
  depth: number;
  isExpanded: boolean;
  hasChildren: boolean;
  columnWidths: ColumnWidths;
}

export function GanttTableRow({
  task,
  depth,
  isExpanded,
  hasChildren,
  columnWidths,
}: GanttTableRowProps) {
  return (
    <div className="flex border-b border-border hover:bg-muted/50 transition-colors text-sm items-center h-10 w-max min-w-full">
      {/* Task Name Column */}
      <TaskNameCell 
        task={task} 
        depth={depth} 
        isExpanded={isExpanded} 
        hasChildren={hasChildren} 
        width={columnWidths.title}
      />

      {/* Start Date */}
      <StartDateCell dateString={task.startDate} width={columnWidths.startDate} />

      {/* End Date */}
      <EndDateCell dateString={task.endDate} width={columnWidths.endDate} />

      {/* Duration */}
      <DurationCell startDate={task.startDate} endDate={task.endDate} width={columnWidths.duration} />

      {/* Progress */}
      <ProgressCell progress={task.progress} width={columnWidths.progress} />

      {/* Predecessor */}
      <PredecessorCell predecessorIds={task.predecessors || []} width={columnWidths.predecessor} />
    </div>
  );
}