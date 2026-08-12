import React, { useMemo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { SCALE_CONFIGS } from "../../features/Timeline/ScaleConfig";
import type { TimelineScale } from "../../features/dashboard/types";

interface TimelineGridProps {
  startDate: Date;
  endDate: Date;
  scale: TimelineScale;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const TimelineGrid = React.memo(function TimelineGrid({
  startDate,
  endDate,
  scale,
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
    </div>
  );
});