import { GanttTable } from "./GanttTable";
import { useEffect, useRef, useState } from "react";
import { Timeline } from "@/features/Timeline/Timeline";
import { ScaleNavbar } from "./ScaleNavbar";
import type { Task, TimelineScale } from "../types";
import { useDashboardStore } from "../store/useDashboardStore";

const MIN_LEFT_PANEL_WIDTH = 300;
const MAX_LEFT_PANEL_WIDTH = 800;

interface DashboardLayoutProps {
  tasks: Task[];
  displayOptions?: {
    scale?: TimelineScale;
  };
  styleOptions?: {
    rowHeight?: number;
  };
}

export function DashboardLayout({
  tasks,
  displayOptions,
  styleOptions,
}: DashboardLayoutProps) {
  const setTasks = useDashboardStore((s) => s.setTasks);
  const setScale = useDashboardStore((s) => s.setScale);
  const setRowHeight = useDashboardStore((s) => s.setRowHeight);

  useEffect(() => {
    setTasks(tasks);
    
    if(displayOptions?.scale) {
      setScale(displayOptions.scale);
    }

    if(styleOptions?.rowHeight) {
      setRowHeight(styleOptions.rowHeight)
    }

  })

  const tableRef = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const dragState = useRef<{ startX: number; startWidth: number } | null>(null);

  useEffect(() => {
    if (!isResizing) return;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [isResizing]);

  useEffect(() => {
    const tableEl = tableRef.current;
    const containerEl = timelineContainerRef.current;
    if (!tableEl || !containerEl) return;

    // Find the actual scrollable viewport inside Radix ScrollArea
    const timelineViewport = containerEl.querySelector(
      '[data-slot="scroll-area-viewport"]',
    ) as HTMLElement;
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

    tableEl.addEventListener("scroll", handleTableScroll, { passive: true });
    timelineViewport.addEventListener("scroll", handleTimelineScroll, {
      passive: true,
    });
    tableEl.addEventListener("touchstart", handleTouchStart, { passive: true });
    timelineViewport.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    tableEl.addEventListener("mouseenter", handleMouseEnter, { passive: true });
    timelineViewport.addEventListener("mouseenter", handleMouseEnter, {
      passive: true,
    });

    return () => {
      tableEl.removeEventListener("scroll", handleTableScroll);
      timelineViewport.removeEventListener("scroll", handleTimelineScroll);
      tableEl.removeEventListener("touchstart", handleTouchStart);
      timelineViewport.removeEventListener("touchstart", handleTouchStart);
      tableEl.removeEventListener("mouseenter", handleMouseEnter);
      timelineViewport.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const delta = e.clientX - dragState.current.startX;
    const nextWidth = Math.min(
      MAX_LEFT_PANEL_WIDTH,
      Math.max(MIN_LEFT_PANEL_WIDTH, dragState.current.startWidth + delta),
    );
    setLeftPanelWidth(nextWidth);
  };

  const stopResize = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    dragState.current = null;
    setIsResizing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const startResize = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragState.current = {
      startX: e.clientX,
      startWidth: leftPanelWidth,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsResizing(true);
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Top bar: full-width navbar with the timeline scale selector */}
      <ScaleNavbar />

      <div className="flex flex-1 min-h-0">
        {/* 
          Left Panel: Fixed Task Table Container
          Flex-shrink-0 prevents it from squishing. 
          Overflow-auto allows independent horizontal/vertical scrolling for the table.
        */}
        <aside
          ref={tableRef}
          className="flex-shrink-0 h-full overflow-auto border-r z-10 bg-card"
          style={{ width: leftPanelWidth }}
        >
          <GanttTable />
        </aside>

        {/* Vertical resize handle between the left panel and the timeline */}
        <div
          className="z-20 w-1.5 cursor-col-resize hover:bg-primary/30 active:bg-primary/40 shrink-0"
          onPointerDown={startResize}
          onPointerMove={handlePointerMove}
          onPointerUp={stopResize}
          onPointerCancel={stopResize}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize left panel"
        />

        {/* 
          Right Panel: Timeline Container
        */}
        <main
          ref={timelineContainerRef}
          className="flex-1 h-full overflow-hidden relative bg-muted/20"
        >
          <Timeline />
        </main>
      </div>
    </div>
  );
}
