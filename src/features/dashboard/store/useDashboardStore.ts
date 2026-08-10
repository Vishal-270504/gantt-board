import { create } from 'zustand';
import type { Task, GanttCustomization, PositionedTask, VisibleTask, TimelineScale, GanttColor } from '../types';
import { mockTasks } from '../mockData';
import { DEFAULT_GANTT_CUSTOMIZATION } from '../constants';
import { getOffset } from "../../Timeline/ScaleConfig";
import { toDate } from "../../../lib/dateutils";

const ROW_HEIGHT = 40;

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

  const start = new Date(minTime - 7 * 24 * 60 * 60 * 1000);
  const end = new Date(maxTime + 14 * 24 * 60 * 60 * 1000);

  return { start, end };
};

const initialRange = getTimelineRangeForTasks(mockTasks);

// ── Pre-compute helper: builds byParent index once, reused on every expand/collapse ──
function buildByParent(tasks: Task[]): Record<string, Task[]> {
  const map: Record<string, Task[]> = {};
  for (const t of tasks) {
    const key = t.parentId ?? 'root';
    (map[key] ??= []).push(t);
  }
  return map;
}

// ── Pre-compute helper: builds full PositionedTask[] from store state ──
function computePositionedTasks(
  tasks: Task[],
  expandedIds: Record<string, boolean>,
  scale: TimelineScale,
  timelineStart: Date,
): PositionedTask[] {
  const byParent = buildByParent(tasks);

  const visible: VisibleTask[] = [];
  const walk = (parentId: string, depth: number) => {
    (byParent[parentId] ?? []).forEach((t) => {
      visible.push({ ...t, depth });
      if (byParent[t.id] && expandedIds[t.id]) {
        walk(t.id, depth + 1);
      }
    });
  };
  walk('root', 0);

  return visible.map((task, index) => {
    const taskStart = toDate(task.startDate);
    const taskEnd = toDate(task.endDate);
    const taskEndInclusive =
      task.type === 'milestone'
        ? taskEnd
        : new Date(taskEnd.getTime() + 86_400_000);

    const left = getOffset(taskStart, timelineStart, scale);
    const width =
      task.type === 'milestone'
        ? 0
        : getOffset(taskEndInclusive, taskStart, scale);

    return {
      ...task,
      left,
      width,
      top: index * ROW_HEIGHT,
      rowHeight: ROW_HEIGHT,
    };
  });
}

interface DashboardState {
  tasks: Task[];
  expandedIds: Record<string, boolean>;
  isLoading: boolean;
  rowHeight: number;

  // Pre-computed indexes (derived from tasks + expandedIds, updated atomically)
  byParent: Record<string, Task[]>;
  positionedTasks: PositionedTask[];
  visibleTaskCount: number;

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
  setTasks: (tasks: Task[]) => void;
  setRowHeight: (rowHeight: number) => void;

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

function createInitialState(): DashboardState {
  const tasks = mockTasks;
  const expandedIds: Record<string, boolean> = {};
  const timelineStart = initialRange.start;
  const scale: TimelineScale = 'week';
  const positionedTasks = computePositionedTasks(tasks, expandedIds, scale, timelineStart);

  return {
    tasks,
    expandedIds,
    isLoading: false,
    byParent: buildByParent(tasks),
    positionedTasks,
    visibleTaskCount: positionedTasks.length,
    timelineStart,
    timelineEnd: initialRange.end,
    scale,
    scrollTop: 0,
    customization: DEFAULT_GANTT_CUSTOMIZATION,
    rowHeight: ROW_HEIGHT,
  };
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  ...createInitialState(),

  expandTask: (id) => {
    const state = get();
    const nextIds = { ...state.expandedIds, [id]: true };
    const nextPositioned = computePositionedTasks(state.tasks, nextIds, state.scale, state.timelineStart);
    set({
      expandedIds: nextIds,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  collapseTask: (id) => {
    const state = get();
    const nextIds = { ...state.expandedIds };
    delete nextIds[id];
    const nextPositioned = computePositionedTasks(state.tasks, nextIds, state.scale, state.timelineStart);
    set({
      expandedIds: nextIds,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  toggleExpand: (id) => {
    const state = get();
    const nextIds = { ...state.expandedIds };
    if (nextIds[id]) {
      delete nextIds[id];
    } else {
      nextIds[id] = true;
    }
    const nextPositioned = computePositionedTasks(state.tasks, nextIds, state.scale, state.timelineStart);
    set({
      expandedIds: nextIds,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  expandAll: (ids) => {
    const state = get();
    const nextIds: Record<string, boolean> = {};
    ids.forEach((id) => { nextIds[id] = true; });
    const nextPositioned = computePositionedTasks(state.tasks, nextIds, state.scale, state.timelineStart);
    set({
      expandedIds: nextIds,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  collapseAll: () => {
    const state = get();
    const nextPositioned = computePositionedTasks(state.tasks, {}, state.scale, state.timelineStart);
    set({
      expandedIds: {},
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  setIsLoading: (isLoading) => set(() => ({ isLoading })),

  setTasks: (tasks) => set({tasks}),
  
  // timeline
  setRowHeight: (rowHeight) => set({ rowHeight }),

  setTimelineRange: (timelineStart, timelineEnd) => {
    const state = get();
    const nextPositioned = computePositionedTasks(state.tasks, state.expandedIds, state.scale, timelineStart);
    set({
      timelineStart,
      timelineEnd,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  setScale: (scale) => {
    const state = get();
    const nextPositioned = computePositionedTasks(state.tasks, state.expandedIds, scale, state.timelineStart);
    set({
      scale,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  setScrollTop: (scrollTop) => set(() => ({ scrollTop })),

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

// ── Selectors ──
export const selectDashboardTasks = (state: DashboardStore) => state.tasks;
export const selectDashboardIsLoading = (state: DashboardStore) => state.isLoading;
export const selectExpandedIds = (state: DashboardStore) => state.expandedIds;
export const selectIsTaskExpanded = (id: string) => (state: DashboardStore) => !!state.expandedIds[id];
export const selectRowHeight = (state: DashboardStore) => state.rowHeight;

export const selectByParent = (state: DashboardStore) => state.byParent;
export const selectPositionedTasks = (state: DashboardStore) => state.positionedTasks;
export const selectVisibleTaskCount = (state: DashboardStore) => state.visibleTaskCount;

// timeline selectors
export const selectTimelineStart = (state: DashboardStore) => state.timelineStart;
export const selectTimelineEnd = (state: DashboardStore) => state.timelineEnd;
export const selectScale = (state: DashboardStore) => state.scale;
export const selectScrollTop = (state: DashboardStore) => state.scrollTop;

// customization selectors
export const selectCustomization = (state: DashboardStore) => state.customization;
export const selectVisibleColumns = (state: DashboardStore) => state.customization.visibleColumns;
export const selectTaskBarRadius = (state: DashboardStore) => state.customization.taskBarRadius;
export const selectTaskBarColor = (state: DashboardStore) => state.customization.taskBarColor;
export const selectTaskBarProgressColor = (state: DashboardStore) => state.customization.taskBarProgressColor;

// Legacy selector — now reads from pre-computed state (zero cost)
export const selectVisibleTasks = (state: DashboardStore): VisibleTask[] => {
  return state.positionedTasks;
};