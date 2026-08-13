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
            barColor: "emerald",
            projectBarColor: "rose",
            progressColor: "emerald",
            radius: "full",
            showTitle: true,
          },

          milestone: { shape: "circle" },
          timeline: {
            // headerColor: 'rose',
            // weekendColor: "amber",
            // todayColor: "rose"
          },
        }}
        displayOptions={{ scale: "day", showDependencies: false }}
        onTaskDoubleClick={myFn}
      />
    </div>
  );
}
