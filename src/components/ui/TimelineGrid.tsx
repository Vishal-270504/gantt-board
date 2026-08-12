import { useMemo } from "react";
import { getGridConfig } from "../../features/Timeline/ScaleConfig";
import type { TimelineScale } from "../../features/dashboard/types";
import { useVirtualizer } from "@tanstack/react-virtual";

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  scale: TimelineScale;
  rowHeight: number;
  rowCount: number;
  startRow: number; // first visible row index (from virtualizer)
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  endRow: number; // last visible row index (from virtualizer)
}

export function TimelineGrid({
  startDate,
  endDate,
  scale,
  rowHeight,
  scrollContainerRef,
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

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: config.lines.length,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => config.lines[1].offset - config.lines[0].offset,
    overscan: 25,
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Vertical time grid lines */}

      {Array.from(
        { length: clampedEnd - clampedStart + 1 },
        (_, i) => clampedStart + i,
      ).map((rowIndex) => (
        <div
          key={rowIndex}
          className="absolute left-0 right-0 border-b"
          style={{
            top: rowIndex * rowHeight,
          }}
        />
      ))}

      {virtualColumns.map((vc) => {
        const line = config.lines[vc.index];

        return (
          <div
            key={vc.index}
            className="absolute top-0 bottom-0 border-l"
            style={{
              left: line.offset,
            }}
          />
        );
      })}
    </div>
  );
}
