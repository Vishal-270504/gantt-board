import { useRef, useEffect } from "react";

export function useSyncedScroll() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const syncLeft = () => {
      if (isSyncing.current) return;
      isSyncing.current = true;
      right.scrollTop = left.scrollTop;
      isSyncing.current = false;
    };

    const syncRight = () => {
      if (isSyncing.current) return;
      isSyncing.current = true;
      left.scrollTop = right.scrollTop;
      isSyncing.current = false;
    };

    left.addEventListener("scroll", syncLeft, { passive: true });
    right.addEventListener("scroll", syncRight, { passive: true });

    return () => {
      left.removeEventListener("scroll", syncLeft);
      right.removeEventListener("scroll", syncRight);
    };
  }, []);

  return { leftRef, rightRef };
}