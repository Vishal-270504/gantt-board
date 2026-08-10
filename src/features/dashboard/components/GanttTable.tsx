import { useState } from "react";
import { GanttTableHeader } from "./GanttTableHeader";
import { VirtualizedGanttTableBody } from "./VirtualizedGanttTableBody";
import { getInitialColumnWidths } from "../constants";
import type { ColumnWidths } from "../constants";

interface GanttTableProps {
  syncScrollTop?: number;
  onScroll?: (scrollTop: number) => void;
}

export function GanttTable({ syncScrollTop, onScroll }: GanttTableProps) {
  const [widths, setWidths] = useState<ColumnWidths>(getInitialColumnWidths);

  const handleColumnResize = (columnId: string, width: number) => {
    setWidths((prev) => ({ ...prev, [columnId]: width }));
  };

  return (
    <div className="flex flex-col h-full">
      <GanttTableHeader widths={widths} onColumnResize={handleColumnResize} />
      <VirtualizedGanttTableBody
        widths={widths}
        syncScrollTop={syncScrollTop}
        onScroll={onScroll}
      />
    </div>
  );
}