import { GANTT_COLUMNS } from '../constants';
import { useDashboardStore } from '../store/useDashboardStore';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface PredecessorCellProps {
  predecessorIds: string[];
}

export function PredecessorCell({ predecessorIds }: PredecessorCellProps) {
  const tasks = useDashboardStore((state) => state.tasks);
  
  // Resolve IDs to human-readable Task Names
  const names = predecessorIds
    .map(id => tasks.find(task => task.id === id)?.title)
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className="p-2 truncate h-full flex items-center flex-shrink-0 text-muted-foreground"
      style={{ width: GANTT_COLUMNS[5].width }}
    >
      {names ? (
        <TooltipProvider delayDuration={1150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate">{names}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{names}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className="italic opacity-50">—</span>
      )}
    </div>
  );
}