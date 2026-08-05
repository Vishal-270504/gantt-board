export interface GanttColumn {
  id: string;
  label: string;
  width?: string | number;
}

export const GANTT_COLUMNS: GanttColumn[] = [
  { id: 'title', label: 'Task Name', width: '250px' },
  { id: 'startDate', label: 'Start Date', width: '160px' },
  { id: 'endDate', label: 'End Date', width: '160px' },
  { id: 'duration', label: 'Duration', width: '140px' },
  { id: 'progress', label: 'Progress', width: '90px' },
  { id: 'predecessor', label: 'Predecessor', width: '130px' },
  { id: 'addTask', label: 'Add Task', width: 120 },
];
