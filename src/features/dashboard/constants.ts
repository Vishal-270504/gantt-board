export interface GanttColumn {
  id: string;
  label: string;
  width?: string | number;
}

export const GANTT_COLUMNS: GanttColumn[] = [
  { id: 'title', label: 'Task Name', width: '250px' },
  { id: 'startDate', label: 'Start Date', width: '100px' },
  { id: 'endDate', label: 'End Date', width: '100px' },
  { id: 'duration', label: 'Duration', width: '80px' },
  { id: 'progress', label: 'Progress', width: '100px' },
  { id: 'predecessor', label: 'Predecessor', width: '100px' },
  { id: 'addTask', label: 'Add Task', width: 140 },
];
