import type { Task, ColumnConfig } from "../types";
import type { ColumnWidths } from "../constants";
import { useDashboardStore, selectVisibleColumns } from "../store/useDashboardStore";
import { useCallback, useMemo } from "react";
import { TaskNameCell } from "./TaskNameCell";
import { StartDateCell } from "./StartDateCell";
import { EndDateCell } from "./EndDateCell";
import { DurationCell } from "./DurationCell";
import { ProgressCell } from "./ProgressCell";
import { PredecessorCell } from "./PredecessorCell";

interface GanttTableRowProps {
  task: Task;
  depth: number;
  isExpanded: boolean;
  hasChildren: boolean;
  widths: ColumnWidths;
  columns?: ColumnConfig[];
  onTaskDoubleClick?: (task: Task) => void;
  /** Absolute positioning style injected by virtualizer */
  style?: React.CSSProperties;
}

export function GanttTableRow({
  task,
  depth,
  isExpanded,
  hasChildren,
  widths,
  columns,
  onTaskDoubleClick,
  style,
}: GanttTableRowProps) {
  const visibleColumns = useDashboardStore(selectVisibleColumns);

  // Create a map of column configs for quick lookup
  const columnConfigMap = useMemo(() => {
    const map = new Map<string, ColumnConfig>();
    columns?.forEach(col => {
      map.set(col.key, col);
    });
    return map;
  }, [columns]);

  const getColumnWidth = useCallback((colId: string): number => {
    // First check if there's a custom width in the columns config
    const colConfig = columnConfigMap.get(colId);
    if (colConfig?.width !== undefined) {
      return colConfig.width;
    }
    // Fall back to the widths prop
    return widths[colId] || 0;
  }, [columnConfigMap, widths]);

  const getColumnRenderer = useCallback((colId: string): React.ReactNode => {
    const colConfig = columnConfigMap.get(colId);

    // If there's a custom render function, use it
    if (colConfig?.render) {
      return colConfig.render(task);
    }

    // Fall back to default renderers
    switch (colId) {
      case 'title':
        return (
          <TaskNameCell
            key="title"
            task={task}
            depth={depth}
            isExpanded={isExpanded}
            hasChildren={hasChildren}
            width={getColumnWidth('title')}
          />
        );
      case 'startDate':
        return (
          <StartDateCell
            key="startDate"
            dateString={task.startDate}
            width={getColumnWidth('startDate')}
            dateFormat={colConfig?.dateFormat}
          />
        );
      case 'endDate':
        return (
          <EndDateCell
            key="endDate"
            dateString={task.endDate}
            width={getColumnWidth('endDate')}
            dateFormat={colConfig?.dateFormat}
          />
        );
      case 'duration':
        return (
          <DurationCell
            key="duration"
            startDate={task.startDate}
            endDate={task.endDate}
            width={getColumnWidth('duration')}
          />
        );
      case 'progress':
        return (
          <ProgressCell
            key="progress"
            progress={task.progress}
            width={getColumnWidth('progress')}
          />
        );
      case 'predecessors':
        return (
          <PredecessorCell
            key="predecessors"
            predecessorIds={task.predecessors || []}
            width={getColumnWidth('predecessors')}
          />
        );
      case 'assignee':
        return (
          <div
            key="assignee"
            className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0"
            style={{ width: getColumnWidth('assignee') }}
          >
            {task.assignee || <span className="italic opacity-50">—</span>}
          </div>
        );
      default:
        return null;
    }
  }, [columnConfigMap, depth, getColumnWidth, hasChildren, isExpanded, task]);

  const cells = useMemo(
    () =>
      visibleColumns.flatMap((colId) => {
        const cell = getColumnRenderer(colId);
        return cell ? [cell] : [];
      }),
    [getColumnRenderer, visibleColumns],
  );

  const handleDoubleClick = useCallback(() => {
    onTaskDoubleClick?.(task);
  }, [onTaskDoubleClick, task]);

  return (
    <div
      className="flex border-b border-border hover:bg-muted/50 transition-colors text-sm items-center w-max min-w-full"
      style={style}
      onDoubleClick={handleDoubleClick}
    >
      {cells}
    </div>
  );
}
