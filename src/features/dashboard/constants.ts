import type { GanttColumn, ColumnWidths, GanttCustomization, GanttColor, DateFormat, TimeFormat } from './types';

// Re-export column types consumed elsewhere in the dashboard
export type { GanttColumn, ColumnWidths };

// ── Color to Tailwind background class mapping ──
export const COLOR_TO_BG_CLASS: Record<GanttColor, string> = {
  slate: 'bg-slate-100 dark:bg-slate-800',
  blue: 'bg-blue-100 dark:bg-blue-800',
  indigo: 'bg-indigo-100 dark:bg-indigo-800',
  emerald: 'bg-emerald-100 dark:bg-emerald-800',
  amber: 'bg-amber-100 dark:bg-amber-800',
  rose: 'bg-rose-100 dark:bg-rose-800',
  violet: 'bg-violet-100 dark:bg-violet-800',
  cyan: 'bg-cyan-100 dark:bg-cyan-800',
};

// ── Allowed Task-Bar Color Palettes ──
export const GANTT_COLORS: GanttColor[] = [
  'slate',
  'blue',
  'indigo',
  'emerald',
  'amber',
  'rose',
  'violet',
  'cyan',
];

// ── Allowed Date Formats ──
export const GANTT_DATE_FORMATS: DateFormat[] = [
  'DD/MM/YYYY',
  'MM/DD/YYYY',
  'YYYY-MM-DD',
  'DD MMM YYYY',
];

// ── Allowed Time Formats ──
export const GANTT_TIME_FORMATS: TimeFormat[] = [
  '12-hour',
  '24-hour',
];

// ── Allowed Radius Options ──
export const GANTT_RADIUS_OPTIONS: GanttCustomization['taskBarRadius'][] = [
  'none',
  'sm',
  'md',
  'lg',
  'full',
];

// ── Default Customization Values ──
export const DEFAULT_GANTT_CUSTOMIZATION: GanttCustomization = {
  taskBarRadius: 'md',
  taskBarColor: 'blue',
  taskBarProgressColor: 'indigo',
  visibleColumns: ['title', 'startDate', 'endDate', 'duration', 'progress', 'predecessors'],
  dateFormat: 'DD MMM YYYY',
  timeFormat: '24-hour',
};

// ── Column Definitions ──
export const GANTT_COLUMNS: GanttColumn[] = [
  { id: 'title', label: 'Task Name', width: '250px' },
  { id: 'startDate', label: 'Start Date', width: '160px' },
  { id: 'endDate', label: 'End Date', width: '160px' },
  { id: 'duration', label: 'Duration', width: '140px' },
  { id: 'progress', label: 'Progress', width: '90px' },
  { id: 'predecessors', label: 'Predecessors', width: '130px' },
  { id: 'assignee', label: 'Assignee', width: '140px' },
];

// ── Column Widths Helper ──
export function getInitialColumnWidths(): ColumnWidths {
  const widths: ColumnWidths = {};
  for (const col of GANTT_COLUMNS) {
    widths[col.id] = typeof col.width === 'number'
      ? col.width
      : Number.parseInt(col.width ?? '0', 10);
  }
  return widths;
}