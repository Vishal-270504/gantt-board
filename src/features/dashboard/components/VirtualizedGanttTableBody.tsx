import type { ColumnWidths } from "../constants";
import { useDashboardStore, selectDashboardIsLoading } from "../store/useDashboardStore";
import { useGanttController, ROW_HEIGHT } from "@/features/Timeline/useGanttController";
import { useVirtualizedRows } from "@/features/Timeline/useVirtualizedRows";
import { GanttTableRow } from "./GanttTableRow";
import { LoadingState } from "./LoadingState";
import { EmptyState } from "./EmptyState";
import { useRef, useEffect, useState } from "react";

interface VirtualizedGanttTableBodyProps {
  widths: ColumnWidths;
  /** Shared scrollTop from the timeline viewport */
  syncScrollTop?: number;
  /** Callback to report our scrollTop back to parent */
  onScroll?: (scrollTop: number) => void;
}

export function VirtualizedGanttTableBody({
  widths,
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

  const { visibleTasks, totalHeight, scrollTop, onScroll: handleScroll } =
    useVirtualizedRows(positionedTasks, containerHeight);

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
    handleScroll(e);
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
      className="flex-1 w-full bg-background overflow-auto relative"
      onScroll={handleLocalScroll}
      style={{ scrollBehavior: "auto" }}
    >
      {/* Spacer to maintain total scrollable height */}
      <div style={{ height: totalHeight, position: "relative" }}>
        {visibleTasks.map((task) => (
          <GanttTableRow
            key={task.id}
            task={task}
            depth={task.depth}
            isExpanded={!!useDashboardStore.getState().expandedIds[task.id]}
            hasChildren={tasks.some((t) => t.parentId === task.id)}
            widths={widths}
            style={{
              position: "absolute",
              top: task.top,
              left: 0,
              right: 0,
              height: ROW_HEIGHT,
            }}
          />
        ))}
      </div>
    </div>
  );
}