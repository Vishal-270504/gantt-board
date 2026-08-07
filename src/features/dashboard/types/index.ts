// ── Color Palette (predefined, not arbitrary) ──
export type GanttColor =
  | 'slate'
  | 'blue'
  | 'indigo'
  | 'emerald'
  | 'amber'
  | 'rose'
  | 'violet'
  | 'cyan';

// ── Core Task Types ──
export interface Task {
  id: string;
  title: string;
  assignee?: string;
  progress: number; // 1 - 100
  startDate: string; // ISO 8601 date string
  endDate: string; // ISO 8601 date string
  type?: 'project' | 'task' | 'milestone';
  predecessors?: string[]; // Array of dependency Task IDs
  parentId: string | null;
}

export interface VisibleTask extends Task {
  depth: number;
}

export interface PositionedTask extends VisibleTask {
  left: number;
  width: number;
  top: number;
  rowHeight: number;
}

export type TimelineScale = 'year' | 'quarter' | 'month' | 'week' | 'day' | 'hour';

// ── Gantt Customization ──
export interface GanttCustomization {
  taskBarRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  taskBarColor: GanttColor;
  taskBarProgressColor: GanttColor;
  visibleColumns: string[]; // e.g. ['title', 'startDate', 'endDate', 'progress', 'assignee']
}

// ── Gantt Table Columns ──
export interface GanttColumn {
  id: string;
  label: string;
  width: number | string; // e.g. '250px' (CSS) or raw px number
}

export type ColumnWidths = Record<string, number>;