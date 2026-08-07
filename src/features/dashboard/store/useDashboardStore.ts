import { create } from 'zustand';
import type { Task, GanttCustomization } from '../types';
import { mockTasks } from '../mockData';
import { DEFAULT_GANTT_CUSTOMIZATION } from '../constants';

// for the timeline part
import type { VisibleTask, TimelineScale } from '../types';

export const getTimelineRangeForTasks = (tasks: Task[]) => {
  if (!tasks || tasks.length === 0) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
    return { start, end };
  }

  let minTime = Infinity;
  let maxTime = -Infinity;

  tasks.forEach((t) => {
    const s = new Date(t.startDate).getTime();
    const e = new Date(t.endDate).getTime();
    if (!isNaN(s) && s < minTime) minTime = s;
    if (!isNaN(e) && e > maxTime) maxTime = e;
  });

  // Buffers: 7 days before, 14 days after
  const start = new Date(minTime - 7 * 24 * 60 * 60 * 1000);
  const end = new Date(maxTime + 14 * 24 * 60 * 60 * 1000);

  return { start, end };
};

const initialRange = getTimelineRangeForTasks(mockTasks);

interface DashboardState {
  tasks: Task[];
  expandedIds: Record<string, boolean>;
  isLoading: boolean;

  // timeline attributes
  timelineStart: Date;
  timelineEnd: Date;
  scale: TimelineScale;
  scrollTop: number;

  // customization
  customization: GanttCustomization;
}

interface DashboardActions {
  expandTask: (id: string) => void;
  collapseTask: (id: string) => void;
  toggleExpand: (id: string) => void;
  expandAll: (ids: string[]) => void;
  collapseAll: () => void;
  setIsLoading: (loading: boolean) => void;

  // timeline attributes
  setTimelineRange: (start: Date, end: Date) => void;
  setScale: (scale: TimelineScale) => void;
  setScrollTop: (n: number) => void;

  // customization actions
  setCustomization: (customization: Partial<GanttCustomization>) => void;
  setTaskBarRadius: (radius: GanttCustomization['taskBarRadius']) => void;
  setTaskBarColor: (color: GanttCustomization['taskBarColor']) => void;
  setTaskBarProgressColor: (color: GanttCustomization['taskBarProgressColor']) => void;
  toggleColumnVisibility: (columnId: string) => void;
  setVisibleColumns: (columns: string[]) => void;
}

type DashboardStore = DashboardState & DashboardActions;

export const useDashboardStore = create<DashboardStore>((set) => ({
  tasks: mockTasks,
  expandedIds: {},
  isLoading: false,

  // timeline
  timelineStart: initialRange.start,
  timelineEnd: initialRange.end,
  scale: 'week',
  scrollTop: 0,

  // customization
  customization: DEFAULT_GANTT_CUSTOMIZATION,

  expandTask: (id) => set((state) => ({
    expandedIds: { ...state.expandedIds, [id]: true }
  })),

  collapseTask: (id) => set((state) => {
    const nextIds = { ...state.expandedIds };
    delete nextIds[id];
    return { expandedIds: nextIds };
  }),

  toggleExpand: (id) => set((state) => {
    const nextIds = { ...state.expandedIds };
    if (nextIds[id]) {
      delete nextIds[id];
    } else {
      nextIds[id] = true;
    }
    return { expandedIds: nextIds };
  }),

  expandAll: (ids) => set(() => {
    const nextIds: Record<string, boolean> = {};
    ids.forEach((id) => {
      nextIds[id] = true;
    });
    return { expandedIds: nextIds };
  }),

  collapseAll: () => set(() => ({ expandedIds: {} })),

  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  
  // timeline
  setTimelineRange: (timelineStart, timelineEnd) => set(() => ({ timelineStart, timelineEnd })),
  setScale: (scale) => set(() => ({ scale })),
  setScrollTop: (scrollTop) => set(() => ({ scrollTop })),

  // customization actions
  setCustomization: (partial) => set((state) => ({
    customization: { ...state.customization, ...partial }
  })),

  setTaskBarRadius: (taskBarRadius) => set((state) => ({
    customization: { ...state.customization, taskBarRadius }
  })),

  setTaskBarColor: (taskBarColor) => set((state) => ({
    customization: { ...state.customization, taskBarColor }
  })),

  setTaskBarProgressColor: (taskBarProgressColor) => set((state) => ({
    customization: { ...state.customization, taskBarProgressColor }
  })),

  toggleColumnVisibility: (columnId) => set((state) => {
    const current = state.customization.visibleColumns;
    const next = current.includes(columnId)
      ? current.filter((id) => id !== columnId)
      : [...current, columnId];
    return { customization: { ...state.customization, visibleColumns: next } };
  }),

  setVisibleColumns: (visibleColumns) => set((state) => ({
    customization: { ...state.customization, visibleColumns }
  })),
}));

// Selectors
export const selectDashboardTasks = (state: DashboardStore) => state.tasks;
export const selectDashboardIsLoading = (state: DashboardStore) => state.isLoading;
export const selectExpandedIds = (state: DashboardStore) => state.expandedIds;
export const selectIsTaskExpanded = (id: string) => (state: DashboardStore) => !!state.expandedIds[id];

// timeline - selectors
export const selectTimelineStart = (state: DashboardStore) => state.timelineStart;
export const selectTimelineEnd = (state: DashboardStore) => state.timelineEnd;
export const selectScale = (state: DashboardStore) => state.scale;
export const selectScrollTop = (state: DashboardStore) => state.scrollTop;

// customization - selectors
export const selectCustomization = (state: DashboardStore) => state.customization;
export const selectVisibleColumns = (state: DashboardStore) => state.customization.visibleColumns;
export const selectTaskBarRadius = (state: DashboardStore) => state.customization.taskBarRadius;
export const selectTaskBarColor = (state: DashboardStore) => state.customization.taskBarColor;
export const selectTaskBarProgressColor = (state: DashboardStore) => state.customization.taskBarProgressColor;

export const selectVisibleTasks = (state: DashboardStore): VisibleTask[] => {
  const byParent: Record<string, Task[]> = {};
  state.tasks.forEach((t) => {
    const key = t.parentId ?? 'root';
    (byParent[key] ??= []).push(t);
  });

  const result: VisibleTask[] = [];
  const walk = (parentId: string, depth: number) => {
    (byParent[parentId] ?? []).forEach((t) => {
      result.push({ ...t, depth });
      if (byParent[t.id] && state.expandedIds[t.id]) walk(t.id, depth + 1);
    });
  };
  walk('root', 0);
  return result;
};