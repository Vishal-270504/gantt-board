import { useRef, useEffect, useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useDashboardStore,
  selectTimelineStart,
  selectTimelineEnd,
  selectScale,
} from "../dashboard/store/useDashboardStore";
import { useGanttController, ROW_HEIGHT } from "./useGanttController";
import { useVirtualizedRows } from "./useVirtualizedRows";
import { TimelineHeader } from "../../components/ui/TimelineHeader";
import { TimelineGrid } from "../../components/ui/TimelineGrid.tsx";
import { TaskBar } from "../../components/ui/Taskbar.tsx";
import { MilestoneMarker } from "../../components/ui/MilestoneMarker.tsx";
import { DependencyArrows } from "../../components/ui/DependencyArrows.tsx";
import { getOffset } from "./ScaleConfig";

interface TimelineProps {
  /** Shared scrollTop from the table panel */
  syncScrollTop?: number;
  /** Callback to report our scrollTop back to parent */
  onScroll?: (scrollTop: number) => void;
}

export function Timeline({ syncScrollTop, onScroll }: TimelineProps) {
  const timelineStart = useDashboardStore(selectTimelineStart);
  const timelineEnd = useDashboardStore(selectTimelineEnd);
  const scale = useDashboardStore(selectScale);
  const tasks = useDashboardStore((s) => s.tasks);
  const positionedTasks = useGanttController();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const didScrollRef = useRef<string | null>(null);
  const [containerHeight, setContainerHeight] = useState(600);

  // Measure the timeline viewport height
  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const viewport = el.querySelector(
      '[data-slot="scroll-area-viewport"]',
    ) as HTMLElement | null;
    if (!viewport) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  const { visibleTasks, totalHeight, scrollTop, onScroll: handleVirtualScroll } =
    useVirtualizedRows(positionedTasks, containerHeight);

  // Horizontal scroll-to-earliest-task on scale change
  useEffect(() => {
    const key = scale;
    if (didScrollRef.current === key) return;
    didScrollRef.current = key;

    const container = scrollAreaRef.current;
    if (!container) return;

    const viewport = container.querySelector(
      '[data-slot="scroll-area-viewport"]',
    ) as HTMLElement | null;
    if (!viewport) return;

    let earliestMs = Infinity;
    tasks.forEach((t) => {
      const ms = new Date(t.startDate).getTime();
      if (!isNaN(ms) && ms < earliestMs) earliestMs = ms;
    });

    if (!isFinite(earliestMs)) return;

    const earliestDate = new Date(earliestMs);
    const offset = getOffset(earliestDate, timelineStart, scale);

    requestAnimationFrame(() => {
      viewport.scrollLeft = Math.max(0, offset - 40);
    });
  }, [scale, tasks, timelineStart]);

  // Bidirectional scroll sync: if table scrolls, we follow
  useEffect(() => {
    if (syncScrollTop === undefined) return;
    const container = scrollAreaRef.current;
    if (!container) return;
    const viewport = container.querySelector(
      '[data-slot="scroll-area-viewport"]',
    ) as HTMLElement | null;
    if (!viewport) return;
    if (Math.abs(viewport.scrollTop - syncScrollTop) > 1) {
      viewport.scrollTop = syncScrollTop;
    }
  }, [syncScrollTop]);

  // Report our scroll back to parent (table follows us)
  const handleLocalScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const st = e.currentTarget.scrollTop;
      handleVirtualScroll(e);
      onScroll?.(st);
    },
    [handleVirtualScroll, onScroll],
  );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div ref={scrollAreaRef} className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="relative w-max min-w-full">
            <TimelineHeader
              startDate={timelineStart}
              endDate={timelineEnd}
              scale={scale}
            />
            {/* pt-12 pushes grid content below the sticky header */}
            <div className="relative pt-12">
              {/* Virtualized content wrapper */}
              <div
                style={{ height: totalHeight, position: "relative" }}
                onScroll={handleLocalScroll}
              >
                <TimelineGrid
                  startDate={timelineStart}
                  endDate={timelineEnd}
                  scale={scale}
                  rowHeight={ROW_HEIGHT}
                  rowCount={positionedTasks.length}
                  scrollTop={scrollTop}
                  containerHeight={containerHeight}
                />
                <DependencyArrows
                  tasks={visibleTasks}
                  rowHeight={ROW_HEIGHT}
                />
                {visibleTasks.map((t) =>
                  t.type === "milestone" ? (
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
                      height={t.rowHeight - 8}
                      progress={t.progress}
                      title={t.title}
                      assignee={t.assignee}
                      type={t.type}
                    />
                  ),
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}