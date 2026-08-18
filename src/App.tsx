import { Gantt, mockTasks } from "./features/dashboard";

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Gantt
        tasks={mockTasks}
        styleOptions={{
          rowHeight: 50,
          taskBar: {
            barColor: "amber",
            projectBarColor: "amber",
            progressColor: "emerald",
            radius: "md",
            showTitle: true,
          },

          milestone: { shape: "square" },
          timeline: {
            headerColor: 'rose',
            weekendColor: "amber",
            todayColor: "rose"
          },
        }}
        displayOptions={{
          scale: "day",
          showDependencies: true,
          showDayLabels: true,
          timeFormat: "12-hour"
        }}
        onTaskDoubleClick={() => {
          // Task double-click behavior can be wired up here.
        }}
      />
    </div>
  );
}
