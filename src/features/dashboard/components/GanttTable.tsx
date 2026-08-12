import { useState } from "react";
import { GanttTableHeader } from "./GanttTableHeader";
import { VirtualizedGanttTableBody } from "./VirtualizedGanttTableBody";
import { GANTT_COLUMNS, getInitialColumnWidths } from "../constants";
import type { ColumnWidths } from "../constants";
import { useDashboardStore, selectVisibleColumns } from "../store/useDashboardStore";

interface GanttTableProps {
  // syncScrollTop?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export function GanttTable({ containerRef, onScroll }: GanttTableProps) {
  const [widths, setWidths] = useState<ColumnWidths>(getInitialColumnWidths);
  const visibleColumns = useDashboardStore(selectVisibleColumns);

  const totalWidth = GANTT_COLUMNS.reduce(
    (sum, col) => (visibleColumns.includes(col.id) ? sum + widths[col.id] : sum),
    0,
  );

  const handleColumnResize = (columnId: string, width: number) => {
    setWidths((prev) => ({ ...prev, [columnId]: width }));
  };

  return (
    <div className="flex flex-col h-full overflow-x-auto overflow-y-hidden">
      <GanttTableHeader widths={widths} onColumnResize={handleColumnResize} />
      <VirtualizedGanttTableBody
        widths={widths}
        totalWidth={totalWidth}
        onScroll={onScroll}
        containerRef={containerRef}
      />
    </div>
  );
}