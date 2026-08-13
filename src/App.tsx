import { Gantt, mockTasks } from "./features/dashboard";

export default function App() {
  function myFn() {
    console.log("Some log");
  }
  return (
    <div className="min-h-screen w-full">
      <Gantt
        tasks={mockTasks}
        styleOptions={{
          rowHeight: 40,
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
          showDependencies: false,
          showDayLabels: false,
        }}
        onTaskDoubleClick={myFn}
      />
    </div>
  );
}
