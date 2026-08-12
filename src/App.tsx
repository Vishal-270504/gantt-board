import { Gantt, mockTasks } from "./features/dashboard";

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <Gantt
        tasks={mockTasks}
        styleOptions={{
          rowHeight: 40,
          taskBar: {
            barColor: "emerald",
            progressColor: "emerald",
            radius: "full",
          },
        }}
        displayOptions={{ scale: "day" }}
      />
    </div>
  );
}
