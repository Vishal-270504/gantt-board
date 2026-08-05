import { GanttTable } from "./GanttTable";
import { useState, useRef, useEffect } from "react";
import { AddTaskDialog } from "./AddTaskDialog";
import { Timeline } from "@/features/Timeline/Timeline";

export function DashboardLayout() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const tableRef = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tableEl = tableRef.current;
    const containerEl = timelineContainerRef.current;
    if (!tableEl || !containerEl) return;

    // Find the actual scrollable viewport inside Radix ScrollArea
    const timelineViewport = containerEl.querySelector('[data-slot="scroll-area-viewport"]') as HTMLElement;
    if (!timelineViewport) return;

    let activeEl: HTMLElement | null = null;

    const handleTableScroll = () => {
      if (activeEl && activeEl !== tableEl) return;
      activeEl = tableEl;
      timelineViewport.scrollTop = tableEl.scrollTop;
    };

    const handleTimelineScroll = () => {
      if (activeEl && activeEl !== timelineViewport) return;
      activeEl = timelineViewport;
      tableEl.scrollTop = timelineViewport.scrollTop;
    };

    const handleTouchStart = (e: TouchEvent) => {
      activeEl = e.currentTarget as HTMLElement;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      activeEl = e.currentTarget as HTMLElement;
    };

    tableEl.addEventListener('scroll', handleTableScroll, { passive: true });
    timelineViewport.addEventListener('scroll', handleTimelineScroll, { passive: true });
    tableEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    timelineViewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    tableEl.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    timelineViewport.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      tableEl.removeEventListener('scroll', handleTableScroll);
      timelineViewport.removeEventListener('scroll', handleTimelineScroll);
      tableEl.removeEventListener('touchstart', handleTouchStart);
      timelineViewport.removeEventListener('touchstart', handleTouchStart);
      tableEl.removeEventListener('mouseenter', handleMouseEnter);
      timelineViewport.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* 
        Left Panel: Fixed Task Table Container
        Flex-shrink-0 prevents it from squishing. 
        Overflow-auto allows independent horizontal/vertical scrolling for the table.
      */}
      <aside 
        ref={tableRef}
        className="w-[400px] lg:w-[500px] flex-shrink-0 h-full overflow-auto border-r z-10 bg-card"
      >
        <GanttTable onAddTask={() => setIsAddTaskOpen(true)} />
      </aside>

      {/* 
        Right Panel: Timeline Container
      */}
      <main 
        ref={timelineContainerRef}
        className="flex-1 h-full overflow-hidden relative bg-muted/20"
      >
        <Timeline />
      </main>

      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
    </div>
  );
}

