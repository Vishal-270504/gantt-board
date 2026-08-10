import type { ColumnWidths } from "../constants";
import { useDashboardStore, selectDashboardIsLoading } from "../store/useDashboardStore";
import { useGanttController, ROW_HEIGHT } from "@/features/Timeline/useGanttController";
import { GanttTableRow } from "./GanttTableRow";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { useRef, useEffect, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

interface VirtualizedGanttTableBodyProps {
  widths: ColumnWidths;
  /** Width of the full table content (sum of all visible columns) */
  totalWidth: number;
  /** Shared scrollTop from the timeline viewport */
  syncScrollTop?: number;
  /** Callback to report our scrollTop back to parent */
  onScroll?: (scrollTop: number) => void;
}

export function VirtualizedGanttTableBody({
  widths,
  totalWidth,
  syncScrollTop,
  onScroll,
}: VirtualizedGanttTableBodyProps) {
  const tasks = useDashboardStore((state) => state.tasks);
  const isLoading = useDashboardStore(selectDashboardIsLoading);
  const positionedTasks = useGanttController();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(600);

  // Measure container height
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Initialize TanStack Virtual
  const virtualizer = useVirtualizer({
    count: positionedTasks.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10, // Render 10 extra items outside visible area for smoother scrolling
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

  // Bidirectional scroll sync: if timeline scrolls, we follow
  useEffect(() => {
    if (syncScrollTop === undefined) return;
    const el = containerRef.current;
    if (!el) return;
    if (Math.abs(el.scrollTop - syncScrollTop) > 1) {
      el.scrollTop = syncScrollTop;
    }
  }, [syncScrollTop]);

  // Report our scroll back to parent (timeline follows us)
  const handleLocalScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const st = e.currentTarget.scrollTop;
    virtualizer.measure(); // Update virtualizer measurements on scroll
    onScroll?.(st);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 min-w-full bg-background overflow-y-auto overflow-x-hidden relative"
      onScroll={handleLocalScroll}
      style={{ scrollBehavior: "auto", width: totalWidth, height: containerHeight }}
    >
      {/* Spacer to maintain total scrollable height */}
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
              style={{
                position: "absolute",
                top: virtualItem.start,
                left: 0,
                right: 0,
                height: ROW_HEIGHT,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}