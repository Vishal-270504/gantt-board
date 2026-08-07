import { useState } from 'react';
import { GanttTableHeader } from './GanttTableHeader';
import { GanttTableBody } from './GanttTableBody';
import { getInitialColumnWidths, type ColumnWidths } from '../constants';

export function GanttTable() {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(getInitialColumnWidths);

  const updateColumnWidth = (columnId: string, width: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [columnId]: width,
    }));
  };

  return (
    <div className="flex flex-col h-full bg-background relative text-sm w-max min-w-full">
      <GanttTableHeader columnWidths={columnWidths} onColumnResize={updateColumnWidth} />
      <GanttTableBody columnWidths={columnWidths} />
    </div>
  );
}