import type { ColumnWidths } from "../constants";
import {
  selectDashboardIsLoading,
  selectExpandedIds,
  selectPositionedTasks,
  selectRowHeight,
  useDashboardStore,
} from "../store/useDashboardStore";
import { GanttTableRow } from "./GanttTableRow";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { ColumnConfig, Task } from "../types";
import { useEffect } from "react";

interface VirtualizedGanttTableBodyProps {
  widths: ColumnWidths;
  totalWidth: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  columns?: ColumnConfig[] | undefined;
  onTaskDoubleClick?: ((task: Task) => void) | undefined;
}

export function VirtualizedGanttTableBody({
  widths,
  totalWidth,
  containerRef,
  columns,
  onTaskDoubleClick,
}: VirtualizedGanttTableBodyProps) {
  const tasks = useDashboardStore((state) => state.tasks);
  const expandedIds = useDashboardStore(selectExpandedIds);
  const isLoading = useDashboardStore(selectDashboardIsLoading);
  const positionedTasks = useDashboardStore(selectPositionedTasks);
  const rowHeight = useDashboardStore(selectRowHeight);

  const virtualizer = useVirtualizer({
    count: positionedTasks.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  useEffect(() => {
    virtualizer.measure();
  }, [rowHeight, virtualizer]);

  if (isLoading) return <LoadingState />;
  if (tasks.length === 0) return <EmptyState />;

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-full bg-background overflow-y-auto overflow-x-hidden relative"
      style={{ scrollBehavior: "auto", width: totalWidth }}
    >
      <div style={{ height: totalSize, position: "relative" }}>
        {virtualItems.map((virtualItem) => {
          const task = positionedTasks[virtualItem.index];
          if (!task) return null;
          return (
           <GanttTableRow
               key={task.id}
               task={task}
               depth={task.depth}
               isExpanded={!!expandedIds[task.id]}
               hasChildren={tasks.some((t) => t.parentId === task.id)}
               widths={widths}
               columns={columns}
               onTaskDoubleClick={onTaskDoubleClick}
               style={{
                 position: "absolute",
                 top: virtualItem.start,
                 left: 0,
                 right: 0,
                 height: rowHeight,
               }}
             />
          );
        })}
      </div>
    </div>
  );
}
