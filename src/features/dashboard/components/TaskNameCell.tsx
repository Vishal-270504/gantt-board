import type { Task } from '../types';
import { ExpandCollapseButton } from './ExpandCollapseButton';
import { GANTT_COLUMNS } from '../constants';
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
}

export function TaskNameCell({ task, depth, isExpanded, hasChildren }: TaskNameCellProps) {
  return (
    <div
      className="p-2 border-r border-border truncate flex items-center h-full flex-shrink-0"
      style={{
        width: GANTT_COLUMNS[0].width,
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