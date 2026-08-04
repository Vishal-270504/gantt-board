import { mockTasks } from '../mockData';

export function DashboardTable() {
  return (
    <div className="w-full h-full p-4 overflow-auto border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="pb-2 font-medium text-gray-500">Title</th>
            <th className="pb-2 font-medium text-gray-500">Assignee</th>
            <th className="pb-2 font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockTasks.map((task) => (
            <tr key={task.id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="py-2">{task.title}</td>
              <td className="py-2">{task.assignee || 'Unassigned'}</td>
              <td className="py-2 capitalize">{task.status.replace('-', ' ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
