import { create } from 'zustand';
import type { Task } from '../types';
import { mockTasks } from '../mockData';

interface DashboardState {
  tasks: Task[];
  expandedIds: Record<string, boolean>;
  isLoading: boolean;
}

interface DashboardActions {
  expandTask: (id: string) => void;
  collapseTask: (id: string) => void;
  toggleExpand: (id: string) => void;
  expandAll: (ids: string[]) => void;
  collapseAll: () => void;
  setIsLoading: (loading: boolean) => void;
}

type DashboardStore = DashboardState & DashboardActions;

export const useDashboardStore = create<DashboardStore>((set) => ({
  tasks: mockTasks,
  expandedIds: {},
  isLoading: false,

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
}));

// Selectors
export const selectDashboardTasks = (state: DashboardStore) => state.tasks;
export const selectDashboardIsLoading = (state: DashboardStore) => state.isLoading;
export const selectExpandedIds = (state: DashboardStore) => state.expandedIds;
export const selectIsTaskExpanded = (id: string) => (state: DashboardStore) => !!state.expandedIds[id];
