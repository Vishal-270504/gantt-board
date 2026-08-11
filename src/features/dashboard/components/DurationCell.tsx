import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatDate, type FormatDateOptions } from '../utils/date';
import { useDashboardStore, selectDateFormat, selectTimeFormat } from '../store/useDashboardStore';

interface DurationCellProps {
  startDate: string;
  endDate: string;
  width: number;
  dateFormat?: FormatDateOptions['dateFormat'];
  timeFormat?: FormatDateOptions['timeFormat'];
}

export function DurationCell({ startDate, endDate, width, dateFormat: dateFormatProp, timeFormat: timeFormatProp }: DurationCellProps) {
  const dateFormatStore = useDashboardStore(selectDateFormat);
  const timeFormatStore = useDashboardStore(selectTimeFormat);

  const dateOptions: FormatDateOptions = {
    dateFormat: dateFormatProp ?? dateFormatStore,
    timeFormat: timeFormatProp ?? timeFormatStore,
    showTime: true,
  };

  const durationMs = new Date(endDate).getTime() - new Date(startDate).getTime();
  const totalHours = Math.max(0, Math.floor(durationMs / (60 * 60 * 1000)));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  const parts = [];
  if (days > 0) {
    parts.push(`${days} day${days > 1 ? 's' : ''}`);
  }
  if (hours > 0) {
    parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
  }

  const durationStr = parts.length > 0 ? parts.join(' and ') : '0 hours';

  const tooltipContent = `${formatDate(startDate, dateOptions)} → ${formatDate(endDate, dateOptions)} (${durationStr})`;

  return (
    <div
      className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0 text-muted-foreground"
      style={{ width }}
    >
      <TooltipProvider delayDuration={1150}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="truncate">{durationStr}</span>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltipContent}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}