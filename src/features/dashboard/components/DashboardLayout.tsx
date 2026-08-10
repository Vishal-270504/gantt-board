import { GanttTable } from "./GanttTable";
import { useEffect, useRef, useState, useCallback } from "react";
import { Timeline } from "@/features/Timeline/Timeline";
import { ScaleNavbar } from "./ScaleNavbar";

const MIN_LEFT_PANEL_WIDTH = 300;
const MAX_LEFT_PANEL_WIDTH = 800;

export function DashboardLayout() {
  const tableRef = useRef<HTMLElement>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const [leftPanelWidth, setLeftPanelWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const dragState = useRef<{ startX: number; startWidth: number } | null>(null);

  // Shared scroll state for bidirectional sync
  const [sharedScrollTop, setSharedScrollTop] = useState(0);
  const [lastSource, setLastSource] = useState<"table" | "timeline" | null>(
    null,
  );

  const handleTableScroll = useCallback((scrollTop: number) => {
    setLastSource("table");
    setSharedScrollTop(scrollTop);
  }, []);

  const handleTimelineScroll = useCallback((scrollTop: number) => {
    setLastSource("timeline");
    setSharedScrollTop(scrollTop);
  }, []);

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
        {/* Left Panel: Fixed Task Table Container */}
        <aside
          ref={tableRef}
          className="flex-shrink-0 h-full overflow-hidden border-r z-10 bg-card flex flex-col"
          style={{ width: leftPanelWidth }}
        >
          <GanttTable
            syncScrollTop={
              lastSource === "timeline" ? sharedScrollTop : undefined
            }
            onScroll={handleTableScroll}
          />
        </aside>

        {/* Vertical resize handle */}
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

        {/* Right Panel: Timeline Container */}
        <main
          ref={timelineContainerRef}
          className="flex-1 h-full overflow-hidden relative bg-muted/20"
        >
          <Timeline
            syncScrollTop={
              lastSource === "table" ? sharedScrollTop : undefined
            }
            onScroll={handleTimelineScroll}
          />
        </main>
      </div>
    </div>
  );
}