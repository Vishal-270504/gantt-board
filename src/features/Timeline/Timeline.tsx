import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useDashboardStore, selectTimelineStart, selectTimelineEnd, selectScale } from '../dashboard/store/useDashboardStore';
import { useGanttController } from './useGanttController';
import { TimelineHeader } from '../../components/ui/TimelineHeader';
import { TimelineGrid } from '../../components/ui/TimelineGrid.tsx';
import { TaskBar } from '../../components/ui/Taskbar.tsx';
import { MilestoneMarker } from '../../components/ui/MilestoneMarker.tsx';
import type { TimelineScale } from '../dashboard/types/index.ts';

const SCALES: TimelineScale[] = ['year', 'quarter', 'month', 'week', 'day', 'hour'];

export function Timeline() {
  const timelineStart = useDashboardStore(selectTimelineStart);
  const timelineEnd = useDashboardStore(selectTimelineEnd);
  const scale = useDashboardStore(selectScale);
  const setScale = useDashboardStore((s) => s.setScale);
  const setScrollTop = useDashboardStore((s) => s.setScrollTop);
  const positionedTasks = useGanttController();

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-end p-2 border-b">
        <Select value={scale} onValueChange={(v) => setScale(v as TimelineScale)}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            {SCALES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <TimelineHeader startDate={timelineStart} endDate={timelineEnd} scale={scale} />

      <ScrollArea className="flex-1" onScrollCapture={(e) => setScrollTop((e.target as HTMLElement).scrollTop)}>
        <div className="relative">
          <TimelineGrid startDate={timelineStart} endDate={timelineEnd} scale={scale} rowHeight={36} rowCount={positionedTasks.length} />
          {positionedTasks.map((t) =>
            t.type === 'milestone' ? (
              <MilestoneMarker key={t.id} left={t.left} top={t.top} title={t.title} />
            ) : (
              <TaskBar
                key={t.id}
                left={t.left}
                width={t.width}
                top={t.top}
                height={t.rowHeight - 8}
                progress={t.progress}
                title={t.title}
                assignee={t.assignee}
                type={t.type}
              />
            )
          )}
        </div>
      </ScrollArea>
    </div>
  );
}