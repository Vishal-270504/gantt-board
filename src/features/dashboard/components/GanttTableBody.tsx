import type { Task } from '../types';
import { useDashboardStore, selectDashboardIsLoading } from '../store/useDashboardStore';
import { GanttTableRow } from './GanttTableRow';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';

interface TaskNodeProps {
  task: Task;
  allTasks: Task[];
  depth: number;
  onAddTask: () => void;
}

// Recursive component to handle hierarchy
function TaskNode({ task, allTasks, depth, onAddTask }: TaskNodeProps) {
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
        onAddTask={onAddTask}
      />
      
      {isExpanded && hasChildren && children.map((child) => (
        <TaskNode key={child.id} task={child} allTasks={allTasks} depth={depth + 1} onAddTask={onAddTask} />
      ))}
    </>
  );
}

interface GanttTableBodyProps {
  onAddTask: () => void;
}

export function GanttTableBody({
  onAddTask,
}: GanttTableBodyProps) {
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
        <TaskNode key={task.id} task={task} allTasks={tasks} depth={0} onAddTask={onAddTask} />
      ))}
    </div>
  );
}