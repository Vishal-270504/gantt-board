export interface Task {
  id: string;
  title: string;
  assignee?: string;
  progress: number; // 1 - 100
  startDate: string; // ISO 8601 date string
  endDate: string; // ISO 8601 date string
  duration: number;
  type?: 'project' | 'task' | 'milestone';
  predecessors?: string[]; // Array of dependency Task IDs
  parentId: string | null;
}