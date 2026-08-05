import type { Task } from '../types';
// import { GANTT_COLUMNS } from '../constants';
import { TaskNameCell } from './TaskNameCell';
import { StartDateCell } from './StartDateCell';
import { EndDateCell } from './EndDateCell';
import { DurationCell } from './DurationCell';
import { ProgressCell } from './ProgressCell';
import { PredecessorCell } from './PredecessorCell';
import { AddTaskButton } from './AddTaskButton';

interface GanttTableRowProps {
  task: Task;
  depth: number;
  isExpanded: boolean;
  hasChildren: boolean;
  onAddTask: () => void;
}

export function GanttTableRow({
  task,
  depth,
  isExpanded,
  hasChildren,
  onAddTask,
}: GanttTableRowProps) {
  return (
    <div className="flex border-b border-border hover:bg-muted/50 transition-colors text-sm items-center h-10 w-max min-w-full">
      {/* Task Name Column */}
      <TaskNameCell 
        task={task} 
        depth={depth} 
        isExpanded={isExpanded} 
        hasChildren={hasChildren} 
      />

      {/* Start Date */}
      <StartDateCell dateString={task.startDate} />

      {/* End Date */}
      <EndDateCell dateString={task.endDate} />

      {/* Duration */}
      <DurationCell startDate={task.startDate} endDate={task.endDate} />

      {/* Progress */}
      <ProgressCell progress={task.progress} />

      {/* Predecessor */}
      <PredecessorCell predecessorIds={task.predecessors || []} />

      <div
        className="flex items-center justify-center flex-shrink-0 border-l border-border"
        style={{ width: 140 }}
      >
        <AddTaskButton onClick={onAddTask} />
      </div>
    </div>
  );
}