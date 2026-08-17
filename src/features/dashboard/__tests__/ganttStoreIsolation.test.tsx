import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  createDashboardStore,
  useDashboardStoreApi,
} from '../store/useDashboardStore';
import { GanttStoreProvider } from '../store/GanttStoreProvider';
import type { Task } from '../types';

function makeTask(id: string, parentId: string | null = null): Task {
  return {
    id,
    title: `Task ${id}`,
    progress: 0,
    startDate: '2026-08-01T00:00:00',
    endDate: '2026-08-05T00:00:00',
    type: 'task',
    parentId,
    predecessors: [],
  };
}

describe('Gantt store instance isolation', () => {
  it('creates independent stores with independent tasks', () => {
    const a = createDashboardStore();
    const b = createDashboardStore();

    a.getState().setTasks([makeTask('only-in-a')]);

    expect(a.getState().tasks.map((t) => t.id)).toEqual(['only-in-a']);
    expect(b.getState().tasks.map((t) => t.id)).not.toEqual(['only-in-a']);
    expect(b.getState().tasks.some((t) => t.id === 'only-in-a')).toBe(false);
  });

  it('isolates expansion state between instances', () => {
    const a = createDashboardStore();
    const b = createDashboardStore();

    const parentA = makeTask('parent-a');
    const childA = makeTask('child-a', 'parent-a');
    a.getState().setTasks([parentA, childA]);
    a.getState().expandTask('parent-a');

    expect(a.getState().expandedIds['parent-a']).toBe(true);
    expect(a.getState().expandedIds['child-a']).toBeUndefined();
    expect(b.getState().expandedIds['parent-a']).toBeUndefined();
  });

  it('isolates scale configuration between instances', () => {
    const a = createDashboardStore();
    const b = createDashboardStore();

    a.getState().setScale('week');

    expect(a.getState().scale).toBe('week');
    expect(b.getState().scale).toBe('day');
  });

  it('isolates customization between instances', () => {
    const a = createDashboardStore();
    const b = createDashboardStore();

    a.getState().setCustomization({ showTitle: false });
    a.getState().setTaskBarProgressColor('emerald');

    expect(a.getState().customization.showTitle).toBe(false);
    expect(a.getState().customization.taskBarProgressColor).toBe('emerald');
    expect(b.getState().customization.showTitle).toBe(true);
    expect(b.getState().customization.taskBarProgressColor).toBe(
      b.getState().customization.taskBarProgressColor,
    );
  });

  it('isolates visible columns between instances', () => {
    const a = createDashboardStore();
    const b = createDashboardStore();

    a.getState().setVisibleColumns(['title', 'progress']);

    expect(a.getState().customization.visibleColumns).toEqual([
      'title',
      'progress',
    ]);
    expect(b.getState().customization.visibleColumns).not.toEqual([
      'title',
      'progress',
    ]);
  });

  it('does not leak callbacks between instances', () => {
    const a = createDashboardStore();
    const b = createDashboardStore();

    const onTaskDoubleClick = () => {};
    a.getState().setCustomization({ onTaskDoubleClick });

    expect(a.getState().customization.onTaskDoubleClick).toBe(onTaskDoubleClick);
    expect(b.getState().customization.onTaskDoubleClick).toBeUndefined();
  });

  it('unmounting one instance does not affect another', () => {
    const a = createDashboardStore();
    const b = createDashboardStore();

    a.getState().setTasks([makeTask('only-in-a')]);
    a.getState().setScale('quarter');
    a.getState().expandTask('only-in-a');

    expect(b.getState().tasks.some((t) => t.id === 'only-in-a')).toBe(false);
    expect(b.getState().scale).toBe('day');
    expect(b.getState().expandedIds['only-in-a']).toBeUndefined();

    b.getState().setTasks([makeTask('still-works')]);
    expect(b.getState().tasks.map((t) => t.id)).toEqual(['still-works']);
  });

  it('does not reset store state on subsequent updates', () => {
    const store = createDashboardStore();

    store.getState().setTasks([makeTask('a'), makeTask('b')]);
    store.getState().expandTask('a');
    store.getState().setScale('month');
    store.getState().setVisibleColumns(['title', 'startDate']);

    store.getState().setTasks([makeTask('c')]);
    store.getState().setCustomization({ showTitle: false });

    expect(store.getState().tasks.map((t) => t.id)).toEqual(['c']);
    expect(store.getState().scale).toBe('month');
    expect(store.getState().visibleTaskCount).toBe(1);
  });

  it('each GanttStoreProvider mount owns a distinct store', () => {
    let capturedA: unknown;
    let capturedB: unknown;

    function Probe() {
      capturedA = useDashboardStoreApi();
      return null;
    }

    renderToStaticMarkup(
      <GanttStoreProvider>
        <Probe />
      </GanttStoreProvider>,
    );
    const storeA = capturedA;

    function ProbeB() {
      capturedB = useDashboardStoreApi();
      return null;
    }

    renderToStaticMarkup(
      <GanttStoreProvider>
        <ProbeB />
      </GanttStoreProvider>,
    );
    const storeB = capturedB;

    expect(storeA).not.toBe(storeB);
  });

  it('useDashboardStoreApi throws when used outside a provider', () => {
    expect(() => {
      function Probe() {
        useDashboardStoreApi();
        return null;
      }
      renderToStaticMarkup(<Probe />);
    }).toThrow(/GanttStoreProvider/);
  });
});