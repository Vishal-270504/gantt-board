// useSyncedScroll.ts
import { useRef, useCallback } from "react";

/**
 * Imperatively syncs scrollTop between two elements without
 * routing values through React state/props (avoids re-render lag).
 * Guards against feedback loops (A scrolls -> sets B -> B fires scroll -> sets A...).
 */
export function useSyncedScroll() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false);

  const syncFrom = useCallback((source: "left" | "right", scrollTop: number) => {
    if (isSyncing.current) return;
    isSyncing.current = true;

    const target = source === "left" ? rightRef.current : leftRef.current;
    if (target && target.scrollTop !== scrollTop) {
      target.scrollTop = scrollTop;
    }

    // release on next frame, after the browser has applied the scroll
    requestAnimationFrame(() => {
      isSyncing.current = false;
    });
  }, []);

  const onLeftScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => syncFrom("left", e.currentTarget.scrollTop),
    [syncFrom],
  );

  const onRightScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => syncFrom("right", e.currentTarget.scrollTop),
    [syncFrom],
  );

  return { leftRef, rightRef, onLeftScroll, onRightScroll };
}