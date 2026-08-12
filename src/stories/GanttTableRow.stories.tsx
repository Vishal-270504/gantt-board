import type { Meta, StoryObj } from '@storybook/react-vite';
import { GanttTableRow } from './GanttTableRow';

const meta: Meta<typeof GanttTableRow> = {
  title: 'Dashboard/GanttTableRow',
  component: GanttTableRow,
  tags: ['autodocs'],
  args: {
    widths: {
      title: 250,
      startDate: 160,
      endDate: 160,
      duration: 140,
      progress: 90,
      predecessor: 130,
    },
  },
};

export default meta;
type Story = StoryObj<typeof GanttTableRow>;

const mockTask = {
  id: 't-1-1',
  title: 'Phase 1: Database Setup',
  assignee: 'Bob',
  progress: 80,
  startDate: '2026-08-01T09:00:00',
  endDate: '2026-08-05T17:00:00',
  type: 'task' as const,
  parentId: 'p-1',
  predecessors: [] as string[],
};

const mockMilestone = {
  id: 'm-1',
  title: 'Project Kickoff Complete',
  assignee: 'Alice',
  progress: 100,
  startDate: '2026-08-01T09:00:00',
  endDate: '2026-08-01T17:00:00',
  type: 'milestone' as const,
  parentId: null,
  predecessors: [] as string[],
};

const mockTaskWithPredecessors = {
  ...mockTask,
  id: 't-1-2',
  title: 'Phase 2: API Development',
  predecessors: ['t-1-1', 't-1-3'],
};

export const Default: Story = {
  args: {
    task: mockTask,
    depth: 1,
    isExpanded: false,
    hasChildren: true,
  },
};

export const Expanded: Story = {
  args: { ...Default.args, isExpanded: true },
};

export const Collapsed: Story = {
  args: { ...Default.args, isExpanded: false },
};

export const NoChildren: Story = {
  args: { ...Default.args, hasChildren: false },
};

export const DeepNesting: Story = {
  args: { ...Default.args, depth: 5 },
};

export const RootLevel: Story = {
  args: { ...Default.args, depth: 0 },
};

export const Milestone: Story = {
  args: {
    task: mockMilestone,
    depth: 0,
    isExpanded: false,
    hasChildren: false,
  },
};

export const ZeroProgress: Story = {
  args: {
    ...Default.args,
    task: { ...mockTask, progress: 0 },
  },
};

export const HalfProgress: Story = {
  args: {
    ...Default.args,
    task: { ...mockTask, progress: 50 },
  },
};

export const FullProgress: Story = {
  args: {
    ...Default.args,
    task: { ...mockTask, progress: 100 },
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    task: {
      ...mockTask,
      title: 'Phase 1: Database Setup - Migration Scripts, Schema Design, and Index Optimization for Production Environment',
    },
  },
};

export const SinglePredecessor: Story = {
  args: {
    ...Default.args,
    task: {
      ...mockTask,
      id: 't-1-2',
      title: 'Phase 2: API Development',
      predecessors: ['t-1-1'],
    },
  },
};

export const MultiplePredecessors: Story = {
  args: {
    ...Default.args,
    task: mockTaskWithPredecessors,
  },
};

export const OneDayDuration: Story = {
  args: {
    ...Default.args,
    task: {
      ...mockTask,
      startDate: '2026-08-01T09:00:00',
      endDate: '2026-08-01T17:00:00',
    },
  },
};

export const TwentyDayDuration: Story = {
  args: {
    ...Default.args,
    task: {
      ...mockTask,
      startDate: '2026-08-01T09:00:00',
      endDate: '2026-08-20T17:00:00',
    },
  },
};