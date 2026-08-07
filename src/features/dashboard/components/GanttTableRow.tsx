import type { Task } from '../types';
import type { ColumnWidths } from '../constants';
import { useDashboardStore, selectVisibleColumns } from '../store/useDashboardStore';
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
  widths: ColumnWidths;
}

export function GanttTableRow({
  task,
  depth,
  isExpanded,
  hasChildren,
  widths,
}: GanttTableRowProps) {
  const visibleColumns = useDashboardStore(selectVisibleColumns);

  const columnRenderers: Record<string, React.ReactNode> = {
    title: (
      <TaskNameCell
        key="title"
        task={task}
        depth={depth}
        isExpanded={isExpanded}
        hasChildren={hasChildren}
        width={widths.title}
      />
    ),
    startDate: (
      <StartDateCell
        key="startDate"
        dateString={task.startDate}
        width={widths.startDate}
      />
    ),
    endDate: (
      <EndDateCell
        key="endDate"
        dateString={task.endDate}
        width={widths.endDate}
      />
    ),
    duration: (
      <DurationCell
        key="duration"
        startDate={task.startDate}
        endDate={task.endDate}
        width={widths.duration}
      />
    ),
    progress: (
      <ProgressCell
        key="progress"
        progress={task.progress}
        width={widths.progress}
      />
    ),
    predecessor: (
      <PredecessorCell
        key="predecessor"
        predecessorIds={task.predecessors || []}
        width={widths.predecessor}
      />
    ),
  };

  const cells = visibleColumns
    .map((colId) => columnRenderers[colId])
    .filter(Boolean);

  return (
    <div className="flex border-b border-border hover:bg-muted/50 transition-colors text-sm items-center w-max min-w-full h-10">
      {cells}
    </div>
  );
}