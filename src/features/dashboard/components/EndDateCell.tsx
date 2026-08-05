import { formatDate } from '../utils/date';
import { GANTT_COLUMNS } from '../constants';

interface EndDateCellProps {
  dateString: string;
}

export function EndDateCell({ dateString }: EndDateCellProps) {
  return (
    <div
      className="p-2 border-r border-border truncate h-full flex items-center flex-shrink-0 text-muted-foreground"
      style={{ width: GANTT_COLUMNS[1].width }}
    >
      {formatDate(dateString)}
    </div>
  );
}
