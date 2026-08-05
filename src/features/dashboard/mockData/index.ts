import type { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: 'p-1',
    title: 'Project Alpha: System Migration',
    assignee: 'Alice',
    progress: 50,
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-15T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 't-1-1',
    title: 'Phase 1: Database Setup',
    progress: 100,
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-05T17:00:00',
    type: 'task',
    parentId: 'p-1'
  },
  {
    id: 't-1-1-1',
    title: 'Provision AWS RDS',
    assignee: 'Bob',
    progress: 100,
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-02T17:00:00',
    type: 'task',
    parentId: 't-1-1'
  },
  {
    id: 't-1-1-2',
    title: 'Run Schema Migrations',
    assignee: 'Alice',
    progress: 100,
    startDate: '2026-08-03T09:00:00',
    endDate: '2026-08-05T17:00:00',
    type: 'task',
    predecessors: ['t-1-1-1'],
    parentId: 't-1-1'
  },
  {
    id: 'm-1-1',
    title: 'Database Ready',
    progress: 100,
    startDate: '2026-08-05T17:00:00',
    endDate: '2026-08-05T17:00:00',
    type: 'milestone',
    predecessors: ['t-1-1-2'],
    parentId: 'p-1'
  },
  {
    id: 't-1-2',
    title: 'Phase 2: API Gateway Integration',
    assignee: 'Charlie',
    progress: 20,
    startDate: '2026-08-06T09:00:00',
    endDate: '2026-08-15T17:00:00',
    type: 'task',
    predecessors: ['m-1-1'],
    parentId: 'p-1'
  },
  {
    id: 'p-2',
    title: 'Project Beta: Frontend Redesign',
    progress: 0,
    startDate: '2026-09-01T09:00:00',
    endDate: '2026-10-15T17:00:00',
    type: 'project',
    parentId: null
  },
  {
    id: 't-2-1',
    title: 'Design System Overhaul',
    assignee: 'Diana',
    progress: 0,
    startDate: '2026-09-01T09:00:00',
    endDate: '2026-09-10T17:00:00',
    type: 'task',
    parentId: 'p-2'
  },
  {
    id: 't-2-1-1',
    title: 'Typography Update',
    progress: 0,
    startDate: '2026-09-01T09:00:00',
    endDate: '2026-09-03T17:00:00',
    type: 'task',
    parentId: 't-2-1'
  },
  {
    id: 'm-2-1',
    title: 'Design Freeze',
    progress: 0,
    startDate: '2026-09-10T17:00:00',
    endDate: '2026-09-10T17:00:00',
    type: 'milestone',
    predecessors: ['t-2-1'],
    parentId: 'p-2'
  }
];
