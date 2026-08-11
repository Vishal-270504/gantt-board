import { useMemo } from "react";
import { getGridConfig } from "../../features/Timeline/ScaleConfig";
import type { TimelineScale } from "../../features/dashboard/types";

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  scale: TimelineScale;
  rowHeight: number;
  rowCount: number;
  startRow: number; // first visible row index (from virtualizer)
  endRow: number;   // last visible row index (from virtualizer)
}

export function TimelineGrid({
  startDate,
  endDate,
  scale,
  rowHeight,
  rowCount,
  startRow,
  endRow,
}: TimelineGridProps) {
  const config = useMemo(
    () => getGridConfig(startDate, endDate, scale),
    [startDate, endDate, scale],
  );

  const clampedStart = Math.max(0, startRow);
  const clampedEnd = Math.min(rowCount - 1, endRow);

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
      {Array.from(
        { length: Math.max(0, clampedEnd - clampedStart + 1) },
        (_, i) => clampedStart + i,
      ).map((rowIndex) => (
        <div
          key={`h-${rowIndex}`}
          className="absolute left-0 right-0 border-b"
          style={{ top: rowIndex * rowHeight }}
        />
      ))}
    </div>
  );
}