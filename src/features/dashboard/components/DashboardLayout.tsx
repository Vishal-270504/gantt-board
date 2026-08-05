import { GanttTable } from './GanttTable';
import { TimelinePlaceholder } from './TimelinePlaceholder';
import { useDashboardStore } from '../store/useDashboardStore';
import type { Task } from '../types';
import { useState } from 'react';
import { AddTaskDialog } from './AddTaskDialog';

export function DashboardLayout() {
  const tasks = useDashboardStore(state => state.tasks);
  const expandedIds = useDashboardStore(state => state.expandedIds);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Derive flat list of currently visible tasks for the timeline
  const getVisibleTasks = (): Task[] => {
    const visible: Task[] = [];
    const addVisibleChildren = (parentId: string | null) => {
      const children = tasks.filter(t => t.parentId === parentId);
      children.forEach(child => {
        visible.push(child);
        if (expandedIds[child.id]) {
          addVisibleChildren(child.id);
        }
      });
    };
    addVisibleChildren(null);
    return visible;
  };

  const visibleTasks = getVisibleTasks();
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* 
        Left Panel: Fixed Task Table Container
        Flex-shrink-0 prevents it from squishing. 
        Overflow-auto allows independent horizontal/vertical scrolling for the table.
      */}
      <aside className="w-[400px] lg:w-[500px] flex-shrink-0 h-full overflow-auto border-r z-10 bg-card">
        <GanttTable onAddTask={() => setIsAddTaskOpen(true)} />
      </aside>

      {/* 
        Right Panel: Timeline Container Placeholder
      */}
      <main className="flex-1 h-full overflow-auto relative bg-muted/10">
        <TimelinePlaceholder visibleTasks={visibleTasks} />
      </main>

      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
      />
    </div>
  );
}