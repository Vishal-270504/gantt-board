import type { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: 'p-1',
    title: 'Project Alpha: System Migration',
    assignee: 'Alice',
    progress: 50,
    startDate: '2026-08-01',
    endDate: '2026-08-15',
    duration: 15,
    type: 'project',
    parentId: null
  },
  {
    id: 't-1-1',
    title: 'Phase 1: Database Setup',
    progress: 100,
    startDate: '2026-08-01',
    endDate: '2026-08-05',
    duration: 5,
    type: 'task',
    parentId: 'p-1'
  },
  {
    id: 't-1-1-1',
    title: 'Provision AWS RDS',
    assignee: 'Bob',
    progress: 100,
    startDate: '2026-08-01',
    endDate: '2026-08-02',
    duration: 2,
    type: 'task',
    parentId: 't-1-1'
  },
  {
    id: 't-1-1-2',
    title: 'Run Schema Migrations',
    assignee: 'Alice',
    progress: 100,
    startDate: '2026-08-03',
    endDate: '2026-08-05',
    duration: 3,
    type: 'task',
    predecessors: ['t-1-1-1'],
    parentId: 't-1-1'
  },
  {
    id: 'm-1-1',
    title: 'Database Ready',
    progress: 100,
    startDate: '2026-08-05',
    endDate: '2026-08-05',
    duration: 0,
    type: 'milestone',
    predecessors: ['t-1-1-2'],
    parentId: 'p-1'
  },
  {
    id: 't-1-2',
    title: 'Phase 2: API Gateway Integration',
    assignee: 'Charlie',
    progress: 20,
    startDate: '2026-08-06',
    endDate: '2026-08-15',
    duration: 10,
    type: 'task',
    predecessors: ['m-1-1'],
    parentId: 'p-1'
  },
  {
    id: 'p-2',
    title: 'Project Beta: Frontend Redesign',
    progress: 0,
    startDate: '2026-09-01',
    endDate: '2026-10-15',
    duration: 45,
    type: 'project',
    parentId: null
  },
  {
    id: 't-2-1',
    title: 'Design System Overhaul',
    assignee: 'Diana',
    progress: 0,
    startDate: '2026-09-01',
    endDate: '2026-09-10',
    duration: 10,
    type: 'task',
    parentId: 'p-2'
  },
  {
    id: 't-2-1-1',
    title: 'Typography Update',
    progress: 0,
    startDate: '2026-09-01',
    endDate: '2026-09-03',
    duration: 3,
    type: 'task',
    parentId: 't-2-1'
  },
  {
    id: 'm-2-1',
    title: 'Design Freeze',
    progress: 0,
    startDate: '2026-09-10',
    endDate: '2026-09-10',
    duration: 0,
    type: 'milestone',
    predecessors: ['t-2-1'],
    parentId: 'p-2'
  }
];
