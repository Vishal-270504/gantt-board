import { useState } from 'react';
import { GanttTableHeader } from './GanttTableHeader';
import { GanttTableBody } from './GanttTableBody';
import { getInitialColumnWidths, type ColumnWidths } from '../constants';

export interface ColumnConfig {
  widths: ColumnWidths;
  visible: string[];
}

export function GanttTable() {
  const [columnWidths, setColumnWidths] = useState<ColumnWidths>(getInitialColumnWidths);

  const updateColumnWidth = (columnId: string, width: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [columnId]: width,
    }));
  };

  const columnConfig: ColumnConfig = {
    widths: columnWidths,
    visible: [], // populated by children via store selector
  };

  return (
    <div className="flex flex-col h-full bg-background relative text-sm w-max min-w-full">
      <GanttTableHeader widths={columnWidths} onColumnResize={updateColumnWidth} />
      <GanttTableBody widths={columnWidths} />
    </div>
  );
}