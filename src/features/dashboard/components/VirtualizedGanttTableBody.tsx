import type { ColumnWidths } from "../constants";
import { useDashboardStore, selectDashboardIsLoading } from "../store/useDashboardStore";
import { useGanttController, ROW_HEIGHT } from "@/features/Timeline/useGanttController";
import { GanttTableRow } from "./GanttTableRow";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { useEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface VirtualizedGanttTableBodyProps {
  widths: ColumnWidths;
  totalWidth: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export function VirtualizedGanttTableBody({
  widths,
  totalWidth,
  containerRef,
  onScroll,
}: VirtualizedGanttTableBodyProps) {
  const tasks = useDashboardStore((state) => state.tasks);
  const isLoading = useDashboardStore(selectDashboardIsLoading);
  const positionedTasks = useGanttController();

  const [containerHeight, setContainerHeight] = useState(600);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerHeight(entry.contentRect.height);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  const virtualizer = useVirtualizer({
    count: positionedTasks.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  if (isLoading) return <LoadingState />;
  if (tasks.length === 0) return <EmptyState />;

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-full bg-background overflow-y-auto overflow-x-hidden relative"
      onScroll={onScroll}
      style={{ scrollBehavior: "auto", width: totalWidth, height: containerHeight }}
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
              isExpanded={!!useDashboardStore.getState().expandedIds[task.id]}
              hasChildren={tasks.some((t) => t.parentId === task.id)}
              widths={widths}
              style={{ position: "absolute", top: virtualItem.start, left: 0, right: 0, height: ROW_HEIGHT }}
            />
          );
        })}
      </div>
    </div>
  );
}