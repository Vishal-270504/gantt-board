import { create } from "zustand";
import type {
  Task,
  GanttCustomization,
  PositionedTask,
  VisibleTask,
  TimelineScale,
  DateFormat,
  TimeFormat,
  GanttColor,
  MilestoneShape,
} from "../types";
import { mockTasks } from "../mockData";
import { DEFAULT_GANTT_CUSTOMIZATION } from "../constants";
import { getOffset } from "@/features/Timeline/ScaleConfig";
import { toDate } from "@/lib/dateutils";

const ROW_HEIGHT = 40;

export const getTimelineRangeForTasks = (tasks: Task[]) => {
  if (!tasks || tasks.length === 0) {
    const now = new Date();
    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 7,
    );
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

function buildByParent(tasks: Task[]): Record<string, Task[]> {
  const map: Record<string, Task[]> = {};
  for (const t of tasks) {
    const key = t.parentId ?? "root";
    (map[key] ??= []).push(t);
  }
  return map;
}

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
  walk("root", 0);

  return visible.map((task, index) => {
    const taskStart = toDate(task.startDate);
    const taskEnd = toDate(task.endDate);
    const taskEndInclusive =
      task.type === "milestone"
        ? taskEnd
        : new Date(taskEnd.getTime() + 86_400_000);

    const left = getOffset(taskStart, timelineStart, scale);
    const width =
      task.type === "milestone"
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
  timelineStart: Date;
  timelineEnd: Date;
  scale: TimelineScale;
  customization: GanttCustomization;
  ganttListHeaderColor: GanttColor | undefined;
  showDependencies: boolean;
  showDayLabels: boolean;
  availableScales: TimelineScale[];
  timelineTodayColor: GanttColor;
  timelineWeekendColor: GanttColor;
  timelineHeaderColor: GanttColor;
  milestoneBackgroundColor: GanttColor;
  milestoneShape: MilestoneShape;
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
  setCustomization: (customization: Partial<GanttCustomization>) => void;

  setTaskBarProgressColor: (
    color: GanttCustomization["taskBarProgressColor"],
  ) => void;
  setDateFormat: (format: DateFormat) => void;
  setTimeFormat: (format: TimeFormat) => void;
  toggleColumnVisibility: (columnId: string) => void;
  setVisibleColumns: (columns: string[]) => void;
  setGanttListHeaderColor: (color: GanttColor | undefined) => void;
  setShowDependencies: (show: boolean) => void;
  setAvailableScales: (scales: TimelineScale[]) => void;
  setMilestoneBackgroundColor: (color: GanttColor) => void;
  setMilestoneShape: (shape: MilestoneShape) => void;
}

type DashboardStore = DashboardState & DashboardActions;

function createInitialState(): DashboardState {
  const tasks = mockTasks;
  const expandedIds: Record<string, boolean> = {};
  const timelineStart = initialRange.start;
  const scale: TimelineScale = "day";
  const positionedTasks = computePositionedTasks(
    tasks,
    expandedIds,
    scale,
    timelineStart,
  );

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
    customization: DEFAULT_GANTT_CUSTOMIZATION,
    rowHeight: ROW_HEIGHT,
    ganttListHeaderColor: undefined,
    showDependencies: true,
    showDayLabels: true,
    availableScales: ["hour", "day", "week", "month", "quarter", "year"],
    timelineTodayColor: "rose",
    timelineWeekendColor: "slate",
    timelineHeaderColor: "slate",
    milestoneBackgroundColor: "amber",
    milestoneShape: "diamond",
  };
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
  ...createInitialState(),

  expandTask: (id) => {
    const state = get();
    const nextIds = { ...state.expandedIds, [id]: true };
    const nextPositioned = computePositionedTasks(
      state.tasks,
      nextIds,
      state.scale,
      state.timelineStart,
    );
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
    const nextPositioned = computePositionedTasks(
      state.tasks,
      nextIds,
      state.scale,
      state.timelineStart,
    );
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
    const nextPositioned = computePositionedTasks(
      state.tasks,
      nextIds,
      state.scale,
      state.timelineStart,
    );
    set({
      expandedIds: nextIds,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  expandAll: (ids) => {
    const state = get();
    const nextIds: Record<string, boolean> = {};
    ids.forEach((id) => {
      nextIds[id] = true;
    });
    const nextPositioned = computePositionedTasks(
      state.tasks,
      nextIds,
      state.scale,
      state.timelineStart,
    );
    set({
      expandedIds: nextIds,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  collapseAll: () => {
    const state = get();
    const nextPositioned = computePositionedTasks(
      state.tasks,
      {},
      state.scale,
      state.timelineStart,
    );
    set({
      expandedIds: {},
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  setIsLoading: (isLoading) => set(() => ({ isLoading })),

  setTasks: (tasks) => {
    const state = get();
    const range = getTimelineRangeForTasks(tasks);
    const nextPositioned = computePositionedTasks(
      tasks,
      state.expandedIds,
      state.scale,
      range.start,
    );
    set({
      tasks,
      byParent: buildByParent(tasks),
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
      timelineStart: range.start,
      timelineEnd: range.end,
    });
  },

  // timeline
  setRowHeight: (rowHeight) => set({ rowHeight }),

  setTimelineRange: (timelineStart, timelineEnd) => {
    const state = get();
    const nextPositioned = computePositionedTasks(
      state.tasks,
      state.expandedIds,
      state.scale,
      timelineStart,
    );
    set({
      timelineStart,
      timelineEnd,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },
  setScale: (scale) => {
    const state = get();
    const nextPositioned = computePositionedTasks(
      state.tasks,
      state.expandedIds,
      scale,
      state.timelineStart,
    );
    set({
      scale,
      positionedTasks: nextPositioned,
      visibleTaskCount: nextPositioned.length,
    });
  },

  setCustomization: (partial) =>
    set((state) => ({
      customization: { ...state.customization, ...partial },
    })),

  setTaskBarProgressColor: (taskBarProgressColor) =>
    set((state) => ({
      customization: { ...state.customization, taskBarProgressColor },
    })),

  setDateFormat: (dateFormat) =>
    set((state) => ({
      customization: { ...state.customization, dateFormat },
    })),

  setTimeFormat: (timeFormat) =>
    set((state) => ({
      customization: { ...state.customization, timeFormat },
    })),

  toggleColumnVisibility: (columnId) =>
    set((state) => {
      const current = state.customization.visibleColumns;
      const next = current.includes(columnId)
        ? current.filter((id) => id !== columnId)
        : [...current, columnId];
      return {
        customization: { ...state.customization, visibleColumns: next },
      };
    }),

  setVisibleColumns: (visibleColumns) =>
    set((state) => ({
      customization: { ...state.customization, visibleColumns },
    })),

  setGanttListHeaderColor: (color) => set({ ganttListHeaderColor: color }),

  setShowDependencies: (showDependencies) => set({ showDependencies }),
  setAvailableScales: (availableScales) => set({ availableScales }),
  setMilestoneBackgroundColor: (milestoneBackgroundColor) =>
    set({ milestoneBackgroundColor }),
  setMilestoneShape: (milestoneShape) => set({ milestoneShape }),
}));

// ── Selectors ──
export const selectDashboardTasks = (state: DashboardStore) => state.tasks;
export const selectDashboardIsLoading = (state: DashboardStore) =>
  state.isLoading;
export const selectExpandedIds = (state: DashboardStore) => state.expandedIds;
export const selectIsTaskExpanded = (id: string) => (state: DashboardStore) =>
  !!state.expandedIds[id];
export const selectRowHeight = (state: DashboardStore) => state.rowHeight;

export const selectByParent = (state: DashboardStore) => state.byParent;
export const selectPositionedTasks = (state: DashboardStore) =>
  state.positionedTasks;
export const selectVisibleTaskCount = (state: DashboardStore) =>
  state.visibleTaskCount;

export const selectTimelineStart = (state: DashboardStore) =>
  state.timelineStart;
export const selectTimelineEnd = (state: DashboardStore) => state.timelineEnd;
export const selectScale = (state: DashboardStore) => state.scale;

export const selectCustomization = (state: DashboardStore) =>
  state.customization;
export const selectVisibleColumns = (state: DashboardStore) =>
  state.customization.visibleColumns;
export const selectTaskBarRadius = (state: DashboardStore) =>
  state.customization.taskBarRadius;
export const selectTaskBarColor = (state: DashboardStore) =>
  state.customization.taskBarColor;
export const selectTaskBarProgressColor = (state: DashboardStore) =>
  state.customization.taskBarProgressColor;
export const selectProjectBarColor = (state: DashboardStore) =>
  state.customization.projectBarColor;
export const selectShowTitle = (state: DashboardStore) =>
  state.customization.showTitle;
export const selectTaskDoubleClick = (state: DashboardStore) =>
  state.customization.onTaskDoubleClick;
export const selectGanttListHeaderColor = (state: DashboardStore) =>
  state.ganttListHeaderColor;
export const selectTimelineShowDayLabels = (state: DashboardStore) =>
  state.customization.timeline?.showDayLabels ?? true;
export const selectTimelineHeaderColor = (state: DashboardStore) =>
  state.customization.timeline?.headerColor ?? "slate";
export const selectTimelineWeekendColor = (state: DashboardStore) =>
  state.customization.timeline?.weekendColor ?? "slate";
export const selectTimelineTodayColor = (state: DashboardStore) =>
  state.customization.timeline?.todayColor ?? "slate";
export const selectShowDependencyArrows = (state: DashboardStore) =>
  state.customization.dependencyArrows?.showDependencies ?? true;

export const selectShowDependencies = (state: DashboardStore) =>
  state.showDependencies;
export const selectShowDayLabels = (state: DashboardStore) =>
  state.showDayLabels;
export const selectAvailableScales = (state: DashboardStore) =>
  state.availableScales;
export const selectMilestoneBackgroundColor = (state: DashboardStore) =>
  state.milestoneBackgroundColor;
export const selectMilestoneShape = (state: DashboardStore) =>
  state.milestoneShape;

// NEW: Date/Time format selectors
export const selectDateFormat = (state: DashboardStore) =>
  state.customization.dateFormat;
export const selectTimeFormat = (state: DashboardStore) =>
  state.customization.timeFormat;

export const selectVisibleTasks = (state: DashboardStore): VisibleTask[] => {
  return state.positionedTasks;
};
