import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createDashboardStore } from '../store/useDashboardStore';
import type { Task } from '../types';

const validTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Valid Task',
    progress: 50,
    startDate: '2026-08-01T00:00:00',
    endDate: '2026-08-05T00:00:00',
    type: 'task',
    parentId: null,
    predecessors: [],
  },
];

function createStoreWithTasks(tasks: Task[]) {
  const store = createDashboardStore();
  store.getState().setTasks(tasks);
  return store;
}

describe('Task validation', () => {
  it('should reject missing task id', () => {
    const tasks = [
      {
        title: 'Task without ID',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task' as const,
        parentId: null,
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks as unknown as Task[])).toThrow('invalid or missing id');
  });

  it('should reject missing task title', () => {
    const tasks = [
      {
        id: 'task-1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task' as const,
        parentId: null,
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks as unknown as Task[])).toThrow('invalid or missing title');
  });

  it('should reject invalid start date before timeline calculation', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task with invalid start date',
        progress: 0,
        startDate: 'invalid-date',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks)).toThrow('invalid or missing startDate');
  });

  it('should reject invalid end date before timeline calculation', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task with invalid end date',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: 'invalid-date',
        type: 'task',
        parentId: null,
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks)).toThrow('invalid or missing endDate');
  });

  it('should reject invalid progress value', () => {
    const tasks = [
      {
        id: 'task-1',
        title: 'Task with invalid progress',
        progress: 150,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task' as const,
        parentId: null,
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks as unknown as Task[])).toThrow('invalid progress value');
  });

  it('should reject invalid task type', () => {
    const tasks = [
      {
        id: 'task-1',
        title: 'Task with invalid type',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'invalid-type',
        parentId: null,
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks as unknown as Task[])).toThrow('invalid type');
  });

  it('should reject invalid predecessors format', () => {
    const tasks = [
      {
        id: 'task-1',
        title: 'Task with invalid predecessors',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task' as const,
        parentId: null,
        predecessors: 'not-an-array',
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks as unknown as Task[])).toThrow('invalid predecessors');
  });

  it('should reject duplicate task IDs', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task 1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
        predecessors: [],
      },
      {
        id: 'task-1',
        title: 'Task 2',
        progress: 0,
        startDate: '2026-08-06T00:00:00',
        endDate: '2026-08-10T00:00:00',
        type: 'task',
        parentId: null,
        predecessors: [],
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks)).toThrow('Duplicate task ID');
  });

  it('should reject nonexistent parentId', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task 1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: 'nonexistent',
        predecessors: [],
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks)).toThrow('invalid parentId');
  });

  it('should reject missing predecessor IDs', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task 1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
        predecessors: ['nonexistent'],
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks)).toThrow('invalid predecessor');
  });

  it('should detect circular dependencies (predecessor cycles)', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task 1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
        predecessors: ['task-2'],
      },
      {
        id: 'task-2',
        title: 'Task 2',
        progress: 0,
        startDate: '2026-08-06T00:00:00',
        endDate: '2026-08-10T00:00:00',
        type: 'task',
        parentId: null,
        predecessors: ['task-1'],
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks)).toThrow('Circular dependency detected');
  });

  it('should detect self-referencing circular dependencies', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task 1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
        predecessors: ['task-1'],
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks)).toThrow('Circular dependency detected');
  });

  it('should detect parent hierarchy cycles', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task 1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: 'task-2',
        predecessors: [],
      },
      {
        id: 'task-2',
        title: 'Task 2',
        progress: 0,
        startDate: '2026-08-06T00:00:00',
        endDate: '2026-08-10T00:00:00',
        type: 'task',
        parentId: 'task-1',
        predecessors: [],
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks)).toThrow('Hierarchy cycle detected');
  });

  it('should detect self-referencing parent hierarchy cycle', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task 1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: 'task-1',
        predecessors: [],
      },
    ];

    expect(() => createDashboardStore().getState().setTasks(tasks)).toThrow('Hierarchy cycle detected');
  });

  it('should not throw for valid tasks', () => {
    expect(() => createDashboardStore().getState().setTasks(validTasks)).not.toThrow();
  });

  it('should handle empty tasks array', () => {
    expect(() => createDashboardStore().getState().setTasks([])).not.toThrow();
  });

  it('should throw for non-array tasks', () => {
    expect(() => createDashboardStore().getState().setTasks(null as unknown as Task[])).toThrow('Tasks must be an array');
  });

  it('should preserve previous valid state when setTasks receives invalid tasks', () => {
    const store = createStoreWithTasks(validTasks);
    const previousTasks = store.getState().tasks;

    expect(() => store.getState().setTasks([
      {
        id: 'task-1',
        title: 'Invalid Task',
        progress: 0,
        startDate: 'invalid-date',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
        predecessors: [],
      } as Task,
    ])).toThrow();

    expect(store.getState().tasks).toBe(previousTasks);
  });

  it('should preserve positionedTasks and other derived state when invalid tasks are rejected', () => {
    const store = createStoreWithTasks(validTasks);
    const previousPositionedTasks = store.getState().positionedTasks;

    expect(() => store.getState().setTasks([
      {
        id: 'task-1',
        title: 'Invalid Task',
        progress: 0,
        startDate: 'invalid-date',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
        predecessors: [],
      } as Task,
    ])).toThrow();

    expect(store.getState().positionedTasks).toBe(previousPositionedTasks);
  });

  it('should not mutate state before validation completes (atomic update)', () => {
    const store = createStoreWithTasks(validTasks);
    const initialTasks = store.getState().tasks;
    const initialPositioned = store.getState().positionedTasks;

    expect(() => store.getState().setTasks([
      {
        title: 'No ID',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task' as const,
        parentId: null,
      },
    ] as unknown as Task[])).toThrow();

    expect(store.getState().tasks).toBe(initialTasks);
    expect(store.getState().positionedTasks).toBe(initialPositioned);
  });
});