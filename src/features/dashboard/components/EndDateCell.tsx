import { formatDate } from '../utils/date';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface EndDateCellProps {
  dateString: string;
  width: number;
}

export function EndDateCell({ dateString, width }: EndDateCellProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0 text-muted-foreground cursor-default"
          style={{ width }}
        >
          {formatDate(dateString)}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        {formatDate(dateString)}
      </TooltipContent>
    </Tooltip>
  );
}