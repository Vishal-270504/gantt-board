import type { Task } from '../types';
import type { ColumnWidths } from '../constants';
import { useDashboardStore, selectDashboardIsLoading } from '../store/useDashboardStore';
import { GanttTableRow } from './GanttTableRow';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';

interface TaskNodeProps {
  task: Task;
  allTasks: Task[];
  depth: number;
  columnWidths: ColumnWidths;
}

// Recursive component to handle hierarchy
function TaskNode({ task, allTasks, depth, columnWidths }: TaskNodeProps) {
  const expandedIds = useDashboardStore((state) => state.expandedIds);
  const isExpanded = !!expandedIds[task.id];
  
  const children = allTasks.filter((t) => t.parentId === task.id);
  const hasChildren = children.length > 0;

  return (
    <>
      <GanttTableRow 
        task={task} 
        depth={depth} 
        isExpanded={isExpanded} 
        hasChildren={hasChildren}
        columnWidths={columnWidths}
      />
      
      {isExpanded && hasChildren && children.map((child) => (
        <TaskNode key={child.id} task={child} allTasks={allTasks} depth={depth + 1} columnWidths={columnWidths} />
      ))}
    </>
  );
}

interface GanttTableBodyProps {
  columnWidths: ColumnWidths;
}

export function GanttTableBody({ columnWidths }: GanttTableBodyProps) {
  const tasks = useDashboardStore((state) => state.tasks);
  const isLoading = useDashboardStore(selectDashboardIsLoading);
  
  if (isLoading) {
    return <LoadingState />;
  }

  if (tasks.length === 0) {
    return <EmptyState />;
  }

  const rootTasks = tasks.filter((t) => t.parentId === null);

  return (
    <div className="flex-1 w-full bg-background">
      {rootTasks.map((task) => (
        <TaskNode key={task.id} task={task} allTasks={tasks} depth={0} columnWidths={columnWidths} />
      ))}
    </div>
  );
}