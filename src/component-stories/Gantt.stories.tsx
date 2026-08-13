import type { Meta, StoryObj } from '@storybook/react-vite';
import { Gantt } from '../features/dashboard/components/Gantt';
import { mockTasks } from "../features/dashboard/mockData";
import type { Task, TimelineScale } from "../features/dashboard/types";

function GanttWrapper({ scale, ...rest }: { scale: TimelineScale } & React.ComponentProps<typeof Gantt>) {
  return <Gantt {...rest} displayOptions={{ scale }} />;
}

const meta: Meta<typeof GanttWrapper> = {
  title: 'Dashboard/Gantt',
  component: GanttWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    scale: {
      control: 'select',
      options: ['hour', 'day', 'week', 'month', 'quarter', 'year'],
      description: 'Timeline zoom level',
    },
    onTaskDoubleClick: {
      action: 'taskDoubleClicked',
      description: 'Callback when a task is double-clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GanttWrapper>;

const defaultArgs = {
  tasks: mockTasks as Task[],
  scale: 'week' as TimelineScale,
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const WithDoubleClickHandler: Story = {
  args: {
    ...defaultArgs,
    onTaskDoubleClick: (task: Task) => {
      alert(`Task double-clicked: ${task.title}`);
    },
  },
};

export const CustomStyleOptions: Story = {
  args: {
    ...defaultArgs,
    styleOptions: {
      rowHeight: 50,
      taskBar: {
        barColor: 'emerald' as const,
        progressColor: 'blue' as const,
        radius: 'full' as const,
      },
      milestone: {
        backgroundColor: 'amber' as const,
        shape: 'circle' as const,
      },
      timeline: {
        todayColor: 'rose' as const,
        weekendColor: 'slate' as const,
        headerColor: 'blue' as const,
      },
    },
  },
};  