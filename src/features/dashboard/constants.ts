export interface GanttColumn {
  id: string;
  label: string;
  width?: string | number;
}

export type ColumnWidths = Record<string, number>;

export function getInitialColumnWidths(): ColumnWidths {
  const widths: ColumnWidths = {};
  for (const col of GANTT_COLUMNS) {
    widths[col.id] = typeof col.width === 'number'
      ? col.width
      : Number.parseInt(col.width ?? '0', 10);
  }
  return widths;
}

export const GANTT_COLUMNS: GanttColumn[] = [
  { id: 'title', label: 'Task Name', width: '250px' },
  { id: 'startDate', label: 'Start Date', width: '160px' },
  { id: 'endDate', label: 'End Date', width: '160px' },
  { id: 'duration', label: 'Duration', width: '140px' },
  { id: 'progress', label: 'Progress', width: '90px' },
  { id: 'predecessor', label: 'Predecessor', width: '130px' },
];
