import type { GanttColumn, ColumnWidths, GanttCustomization, GanttColor, DateFormat, TimeFormat } from './types';

// Re-export column types consumed elsewhere in the dashboard
export type { GanttColumn, ColumnWidths };

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
  visibleColumns: ['title', 'startDate', 'endDate', 'duration', 'progress', 'predecessor'],
  dateFormat: 'DD MMM YYYY',
  timeFormat: '24-hour',
  projectBarColor: "blue",
};

// ── Column Definitions ──
export const GANTT_COLUMNS: GanttColumn[] = [
  { id: 'title', label: 'Task Name', width: '250px' },
  { id: 'startDate', label: 'Start Date', width: '160px' },
  { id: 'endDate', label: 'End Date', width: '160px' },
  { id: 'duration', label: 'Duration', width: '140px' },
  { id: 'progress', label: 'Progress', width: '90px' },
  { id: 'predecessor', label: 'Predecessor', width: '130px' },
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