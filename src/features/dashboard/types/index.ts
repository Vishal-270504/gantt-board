// ── Color Palette (predefined, not arbitrary) ──
export type GanttColor =
  | "slate"
  | "blue"
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "cyan";

// ── Date/Time Format Options ──
export type DateFormat =
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "YYYY-MM-DD"
  | "DD MMM YYYY";
export type TimeFormat = "12-hour" | "24-hour";

// ── Core Task Types ──
export interface Task {
  id: string;
  title: string;
  assignee?: string;
  progress: number; // 1 - 100
  startDate: string; // ISO 8601 date string
  endDate: string; // ISO 8601 date string
  type?: "project" | "task" | "milestone";
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

/**
 * A flattened, draw-order (parent before children) visible task with the
 * horizontal geometry needed to render its Gantt bar. Vertical position is
 * intentionally omitted here - it is derived at render time by the virtualizer.
 */
export interface GanttRow extends VisibleTask {
  left: number;
  width: number;
}

export type TimelineScale =
  | "year"
  | "quarter"
  | "month"
  | "week"
  | "day"
  | "hour";

export type TaskbarRadiusType = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type MilestoneShape = 'diamond' | 'circle' | 'square' | 'triangle';;
export interface DisplayOptions {
  scale?: TimelineScale;
  availableScales?: TimelineScale[];
  showDependencies?: boolean;
  showDayLabels?: boolean;
  timeFormat?: TimeFormat;
  showDependenices?: boolean;
}

// ── Column Configuration ──
export type ColumnKey =
  | "title"
  | "startDate"
  | "endDate"
  | "duration"
  | "progress"
  | "predecessors"
  | "assignee";

export interface ColumnConfig {
  key: ColumnKey;
  visible?: boolean;
  width?: number;
  dateFormat?: DateFormat;
  render?: (task: Task) => React.ReactNode;
}

// ── Gantt Customization ──
export interface GanttCustomization {
  visibleColumns: string[];
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  ganttList?: {
    headerColor?: GanttColor;
  };

  // timeline
  taskBarRadius: TaskbarRadiusType;
  projectBarColor: GanttColor;
  taskBarProgressColor: GanttColor;
  taskBarColor: GanttColor;
  showTitle: boolean;
  
  onTaskDoubleClick?: (task: Task) => void;

  timeline?: {
    weekendColor: GanttColor;
    headerColor: GanttColor;
    todayColor: GanttColor;
    showDayLabels: boolean;
  };

  // dependency arrow
  dependencyArrows?: {
    showDependencies?: boolean;
  };
}

// ── Gantt Table Columns ──
export interface GanttColumn {
  id: string;
  label: string;
  width: number | string;
}

export type ColumnWidths = Record<string, number>;
