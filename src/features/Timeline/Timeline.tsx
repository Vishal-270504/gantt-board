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
import { AddTaskDialog } from "../dashboard/components/AddTaskDialog.tsx";
import type { TimelineScale } from "../dashboard/types/index.ts";
import { useRef, useEffect, useState } from "react";
import { getOffset } from "./ScaleConfig";

const SCALES: TimelineScale[] = [
  "year",
  "quarter",
  "month",
  "week",
  "day",
  "hour",
];

export function Timeline() {
  const timelineStart = useDashboardStore(selectTimelineStart);
  const timelineEnd = useDashboardStore(selectTimelineEnd);
  const scale = useDashboardStore(selectScale);
  const setScale = useDashboardStore((s) => s.setScale);
  const tasks = useDashboardStore((s) => s.tasks);
  const positionedTasks = useGanttController();

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  // Track whether we've done initial scroll for the current scale
  const didScrollRef = useRef<string | null>(null);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const lastScroll = useRef(0);

  const handleWheel = (e: React.WheelEvent) => {

    const now = Date.now();
    if (now - lastScroll.current < 250) return;

    lastScroll.current = now;

    const currentIndex = SCALES.indexOf(scale);

    if (e.deltaY < 0 && currentIndex > 0) {
      setScale(SCALES[currentIndex - 1]);
    } else if (e.deltaY > 0 && currentIndex < SCALES.length - 1) {
      setScale(SCALES[currentIndex + 1]);
    }
  };

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
    <div onWheel={handleWheel} className="flex flex-col h-full select-none">
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
                    onDoubleClick={() => setIsAddTaskOpen(true)}
                  />
                ),
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Scale Selection Pills */}
      <div className="flex items-center justify-between p-2 border-t gap-4 bg-card z-20">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pl-2">
          Scale
        </span>
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-[calc(100%-80px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SCALES.map((s) => (
            <button
              key={s}
              onClick={() => setScale(s)}
              className={`px-3 py-1 text-xs font-medium rounded-full capitalize whitespace-nowrap transition-all duration-200 cursor-pointer ${
                scale === s
                  ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
    </div>
  );
}
