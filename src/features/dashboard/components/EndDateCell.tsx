import { formatDate, type FormatDateOptions } from '../utils/date';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useDashboardStore, selectDateFormat, selectTimeFormat } from '../store/useDashboardStore';

interface EndDateCellProps {
  dateString: string;
  width: number;
  dateFormat?: FormatDateOptions['dateFormat'];
  timeFormat?: FormatDateOptions['timeFormat'];
}

export function EndDateCell({ dateString, width, dateFormat: dateFormatProp, timeFormat: timeFormatProp }: EndDateCellProps) {
  const dateFormatStore = useDashboardStore(selectDateFormat);
  const timeFormatStore = useDashboardStore(selectTimeFormat);

  const options: FormatDateOptions = {
    dateFormat: dateFormatProp ?? dateFormatStore,
    timeFormat: timeFormatProp ?? timeFormatStore,
    showTime: true,
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0 text-muted-foreground cursor-default"
          style={{ width }}
        >
          {formatDate(dateString, options)}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        {formatDate(dateString, options)}
      </TooltipContent>
    </Tooltip>
  );
}