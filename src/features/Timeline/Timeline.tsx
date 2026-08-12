import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useDashboardStore,
  selectTimelineStart,
  selectTimelineEnd,
  selectScale,
  selectRowHeight,
} from "../dashboard/store/useDashboardStore";
import { ROW_HEIGHT } from "./useGanttController";
import { TimelineHeader } from "../../components/Timeline/TimelineHeader.tsx";
import { TimelineGrid } from "../../components/Timeline/TimelineGrid.tsx";
import { TaskBar } from "../../components/Timeline/Taskbar.tsx";
import { MilestoneMarker } from "../../components/Timeline/MilestoneMarker.tsx";
import { DependencyArrows } from "../../components/Timeline/DependencyArrows.tsx";
import { getOffset } from "./ScaleConfig";

interface TimelineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function Timeline({ containerRef }: TimelineProps) {
  const timelineStart = useDashboardStore(selectTimelineStart);
  const timelineEnd = useDashboardStore(selectTimelineEnd);
  const scale = useDashboardStore(selectScale);
  const tasks = useDashboardStore((s) => s.tasks);
  const positionedTasks = useDashboardStore((s) => s.positionedTasks);
  const rowHeight = useDashboardStore(selectRowHeight);

  const didScrollRef = useRef<string | null>(null);

  // containerHeight + ResizeObserver removed — useVirtualizer measures
  // the scroll container itself via getScrollElement, no manual tracking needed

  const virtualizer = useVirtualizer({
    count: positionedTasks.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();
  const startRow = virtualItems.length ? virtualItems[0].index : 0;
  const endRow = virtualItems.length
    ? virtualItems[virtualItems.length - 1].index
    : 0;

  // Horizontal scroll-to-earliest-task on scale change
  useEffect(() => {
    const key = scale;
    if (didScrollRef.current === key) return;
    didScrollRef.current = key;

    const el = containerRef.current;
    if (!el) return;

    let earliestMs = Infinity;
    tasks.forEach((t) => {
      const ms = new Date(t.startDate).getTime();
      if (!isNaN(ms) && ms < earliestMs) earliestMs = ms;
    });
    if (!isFinite(earliestMs)) return;

    const earliestDate = new Date(earliestMs);
    const offset = getOffset(earliestDate, timelineStart, scale);

    requestAnimationFrame(() => {
      el.scrollLeft = Math.max(0, offset - 40);
    });
  }, [scale, tasks, timelineStart, containerRef]);

  const renderedRows = virtualItems.map((vi) => {
    const t = positionedTasks[vi.index];
    return {
      ...t,
      top: vi.start,
      rowHeight: ROW_HEIGHT,
    };
  });

  return (
    <div ref={containerRef} className="h-full overflow-auto relative">
      <div className="relative w-max min-w-full">
        <TimelineHeader
          startDate={timelineStart}
          endDate={timelineEnd}
          scale={scale}
        />
        <div style={{ height: totalHeight, position: "relative" }}>
          <TimelineGrid
            startDate={timelineStart}
            endDate={timelineEnd}
            scale={scale}
            scrollContainerRef={containerRef}
          />
          {/* Horizontal row separator lines — driven by row virtualizer directly */}
          {virtualItems.map((vi) => (
            <div
              key={vi.index}
              className="absolute left-0 right-0 border-b pointer-events-none"
              style={{ top: vi.start + ROW_HEIGHT - 1 }}
            />
          ))}

          {/* Today marker */}
          <div
            className="absolute w-px bg-red-500 pointer-events-none"
            style={{
              left: getOffset(new Date(), timelineStart, scale),
              top: 0,
              height: positionedTasks.length * ROW_HEIGHT,
            }}
          />
          <DependencyArrows tasks={renderedRows} rowHeight={ROW_HEIGHT} />
          {renderedRows.map((t) => {
            if (!t) return null;
            return t.type === "milestone" ? (
              <MilestoneMarker
                key={t.id}
                left={t.left}
                top={t.top}
                title={t.title}
              />
            ) : (
              <TaskBar
                key={t.id}
                left={t.left}
                width={t.width}
                top={t.top}
                height={ROW_HEIGHT - 8}
                progress={t.progress}
                title={t.title}
                hasParentId={t.parentId === null}
                assignee={t.assignee}
                type={t.type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
