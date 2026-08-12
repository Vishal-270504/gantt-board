import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useDashboardStore,
  selectTimelineStart,
  selectTimelineEnd,
  selectScale,
  selectRowHeight,
} from "../dashboard/store/useDashboardStore";
import { useGanttController, ROW_HEIGHT } from "./useGanttController";
import { TimelineHeader } from "../../components/ui/TimelineHeader";
import { TimelineGrid } from "../../components/ui/TimelineGrid.tsx";
import { TaskBar } from "../../components/ui/Taskbar.tsx";
import { MilestoneMarker } from "../../components/ui/MilestoneMarker.tsx";
import { DependencyArrows } from "../../components/ui/DependencyArrows.tsx";
import { getOffset, SCALE_CONFIGS } from "./ScaleConfig";

interface TimelineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export function Timeline({ containerRef, onScroll }: TimelineProps) {
  const timelineStart = useDashboardStore(selectTimelineStart);
  const timelineEnd = useDashboardStore(selectTimelineEnd);
  const scale = useDashboardStore(selectScale);
  const tasks = useDashboardStore((s) => s.tasks);
  const positionedTasks = useGanttController();
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

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className="h-full overflow-auto relative"
    >
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
            rowHeight={rowHeight}
            rowCount={positionedTasks.length}
            startRow={startRow}
            scrollContainerRef={containerRef}
            endRow={endRow}
          />
          <DependencyArrows
            tasks={virtualItems.map((vi) => positionedTasks[vi.index])}
            rowHeight={ROW_HEIGHT}
          />
          {virtualItems.map((vi) => {
            const t = positionedTasks[vi.index];
            if (!t) return null;
            return t.type === "milestone" ? (
              <MilestoneMarker
                key={t.id}
                left={t.left}
                top={t.top}
                title={t.title}
                // style={style}
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
                assignee={t.assignee}
                type={t.type}
                // style={style}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
