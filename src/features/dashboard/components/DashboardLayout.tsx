import { GanttTable } from './GanttTable';

export function DashboardLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* 
        Left Panel: Fixed Task Table Container
        Flex-shrink-0 prevents it from squishing. 
        Overflow-auto allows independent horizontal/vertical scrolling for the table.
      */}
      <aside className="w-[400px] lg:w-[500px] flex-shrink-0 h-full overflow-auto border-r z-10 bg-card">
        <GanttTable />
      </aside>

      {/* 
        Right Panel: Timeline Container Placeholder
        Flex-1 allows it to take remaining space.
        Overflow-auto prepares it for extensive horizontal scrolling of dates.
      */}
      <main className="flex-1 h-full overflow-auto relative bg-muted/20">
        <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-muted-foreground/30 m-8 rounded-lg text-muted-foreground">
          Timeline Component Placeholder
        </div>
      </main>
    </div>
  );
}
