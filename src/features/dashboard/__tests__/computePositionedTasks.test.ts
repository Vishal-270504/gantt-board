import { describe, it, expect } from 'vitest';
import type { Task, TimelineScale } from '../types';
import { computePositionedTasks } from '../store/useDashboardStore';

describe('computePositionedTasks', () => {
  const timelineStart = new Date('2026-08-01T00:00:00');
  const scale: TimelineScale = 'day';

  it('should handle empty tasks array', () => {
    const result = computePositionedTasks([], {}, scale, timelineStart);
    expect(result).toEqual([]);
  });

  it('should compute positioned tasks for flat task list', () => {
    const tasks: Task[] = [
      {
        id: 'task-1',
        title: 'Task 1',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: null,
      },
      {
        id: 'task-2',
        title: 'Task 2',
        progress: 0,
        startDate: '2026-08-06T00:00:00',
        endDate: '2026-08-10T00:00:00',
        type: 'task',
        parentId: null,
      },
    ];

    const result = computePositionedTasks(tasks, {}, scale, timelineStart);
    expect(result.length).toBe(2);
    expect(result[0].left).toBe(0); // task-1 starts at timelineStart
    expect(result[1].left).toBeGreaterThan(0); // task-2 starts later
  });

  it('should compute positioned tasks for nested hierarchies', () => {
    const tasks: Task[] = [
      {
        id: 'parent',
        title: 'Parent Task',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-10T00:00:00',
        type: 'project',
        parentId: null,
      },
      {
        id: 'child-1',
        title: 'Child Task 1',
        progress: 0,
        startDate: '2026-08-02T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'task',
        parentId: 'parent',
      },
      {
        id: 'child-2',
        title: 'Child Task 2',
        progress: 0,
        startDate: '2026-08-06T00:00:00',
        endDate: '2026-08-09T00:00:00',
        type: 'task',
        parentId: 'parent',
      },
    ];

    // Test with parent collapsed
    const collapsedResult = computePositionedTasks(tasks, {}, scale, timelineStart);
    expect(collapsedResult.length).toBe(1); // Only parent visible
    expect(collapsedResult[0].id).toBe('parent');

    // Test with parent expanded
    const expandedResult = computePositionedTasks(tasks, { parent: true }, scale, timelineStart);
    expect(expandedResult.length).toBe(3); // Parent + 2 children
    expect(expandedResult[0].id).toBe('parent');
    expect(expandedResult[1].id).toBe('child-1');
    expect(expandedResult[2].id).toBe('child-2');
    expect(expandedResult[1].depth).toBe(1);
    expect(expandedResult[2].depth).toBe(1);
  });

  it('should handle milestone tasks with zero width', () => {
    const tasks: Task[] = [
      {
        id: 'milestone-1',
        title: 'Milestone',
        progress: 0,
        startDate: '2026-08-05T00:00:00',
        endDate: '2026-08-05T00:00:00',
        type: 'milestone',
        parentId: null,
      },
    ];

    const result = computePositionedTasks(tasks, {}, scale, timelineStart);
    expect(result.length).toBe(1);
    expect(result[0].width).toBe(0); // Milestones have zero width
  });

  it('should throw for invalid dates', () => {
    const tasks: Task[] = [
      {
        id: 'invalid-task',
        title: 'Invalid Date Task',
        progress: 0,
        startDate: 'invalid-date',
        endDate: 'invalid-date',
        type: 'task',
        parentId: null,
      },
    ];

    expect(() => computePositionedTasks(tasks, {}, scale, timelineStart)).toThrow(
      'Invalid date: invalid-date',
    );
  });

  it('should compute correct depth for deeply nested tasks', () => {
    const tasks: Task[] = [
      {
        id: 'level-0',
        title: 'Level 0',
        progress: 0,
        startDate: '2026-08-01T00:00:00',
        endDate: '2026-08-10T00:00:00',
        type: 'project',
        parentId: null,
      },
      {
        id: 'level-1',
        title: 'Level 1',
        progress: 0,
        startDate: '2026-08-02T00:00:00',
        endDate: '2026-08-09T00:00:00',
        type: 'project',
        parentId: 'level-0',
      },
      {
        id: 'level-2',
        title: 'Level 2',
        progress: 0,
        startDate: '2026-08-03T00:00:00',
        endDate: '2026-08-08T00:00:00',
        type: 'task',
        parentId: 'level-1',
      },
    ];

    const result = computePositionedTasks(tasks, { 'level-0': true, 'level-1': true }, scale, timelineStart);
    expect(result.length).toBe(3);
    expect(result[0].depth).toBe(0);
    expect(result[1].depth).toBe(1);
    expect(result[2].depth).toBe(2);
  });
});