import { useMemo } from 'react';
import { useDashboardStore, selectDashboardTasks, selectExpandedIds, selectScale, selectTimelineStart } from '../dashboard/store/useDashboardStore';
import { getOffset } from './ScaleConfig';
import { toDate } from '../../lib/dateutils';
import type { PositionedTask, VisibleTask } from '../dashboard/types';

const ROW_HEIGHT = 36;

export function useGanttController(): PositionedTask[] {
  const tasks = useDashboardStore(selectDashboardTasks);
  const expandedIds = useDashboardStore(selectExpandedIds);
  const scale = useDashboardStore(selectScale);
  const timelineStart = useDashboardStore(selectTimelineStart);

  return useMemo(() => {
    const byParent: Record<string, typeof tasks> = {};

    tasks.forEach((t) => {
      const key = t.parentId ?? 'root';
      (byParent[key] ??= []).push(t);
    });

    const visibleTasks: VisibleTask[] = [];
    const walk = (parentId: string, depth: number) => {
      (byParent[parentId] ?? []).forEach((t) => {
        visibleTasks.push({ ...t, depth });
        if (byParent[t.id] && expandedIds[t.id]) {
          walk(t.id, depth + 1);
        }
      });
    };

    walk('root', 0);

    return visibleTasks.map((task, index) => {
      const taskStart = toDate(task.startDate);
      const taskEnd = toDate(task.endDate);

      const left = getOffset(taskStart, timelineStart, scale);
      const width = task.type === 'milestone' ? 0 : getOffset(taskEnd, taskStart, scale);

      return {
        ...task,
        left,
        width,
        top: index * ROW_HEIGHT,
        rowHeight: ROW_HEIGHT,
      };
    });
  }, [tasks, expandedIds, scale, timelineStart]);
}