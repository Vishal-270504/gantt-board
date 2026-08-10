import { DashboardLayout, mockTasks } from "./features/dashboard";

export default function App() {
  return (
    <div className="min-h-screen w-full">
      <DashboardLayout
        tasks={mockTasks}
        styleOptions={{
          rowHeight: 40,
          taskBar: {
            barColor: "indigo",
            progressColor: "emerald",
            radius: 'full',
          },
        }}
        
        displayOptions={{ scale: "day" }}
      />
    </div>
  );
}
