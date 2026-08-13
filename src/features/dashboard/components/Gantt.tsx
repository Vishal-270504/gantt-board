import { GanttTable } from "./GanttTable";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import {
  selectShowDayLabels,
  selectTimelineWeekendColor,
  useDashboardStore,
} from "../store/useDashboardStore";
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
  const setAvailableScales = useDashboardStore((s) => s.setAvailableScales);

  useEffect(() => {
    const expandableIds = tasks.map((t) => t.id);
    expandAll(expandableIds);
  }, [expandAll, tasks]);

  const { leftRef, rightRef } = useSyncedScroll();

  useLayoutEffect(() => {
    setTasks(tasks);

    if (displayOptions?.scale) {
      setScale(displayOptions.scale);
    }

    if (displayOptions?.availableScales) {
      setAvailableScales(displayOptions.availableScales);
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
      timeline: {
        showDayLabels: displayOptions?.showDayLabels || true,
        weekendColor: styleOptions?.timeline?.weekendColor || "slate",
        todayColor: styleOptions?.timeline?.todayColor || "slate",
        headerColor: styleOptions?.timeline?.headerColor || "slate",
      },
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
      const visibleCols = columns.reduce<string[]>((keys, col) => {
        if (col.visible !== false) {
          keys.push(col.key);
        }
        return keys;
      }, []);
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
    setAvailableScales,
    setMilestoneBackgroundColor,
    setMilestoneShape,
    setVisibleColumns,
    setTimeFormat,
    onTaskDoubleClick,
  ]);

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

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragState.current) return;
      const delta = e.clientX - dragState.current.startX;
      const nextWidth = Math.min(
        MAX_LEFT_PANEL_WIDTH,
        Math.max(MIN_LEFT_PANEL_WIDTH, dragState.current.startWidth + delta),
      );
      setLeftPanelWidth(nextWidth);
    },
    [],
  );

  const stopResize = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    dragState.current = null;
    setIsResizing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  }, []);

  const startResize = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragState.current = {
        startX: e.clientX,
        startWidth: leftPanelWidth,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
      setIsResizing(true);
    },
    [leftPanelWidth],
  );

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
          className="flex-shrink-0 h-full overflow-hidden border-r z-10 bg-card flex flex-col"
          style={{ width: leftPanelWidth }}
        >
          {/* <div ref={leftRef} className="h-full overflow-y-auto p-4 space-y-2">
            {Array.from({ length: 100 }, (_, i) => (
              <div
                key={i}
                className="h-16 rounded border bg-card flex items-center px-4"
              >
                Box {i + 1}
              </div>
            ))}
          </div> */}
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

        <main className="flex-1 h-full overflow-hidden relative bg-muted/20">
          <Timeline containerRef={rightRef} />
        </main>
      </div>
    </div>
  );
}
