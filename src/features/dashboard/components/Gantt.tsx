import { GanttTable } from "./GanttTable";
import { useEffect, useRef, useState } from "react";
import { Timeline } from "@/features/Timeline/Timeline";
import { ScaleNavbar } from "./ScaleNavbar";
import type {
  Task,
  GanttColor,
  TaskbarRadiusType,
  ColumnConfig,
  DisplayOptions,
  MilestoneShape,
} from "../types";
import { useDashboardStore } from "../store/useDashboardStore";
import { useSyncedScroll } from "./useSyncedScroll";

const MIN_LEFT_PANEL_WIDTH = 300;
const MAX_LEFT_PANEL_WIDTH = 800;

interface GanttProps {
  tasks: Task[];
  displayOptions?: DisplayOptions;
  columns?: ColumnConfig[];
  styleOptions?: {
    rowHeight?: number;
    ganttList?: {
      headerColor?: GanttColor;
    };
    taskBar?: {
      barColor?: GanttColor;
      projectBarColor?: GanttColor;
      progressColor?: GanttColor;
      radius?: TaskbarRadiusType;
      showTitle?: boolean;
    };
    milestone?: {
      backgroundColor?: GanttColor;
      shape?: MilestoneShape;
    };
    timeline?: {
      todayColor?: GanttColor;
      weekendColor?: GanttColor;
      headerColor?: GanttColor;
    };
  };
  onTaskDoubleClick?: (task: Task) => void;
}

export function Gantt({
  tasks,
  displayOptions,
  columns,
  onTaskDoubleClick,
  styleOptions,
}: GanttProps) {
  const setTasks = useDashboardStore((s) => s.setTasks);
  const setScale = useDashboardStore((s) => s.setScale);
  const setRowHeight = useDashboardStore((s) => s.setRowHeight);
  const setCustomization = useDashboardStore((s) => s.setCustomization);
  const expandAll = useDashboardStore((s) => s.expandAll);
  const setVisibleColumns = useDashboardStore((s) => s.setVisibleColumns);
  const setGanttListHeaderColor = useDashboardStore(
    (s) => s.setGanttListHeaderColor,
  );
  const setTimeFormat = useDashboardStore((s) => s.setTimeFormat);
  const setMilestoneBackgroundColor = useDashboardStore(
    (s) => s.setMilestoneBackgroundColor,
  );
  const setMilestoneShape = useDashboardStore((s) => s.setMilestoneShape);

  useEffect(() => {
    const expandableIds = tasks.map((t) => t.id);
    expandAll(expandableIds);
  }, []);

  const { leftRef, rightRef } = useSyncedScroll();

  useEffect(() => {
    setTasks(tasks);

    if (displayOptions?.scale) {
      setScale(displayOptions.scale);
    }

    if (styleOptions?.rowHeight) {
      setRowHeight(styleOptions.rowHeight);
    }

    if (styleOptions?.ganttList?.headerColor) {
      setGanttListHeaderColor(styleOptions.ganttList.headerColor);
    }

    setCustomization({
      taskBarColor: styleOptions?.taskBar?.barColor,
      taskBarProgressColor: styleOptions?.taskBar?.progressColor,
      taskBarRadius: styleOptions?.taskBar?.radius,
      projectBarColor: styleOptions?.taskBar?.projectBarColor,
      showTitle: styleOptions?.taskBar?.showTitle,
    });

    // Wire milestone styles from styleOptions into the store
    if (styleOptions?.milestone?.backgroundColor) {
      setMilestoneBackgroundColor(styleOptions.milestone.backgroundColor);
    }
    if (styleOptions?.milestone?.shape) {
      setMilestoneShape(styleOptions.milestone.shape);
    }

    // Wire columns config into store
    if (columns && columns.length > 0) {
      const visibleCols = columns
        .filter((col) => col.visible !== false)
        .map((col) => col.key);
      setVisibleColumns(visibleCols);
    } else {
      const defaultVisibleColumns = [
        "title",
        "startDate",
        "endDate",
        "duration",
        "progress",
        "predecessors",
      ];
      setVisibleColumns(defaultVisibleColumns);
    }

    // Wire timeFormat
    if (displayOptions?.timeFormat) {
      setTimeFormat(displayOptions.timeFormat);
    }
  }, [
    styleOptions,
    displayOptions,
    tasks,
    columns,
    setTasks,
    setScale,
    setRowHeight,
    setGanttListHeaderColor,
    setCustomization,
    setMilestoneBackgroundColor,
    setMilestoneShape,
    setVisibleColumns,
    setTimeFormat,
  ]);

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
    <div
      className="flex flex-col h-screen w-full overflow-hidden bg-background text-foreground"
      style={
        {
          "--row-height": `${styleOptions?.rowHeight || 40}px`,
        } as React.CSSProperties
      }
    >
      <ScaleNavbar />

      <div className="flex flex-1 min-h-0">
        <aside
          ref={tableRef}
          className="flex-shrink-0 h-full overflow-hidden border-r z-10 bg-card flex flex-col"
          style={{ width: leftPanelWidth }}
        >
          <GanttTable
            containerRef={leftRef}
            columns={columns}
            onTaskDoubleClick={onTaskDoubleClick}
          />
        </aside>

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

        <main
          ref={timelineContainerRef}
          className="flex-1 h-full overflow-hidden relative bg-muted/20"
        >
          <Timeline containerRef={rightRef} />
        </main>
      </div>
    </div>
  );
}