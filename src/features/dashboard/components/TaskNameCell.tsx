import type { Task } from '../types';
import { ExpandCollapseButton } from './ExpandCollapseButton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TaskNameCellProps {
  task: Task;
  depth: number;
  isExpanded: boolean;
  hasChildren: boolean;
  width: number;
}

export function TaskNameCell({ task, depth, isExpanded, hasChildren, width }: TaskNameCellProps) {
  return (
    <div
      className="p-2 border-r border-border truncate flex items-center h-full flex-shrink-0"
      style={{
        width,
        paddingLeft: `${depth * 16 + 8}px`, // Dynamic indentation
      }}
    >
      <ExpandCollapseButton 
        taskId={task.id} 
        isExpanded={isExpanded} 
        hasChildren={hasChildren} 
      />
      
      <TooltipProvider delayDuration={1150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="truncate font-medium">
              {task.title}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{task.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {task.type === 'milestone' && (
        <span className="ml-2 text-xs bg-muted/50 px-1.5 py-0.5 rounded text-muted-foreground font-normal border">
          Milestone
        </span>
      )}
    </div>
  );
}