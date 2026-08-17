import { describe, it, expect, vi } from 'vitest';
import { validateTasks } from '../store/useDashboardStore';
import type { Task } from '../types';

describe('Task validation', () => {
  let consoleWarnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  it('should warn for missing task id', () => {
    const tasks: any[] = [
      {
        title: 'Task without ID',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
      },
    ];

    validateTasks(tasks);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('invalid or missing id'));
  });

  it('should warn for missing task title', () => {
    const tasks: any[] = [
      {
        id: 'task-1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
      },
    ];

    validateTasks(tasks);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('invalid or missing title'));
  });

  it('should warn for invalid start date', () => {
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

    validateTasks(tasks);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('invalid startDate'));
  });

  it('should warn for invalid end date', () => {
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

    validateTasks(tasks);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('invalid endDate'));
  });

  it('should warn for invalid progress value', () => {
    const tasks: any[] = [
      {
        id: 'task-1',
        title: 'Task with invalid progress',
        progress: 150,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
      },
    ];

    validateTasks(tasks);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('invalid progress value'));
  });

  it('should warn for invalid task type', () => {
    const tasks: any[] = [
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

    validateTasks(tasks);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('invalid type'));
  });

  it('should warn for invalid predecessors format', () => {
    const tasks: any[] = [
      {
        id: 'task-1',
        title: 'Task with invalid predecessors',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
        predecessors: 'not-an-array',
      },
    ];

    validateTasks(tasks);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('invalid predecessors'));
  });

  it('should detect circular dependencies', () => {
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

    validateTasks(tasks);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Circular dependency detected'));
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
        predecessors: ['task-1'], // Self-reference
      },
    ];

    validateTasks(tasks);
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Circular dependency detected'));
  });

  it('should not warn for valid tasks', () => {
    const tasks: Task[] = [
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

    validateTasks(tasks);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should handle empty tasks array', () => {
    validateTasks([]);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
  });

  it('should warn for non-array tasks', () => {
    validateTasks(null as any);
    expect(consoleWarnSpy).toHaveBeenCalledWith('Tasks must be an array');
  });
});