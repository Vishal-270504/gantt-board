import { GanttTableHeader } from './GanttTableHeader';
import { GanttTableBody } from './GanttTableBody';

interface GanttTableProps {
  onAddTask: () => void;
}

export function GanttTable({
  onAddTask,
}: GanttTableProps) {
  return (
    <div className="flex flex-col h-full bg-background relative text-sm w-max min-w-full">
      <GanttTableHeader />
      <GanttTableBody onAddTask={onAddTask} />
    </div>
  );
}