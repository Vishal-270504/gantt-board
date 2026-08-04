import type { Task } from '../types';
import { useDashboardStore } from '../store/useDashboardStore';
import { GanttTableRow } from './GanttTableRow';

interface TaskNodeProps {
  task: Task;
  allTasks: Task[];
  depth: number;
}

// Recursive component to handle hierarchy
function TaskNode({ task, allTasks, depth }: TaskNodeProps) {
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
      />
      
      {isExpanded && hasChildren && children.map((child) => (
        <TaskNode key={child.id} task={child} allTasks={allTasks} depth={depth + 1} />
      ))}
    </>
  );
}

export function GanttTableBody() {
  const tasks = useDashboardStore((state) => state.tasks);
  const rootTasks = tasks.filter((t) => t.parentId === null);

  return (
    <div className="flex-1 w-full bg-background">
      {rootTasks.map((task) => (
        <TaskNode key={task.id} task={task} allTasks={tasks} depth={0} />
      ))}
    </div>
  );
}
