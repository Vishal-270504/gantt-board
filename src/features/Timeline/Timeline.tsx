import { useCallback, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useDashboardStore,
  selectTimelineStart,
  selectTimelineEnd,
  selectScale,
  selectPositionedTasks,
  selectRowHeight,
  selectTimelineHeaderColor,
  selectTimelineShowDayLabels,
  selectTimelineTodayColor,
  selectTimelineWeekendColor,
  selectShowDependencyArrows,
  selectTaskDoubleClick,
  selectShowTitle,
  selectTimeFormat,
} from "../dashboard/store/useDashboardStore";
import { TimelineHeader } from "../../components/Timeline/TimelineHeader.tsx";
import { TimelineGrid } from "../../components/Timeline/TimelineGrid.tsx";
import { TaskBar } from "../../components/Timeline/Taskbar.tsx";
import { MilestoneMarker } from "../../components/Timeline/MilestoneMarker.tsx";
import { DependencyArrows } from "../../components/Timeline/DependencyArrows.tsx";
import { getOffset } from "./ScaleConfig";
import type { GanttColor } from "../dashboard/index.ts";
import type { Task } from "../dashboard/types";

interface TimelineProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const GANTT_COLOR_CLASSES: Record<GanttColor, string> = {
  slate: "bg-slate-500",
  blue: "bg-blue-500",
  indigo: "bg-indigo-500",
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
  cyan: "bg-cyan-500",
};

export function Timeline({ containerRef }: TimelineProps) {
  const timelineStart = useDashboardStore(selectTimelineStart);
  const timelineEnd = useDashboardStore(selectTimelineEnd);
  const scale = useDashboardStore(selectScale);
  const positionedTasks = useDashboardStore(selectPositionedTasks);
  const rowHeight = useDashboardStore(selectRowHeight);
  const showDayLabels = useDashboardStore(selectTimelineShowDayLabels);
  const timelineHeaderColor = useDashboardStore(selectTimelineHeaderColor);
  const timelineWeekendColor = useDashboardStore(selectTimelineWeekendColor);
  const timelineTodayColor = useDashboardStore(selectTimelineTodayColor);
  const showDependencies = useDashboardStore(selectShowDependencyArrows);
  const onTaskDoubleClick = useDashboardStore(selectTaskDoubleClick);
  const showTitle = useDashboardStore(selectShowTitle);
  const timeFormat = useDashboardStore(selectTimeFormat);

  const todayColorClass = GANTT_COLOR_CLASSES[timelineTodayColor];

  const virtualizer = useVirtualizer({
    count: positionedTasks.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  const renderedRows = virtualItems.map((vi) => {
    const t = positionedTasks[vi.index];
    return {
      ...t,
      top: vi.start,
      rowHeight,
    };
  });

  const handleTaskDoubleClick = useCallback(
    (task: Task) => {
      onTaskDoubleClick?.(task);
    },
    [onTaskDoubleClick],
  );

  useEffect(() => {
    virtualizer.measure();
  }, [rowHeight, virtualizer]);

  return (
    <div ref={containerRef} className="h-full overflow-auto relative">
      <div className="relative w-max min-w-full">
        <TimelineHeader
          startDate={timelineStart}
          endDate={timelineEnd}
          scale={scale}
          showDayLabels={showDayLabels}
          headerColor={timelineHeaderColor}
          weekendColor={timelineWeekendColor}
          timeformat={timeFormat}
        />
        <div style={{ height: totalHeight, position: "relative" }}>
          <TimelineGrid
            startDate={timelineStart}
            endDate={timelineEnd}
            scale={scale}
            rowHeight={rowHeight}
            height={totalHeight}
            scrollContainerRef={containerRef}
          />

          {/* Today marker */}
          <div
            className={`absolute w-px ${todayColorClass} pointer-events-none`}
            style={{
              left: getOffset(new Date(), timelineStart, scale),
              top: 0,
              height: positionedTasks.length * rowHeight,
            }}
          />

          {showDependencies && (
            <DependencyArrows tasks={renderedRows} rowHeight={rowHeight} />
          )}
          {renderedRows.map((t) => {
            if (!t) return null;
            return t.type === "milestone" ? (
              <MilestoneMarker
                key={t.id}
                left={t.left}
                top={t.top}
                title={t.title}
                rowHeight={rowHeight}
              />
            ) : (
              <TaskBar
                onDoubleClick={handleTaskDoubleClick}
                key={t.id}
                left={t.left}
                width={t.width}
                top={t.top}
                height={rowHeight - 8}
                progress={t.progress}
                title={t.title}
                task={t}
                hasParentId={t.parentId === null}
                assignee={t.assignee}
                showTitle={showTitle}
                type={t.type}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
