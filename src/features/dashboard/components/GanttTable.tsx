import { GanttTableHeader } from './GanttTableHeader';
import { GanttTableBody } from './GanttTableBody';

export function GanttTable() {
  return (
    <div className="flex flex-col h-full bg-background relative text-sm w-max min-w-full">
      <GanttTableHeader />
      <GanttTableBody />
    </div>
  );
}
