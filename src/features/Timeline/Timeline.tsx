import { useRef, useEffect, useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useDashboardStore,
  selectTimelineStart,
  selectTimelineEnd,
  selectScale,
} from "../dashboard/store/useDashboardStore";
import { useGanttController, ROW_HEIGHT } from "./useGanttController";
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
  const rows = useGanttController();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const didScrollRef = useRef<string | null>(null);
  const [viewportEl, setViewportEl] = useState<HTMLElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(600);
  const [scrollTop, setScrollTop] = useState(0);

  // Resolve the scroll-area viewport (the virtualization scroll element)
  // and keep measuring its height for the grid's visible-row range.
  useEffect(() => {
    const container = scrollAreaRef.current;
    if (!container) return;
    const viewport = container.querySelector(
      '[data-slot="scroll-area-viewport"]',
    ) as HTMLElement | null;
    if (!viewport) return;
    setViewportEl(viewport);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  // Initialize TanStack Virtual, bound to the same viewport used for scroll sync
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => viewportEl,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10, // Render extra rows outside the viewport for smoother scrolling
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalSize = virtualizer.getTotalSize();

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
    if (syncScrollTop === undefined || !viewportEl) return;
    if (Math.abs(viewportEl.scrollTop - syncScrollTop) > 1) {
      viewportEl.scrollTop = syncScrollTop;
    }
  }, [syncScrollTop, viewportEl]);

  // Report our scroll back to parent (table follows us)
  const handleLocalScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const st = viewportEl?.scrollTop ?? e.currentTarget.scrollTop;
      virtualizer.measure(); // Keep the virtualizer in sync with the scroll offset
      setScrollTop(st);
      onScroll?.(st);
    },
    [viewportEl, virtualizer, onScroll],
  );

  const renderedRows = virtualItems
    .filter((vi) => vi.index < rows.length)
    .map((vi) => ({
      ...rows[vi.index],
      top: vi.start,
      rowHeight: ROW_HEIGHT,
    }));

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-hidden"
        onScroll={handleLocalScroll}
      >
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
              <div style={{ height: totalSize, position: "relative" }}>
                <TimelineGrid
                  startDate={timelineStart}
                  endDate={timelineEnd}
                  scale={scale}
                  rowHeight={ROW_HEIGHT}
                  rowCount={rows.length}
                  scrollTop={scrollTop}
                  containerHeight={containerHeight}
                />
                <DependencyArrows tasks={renderedRows} rowHeight={ROW_HEIGHT} />
                {virtualItems.map((vi) => {
                  if (vi.index >= rows.length) return null;
                  const row = rows[vi.index];
                  return row.type === "milestone" ? (
                    <MilestoneMarker
                      key={row.id}
                      left={row.left}
                      top={vi.start}
                      title={row.title}
                    />
                  ) : (
                    <TaskBar
                      key={row.id}
                      left={row.left}
                      width={row.width}
                      top={vi.start}
                      height={ROW_HEIGHT - 8}
                      progress={row.progress}
                      title={row.title}
                      assignee={row.assignee}
                      type={row.type}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}