import { useEffect } from "react";
import { useDashboardStore, selectScale } from "../store/useDashboardStore";

export function ScaleNavbar() {
  const scale = useDashboardStore(selectScale);
  const setScale = useDashboardStore((s) => s.setScale);
  const availableScales = useDashboardStore((s) => s.availableScales);
  const setAvailableScales = useDashboardStore((s) => s.setAvailableScales);

  useEffect(() => {
    setAvailableScales(availableScales);
  }, []);
  return (
    <nav className="flex items-center gap-3 px-4 h-12 border-b border-border bg-card z-30 shrink-0">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        Scale
      </span>
      <div className="flex items-center gap-1.5 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {availableScales.map((s) => (
          <button
            key={s}
            onClick={() => setScale(s)}
            className={`px-3 py-1 text-xs font-medium rounded-full capitalize whitespace-nowrap transition-all duration-200 cursor-pointer ${
              scale === s
                ? "bg-primary text-primary-foreground shadow-sm font-semibold"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </nav>
  );
}
