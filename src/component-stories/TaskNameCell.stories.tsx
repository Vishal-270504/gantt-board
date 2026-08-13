import type { Meta, StoryObj } from '@storybook/react';
import { TaskNameCell } from '../features/dashboard/components/TaskNameCell';

const meta: Meta<typeof TaskNameCell> = {
  title: 'Dashboard/TaskNameCell',
  component: TaskNameCell,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TaskNameCell>;

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
  args: { ...Default.args, depth: 4 },
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

export const LongTitle: Story = {
  args: {
    ...Default.args,
    task: {
      ...mockTask,
      title: 'Phase 1: Database Setup - Migration Scripts, Schema Design, and Index Optimization for Production Environment',
    },
  },
};