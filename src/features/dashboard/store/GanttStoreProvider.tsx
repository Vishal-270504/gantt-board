import { useState } from "react";
import type { ReactNode } from "react";
import type { StoreApi } from "zustand";
import { GanttStoreContext, createDashboardStore } from "./useDashboardStore";
import type { DashboardStore } from "./useDashboardStore";

export function GanttStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState<StoreApi<DashboardStore>>(() =>
    createDashboardStore(),
  );
  return (
    <GanttStoreContext.Provider value={store}>
      {children}
    </GanttStoreContext.Provider>
  );
}