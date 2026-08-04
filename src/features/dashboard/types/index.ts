export interface Task {
  id: string;
  title: string;
  assignee?: string;
  status: 'todo' | 'in-progress' | 'done';
  startDate: string; // ISO 8601 date string
  endDate: string; // ISO 8601 date string
  type?: 'project' | 'task' | 'milestone';
  predecessors?: string[]; // Array of dependency Task IDs
  children?: Task[]; // Supports unlimited nested hierarchy
}
