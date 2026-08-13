import { useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { GanttTable } from '../features/dashboard/components/GanttTable';
import { useDashboardStore } from '../features/dashboard/store/useDashboardStore';
import type { ColumnConfig, Task } from '../features/dashboard/types/index';
import { mockTasks } from '../features/dashboard/mockData/index';

// Wrapper to initialize store and provide required containerRef
function GanttTableWrapper({
  columns,
  onTaskDoubleClick,
}: {
  columns?: ColumnConfig[];
  onTaskDoubleClick?: (task: Task) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setTasks = useDashboardStore((s) => s.setTasks);
  const setVisibleColumns = useDashboardStore((s) => s.setVisibleColumns);
  const tasks = useDashboardStore((s) => s.tasks);

  useEffect(() => {
    setTasks(mockTasks);
    if (columns && columns.length > 0) {
      const visibleCols = columns
        .filter((col) => col.visible !== false)
        .map((col) => col.key);
      setVisibleColumns(visibleCols);
    } else {
      setVisibleColumns(['title', 'startDate', 'endDate', 'duration', 'progress', 'predecessors']);
    }
  }, [columns, setTasks, setVisibleColumns]);

  if (tasks.length === 0) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="h-[400px] w-full border">
      <GanttTable
        containerRef={containerRef}
        columns={columns}
        onTaskDoubleClick={onTaskDoubleClick}
      />
    </div>
  );
}

const meta: Meta<typeof GanttTableWrapper> = {
  title: 'Dashboard/GanttTable',
  component: GanttTableWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    columns: {
      control: 'object',
      description: 'Column configuration for the Gantt table',
    },
    onTaskDoubleClick: {
      action: 'taskDoubleClicked',
      description: 'Callback when a task row is double-clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GanttTableWrapper>;

const defaultColumns: ColumnConfig[] = [
  { key: 'title', visible: true, width: 250 },
  { key: 'startDate', visible: true, width: 160 },
  { key: 'endDate', visible: true, width: 160 },
  { key: 'duration', visible: true, width: 140 },
  { key: 'progress', visible: true, width: 90 },
  { key: 'predecessors', visible: true, width: 130 },
  { key: 'assignee', visible: false, width: 140 },
];

const defaultArgs = {
  columns: defaultColumns,
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const CustomColumns: Story = {
  args: {
    ...defaultArgs,
    columns: [
      { key: 'title', visible: true, width: 300 },
      { key: 'startDate', visible: true, width: 200 },
      { key: 'endDate', visible: false },
      { key: 'duration', visible: true, width: 120 },
      { key: 'progress', visible: true, width: 100 },
      { key: 'assignee', visible: true, width: 150 },
    ],
  },
};

export const MinimalColumns: Story = {
  args: {
    ...defaultArgs,
    columns: [
      { key: 'title', visible: true, width: 200 },
      { key: 'progress', visible: true, width: 80 },
    ],
  },
};

export const CustomRenderers: Story = {
  args: {
    ...defaultArgs,
    columns: [
      {
        key: 'title',
        visible: true,
        width: 250,
        render: (task: Task) => (
          <div className="font-bold text-blue-600">{task.title}</div>
        ),
      },
      {
        key: 'progress',
        visible: true,
        width: 120,
        render: (task: Task) => (
          <div className="w-full h-4 bg-gray-200 rounded-full">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        ),
      },
    ],
  },
};