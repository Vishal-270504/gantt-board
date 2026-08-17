import { useCallback, useState, useMemo } from "react";
import { GanttTableHeader } from "./GanttTableHeader";
import { VirtualizedGanttTableBody } from "./VirtualizedGanttTableBody";
import { GANTT_COLUMNS, getInitialColumnWidths } from "../constants";
import type { ColumnWidths, GanttColumn } from "../constants";
import { useDashboardStore, selectVisibleColumns } from "../store/useDashboardStore";
import type { ColumnConfig, Task } from "../types";

interface GanttTableProps {
  containerRef: React.RefObject<HTMLDivElement>;
  columns?: ColumnConfig[];
  onTaskDoubleClick?: (task: Task) => void;
}

export function GanttTable({ containerRef, columns, onTaskDoubleClick }: GanttTableProps) {
  const [widths, setWidths] = useState<ColumnWidths>(getInitialColumnWidths);
  const visibleColumns = useDashboardStore(selectVisibleColumns);

  // Get the effective columns to display based on props or defaults
  const effectiveColumns = useMemo<GanttColumn[]>(() => {
    if (columns && columns.length > 0) {
      // Use the columns from props, but filter to only those that are visible
      return GANTT_COLUMNS.filter(col => visibleColumns.includes(col.id as string));
    }
    // Fall back to the default behavior
    return GANTT_COLUMNS.filter(col => visibleColumns.includes(col.id));
  }, [columns, visibleColumns]);

  // Calculate widths based on column configurations
  const columnWidths = useMemo<ColumnWidths>(() => {
    const initialWidths = getInitialColumnWidths();

    if (columns && columns.length > 0) {
      const newWidths = { ...initialWidths };
      columns.forEach(col => {
        if (col.width !== undefined) {
          newWidths[col.key] = col.width;
        }
      });
      return newWidths;
    }

    return widths;
  }, [columns, widths]);

  const totalWidth = effectiveColumns.reduce(
    (sum, col) => sum + (columnWidths[col.id] || 0),
    0,
  );

  const handleColumnResize = useCallback((columnId: string, width: number) => {
    setWidths((prev) => ({ ...prev, [columnId]: width }));
  }, []);

  return (
    <div className="flex flex-col h-full overflow-x-auto overflow-y-hidden">
      <GanttTableHeader widths={columnWidths} onColumnResize={handleColumnResize} />
      <VirtualizedGanttTableBody
        widths={columnWidths}
        totalWidth={totalWidth}
        containerRef={containerRef}
        columns={columns}
        onTaskDoubleClick={onTaskDoubleClick}
      />
    </div>
  );
}
