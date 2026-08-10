import { useMemo, useRef, useEffect, useState, useCallback } from "react";
import type { PositionedTask } from "../dashboard/types";

const ROW_HEIGHT = 40;
const OVERSCAN = 3; // extra rows above/below viewport

interface VirtualizedRowsResult {
  /** The subset of tasks that should be rendered */
  visibleTasks: PositionedTask[];
  /** Total scrollable height */
  totalHeight: number;
  /** Current scrollTop of the shared viewport */
  scrollTop: number;
  /** Attach this ref to the scroll container */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Call this on scroll events */
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

/**
 * Shared virtualization hook for both the table and timeline.
 * Both panels mount this hook and share scroll state via a lightweight
 * pub/sub so they stay pixel-perfect aligned without fighting each other.
 */
export function useVirtualizedRows(
  positionedTasks: PositionedTask[],
  containerHeight: number,
): VirtualizedRowsResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = useMemo(
    () => positionedTasks.length * ROW_HEIGHT,
    [positionedTasks.length],
  );

  const { startIndex, endIndex } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
    const end = Math.min(
      positionedTasks.length - 1,
      Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT) + OVERSCAN,
    );
    return { startIndex: start, endIndex: end };
  }, [scrollTop, containerHeight, positionedTasks.length]);

  const visibleTasks = useMemo(
    () => positionedTasks.slice(startIndex, endIndex + 1),
    [positionedTasks, startIndex, endIndex],
  );

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return {
    visibleTasks,
    totalHeight,
    scrollTop,
    containerRef,
    onScroll,
  };
}

export { ROW_HEIGHT, OVERSCAN };