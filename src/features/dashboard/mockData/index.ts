import type { Task } from '../types';

export const mockTasks: Task[] = [
  {
    id: 'p-1',
    title: 'Project Alpha: System Migration',
    assignee: 'Alice',
    status: 'in-progress',
    startDate: '2026-08-01',
    endDate: '2026-08-15',
    type: 'project',
    children: [
      {
        id: 't-1-1',
        title: 'Phase 1: Database Setup',
        status: 'done',
        startDate: '2026-08-01',
        endDate: '2026-08-05',
        type: 'task',
        children: [
          {
            id: 't-1-1-1',
            title: 'Provision AWS RDS',
            assignee: 'Bob',
            status: 'done',
            startDate: '2026-08-01',
            endDate: '2026-08-02',
            type: 'task'
          },
          {
            id: 't-1-1-2',
            title: 'Run Schema Migrations',
            assignee: 'Alice',
            status: 'done',
            startDate: '2026-08-03',
            endDate: '2026-08-05',
            type: 'task',
            predecessors: ['t-1-1-1']
          }
        ]
      },
      {
        id: 'm-1-1',
        title: 'Database Ready',
        status: 'done',
        startDate: '2026-08-05',
        endDate: '2026-08-05',
        type: 'milestone',
        predecessors: ['t-1-1-2']
      },
      {
        id: 't-1-2',
        title: 'Phase 2: API Gateway Integration',
        assignee: 'Charlie',
        status: 'in-progress',
        startDate: '2026-08-06',
        endDate: '2026-08-15',
        type: 'task',
        predecessors: ['m-1-1']
      }
    ]
  },
  {
    id: 'p-2',
    title: 'Project Beta: Frontend Redesign',
    status: 'todo',
    startDate: '2026-09-01',
    endDate: '2026-10-15',
    type: 'project',
    children: [
      {
        id: 't-2-1',
        title: 'Design System Overhaul',
        assignee: 'Diana',
        status: 'todo',
        startDate: '2026-09-01',
        endDate: '2026-09-10',
        type: 'task',
        children: [
          {
            id: 't-2-1-1',
            title: 'Typography Update',
            status: 'todo',
            startDate: '2026-09-01',
            endDate: '2026-09-03',
            type: 'task'
          }
        ]
      },
      {
        id: 'm-2-1',
        title: 'Design Freeze',
        status: 'todo',
        startDate: '2026-09-10',
        endDate: '2026-09-10',
        type: 'milestone',
        predecessors: ['t-2-1']
      }
    ]
  }
];
