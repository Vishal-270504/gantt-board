import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useDashboardStore,
  selectTimelineStart,
  selectTimelineEnd,
  selectScale,
} from "../dashboard/store/useDashboardStore";
import { useGanttController } from "./useGanttController";
import { TimelineHeader } from "../../components/ui/TimelineHeader";
import { TimelineGrid } from "../../components/ui/TimelineGrid.tsx";
import { TaskBar } from "../../components/ui/Taskbar.tsx";
import { MilestoneMarker } from "../../components/ui/MilestoneMarker.tsx";
import { DependencyArrows } from "../../components/ui/DependencyArrows.tsx";
import { useRef, useEffect } from "react";
import { getOffset } from "./ScaleConfig";

export function Timeline() {
  const timelineStart = useDashboardStore(selectTimelineStart);
  const timelineEnd = useDashboardStore(selectTimelineEnd);
  const scale = useDashboardStore(selectScale);
  const tasks = useDashboardStore((s) => s.tasks);
  const positionedTasks = useGanttController();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  // Track whether we've done initial scroll for the current scale
  const didScrollRef = useRef<string | null>(null);

  // When scale changes, scroll the viewport to show the earliest task
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

    // Find the earliest startDate among all tasks
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
            <div className="relative">
              <TimelineGrid
                startDate={timelineStart}
                endDate={timelineEnd}
                scale={scale}
                rowHeight={40}
                rowCount={positionedTasks.length}
              />
              {/* Dependency arrows */}
              <DependencyArrows tasks={positionedTasks} rowHeight={40} />
              {positionedTasks.map((t) =>
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
        </ScrollArea>
      </div>
    </div>
  );
}
