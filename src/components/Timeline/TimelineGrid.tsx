import React, { useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { SCALE_CONFIGS } from "../../features/Timeline/ScaleConfig";
import type { TimelineScale } from "../../features/dashboard/types";

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  scale: TimelineScale;
  rowHeight: number;
  height: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const TimelineGrid = React.memo(function TimelineGrid({
  startDate,
  endDate,
  scale,
  rowHeight,
  height,
  scrollContainerRef,
}: TimelineGridProps) {
  const { unitCount, unitWidth } = useMemo(() => {
    const cfg = SCALE_CONFIGS[scale];
    const units = cfg.getUnits(startDate, endDate);

    return {
      unitCount: units.length + 1,
      unitWidth: cfg.unitWidth,
    };
  }, [startDate, endDate, scale]);

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: unitCount,
    getScrollElement: () => scrollContainerRef.current,
    estimateSize: () => unitWidth,
    overscan: 50,
  });

  const virtualColumns = columnVirtualizer.getVirtualItems();
  const rowCount = Math.ceil(height / rowHeight);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {virtualColumns.map((vc) => (
        <div
          key={vc.index}
          className="absolute top-0 bottom-0 border-l"
          style={{
            left: vc.index * unitWidth,
          }}
        />
      ))}
      {Array.from({ length: rowCount }).map((_, index) => (
        <div
          key={index}
          className="absolute left-0 right-0 border-b"
          style={{ top: (index + 1) * rowHeight - 1 }}
        />
      ))}
    </div>
  );
});
