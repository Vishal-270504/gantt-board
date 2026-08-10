import { useMemo } from "react";
import { getGridConfig } from "../../features/Timeline/ScaleConfig";
import type { TimelineScale } from "../../features/dashboard/types";

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  scale: TimelineScale;
  rowHeight: number;
  rowCount: number;
  scrollTop: number;
  containerHeight: number;
}

export function TimelineGrid({
  startDate,
  endDate,
  scale,
  rowHeight,
  rowCount,
  scrollTop,
  containerHeight,
}: TimelineGridProps) {
  const config = useMemo(
    () => getGridConfig(startDate, endDate, scale),
    [startDate, endDate, scale],
  );

  // Only render visible rows
  const startRow = Math.max(0, Math.floor(scrollTop / rowHeight));
  const endRow = Math.min(
    rowCount - 1,
    Math.ceil((scrollTop + containerHeight) / rowHeight),
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Vertical time grid lines */}
      {config.lines.map((line, i) => (
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 border-l"
          style={{ left: line.offset }}
        />
      ))}

      {/* Horizontal row grid lines - only visible rows */}
      {Array.from({ length: endRow - startRow + 1 }, (_, i) => startRow + i).map(
        (rowIndex) => (
          <div
            key={`h-${rowIndex}`}
            className="absolute left-0 right-0 border-b"
            style={{ top: rowIndex * rowHeight }}
          />
        ),
      )}
    </div>
  );
}