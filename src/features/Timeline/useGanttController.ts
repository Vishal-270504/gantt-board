import { useMemo } from "react";
import {
  useDashboardStore,
  selectDashboardTasks,
  selectExpandedIds,
  selectScale,
  selectTimelineStart,
  computeVisibleTasks,
} from "../dashboard/store/useDashboardStore";
import { getOffset } from "./ScaleConfig";
import { toDate } from "../../lib/dateutils";
import { ROW_HEIGHT, MS_PER_DAY } from "../dashboard/constants";
import type { GanttRow, VisibleTask } from "../dashboard/types";

export function useGanttController(): GanttRow[] {
  const tasks = useDashboardStore(selectDashboardTasks);
  const expandedIds = useDashboardStore(selectExpandedIds);
  const scale = useDashboardStore(selectScale);
  const timelineStart = useDashboardStore(selectTimelineStart);

  
  return useMemo(() => {
    const visibleTasks = computeVisibleTasks(tasks, expandedIds);

    return visibleTasks.map((task) => {
      const taskStart = toDate(task.startDate);
      const taskEnd = toDate(task.endDate);
      
      const taskEndInclusive =
        task.type === "milestone"
          ? taskEnd
          : new Date(taskEnd.getTime() + MS_PER_DAY);

      const left = getOffset(taskStart, timelineStart, scale);
      const width =
        task.type === "milestone"
          ? 0
          : getOffset(taskEndInclusive, taskStart, scale);

      return {
        ...task,
        left,
        width,
      };
    });
  }, [tasks, expandedIds, scale, timelineStart]);
}

