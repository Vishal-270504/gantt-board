import { useEffect, useRef, useState } from 'react';
import { GANTT_COLUMNS, type ColumnWidths, COLOR_TO_BG_CLASS } from '../constants';
import { useDashboardStore, selectVisibleColumns, selectGanttListHeaderColor, selectScale, selectTimelineShowDayLabels } from '../store/useDashboardStore';
import { getHeaderHeight } from '../../Timeline/ScaleConfig';
import clsx from 'clsx';

interface GanttTableHeaderProps {
  widths: ColumnWidths;
  onColumnResize: (columnId: string, width: number) => void;
}

const MIN_COLUMN_WIDTH = 80;

export function GanttTableHeader({ widths, onColumnResize }: GanttTableHeaderProps) {
  const visibleColumns = useDashboardStore(selectVisibleColumns);
  const headerColor = useDashboardStore(selectGanttListHeaderColor);
  const scale = useDashboardStore(selectScale);
  const showDayLabels = useDashboardStore(selectTimelineShowDayLabels);
  const headerHeight = getHeaderHeight(showDayLabels, scale);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const dragState = useRef<{
    columnId: string;
    startX: number;
    startWidth: number;
  } | null>(null);

  useEffect(() => {
    if (!resizingColumn) return;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [resizingColumn]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    const delta = e.clientX - dragState.current.startX;
    const nextWidth = Math.max(MIN_COLUMN_WIDTH, dragState.current.startWidth + delta);
    onColumnResize(dragState.current.columnId, nextWidth);
  };

  const stopResize = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current) return;
    dragState.current = null;
    setResizingColumn(null);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const startResize = (e: React.PointerEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    dragState.current = {
      columnId,
      startX: e.clientX,
      startWidth: widths[columnId],
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setResizingColumn(columnId);
  };

  const visibleCols = GANTT_COLUMNS.filter((col) => visibleColumns.includes(col.id));
  const headerBgClass = headerColor ? COLOR_TO_BG_CLASS[headerColor] : 'bg-muted/90';

  return (
    <div className={clsx("sticky top-0 z-10 flex backdrop-blur-sm border-b border-border text-sm font-medium text-muted-foreground w-max min-w-full", headerBgClass)} style={{ height: `${headerHeight}px` }}>
      {visibleCols.map((col) => (
        <div
          key={col.id}
          className="p-2 border-r border-border last:border-r-0 truncate flex-shrink-0 h-full flex items-center relative"
          style={{ width: widths[col.id] }}
        >
          {col.label}
          <div
            className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize active:bg-primary/40 hover:bg-primary/30"
            onPointerDown={(e) => startResize(e, col.id)}
            onPointerMove={handlePointerMove}
            onPointerUp={stopResize}
            onPointerCancel={stopResize}
          />
        </div>
      ))}
    </div>
  );
}