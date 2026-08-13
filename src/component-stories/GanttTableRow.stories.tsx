import type { Meta, StoryObj } from '@storybook/react-vite';
import { GanttTableRow } from '../features/dashboard/components/GanttTableRow';
import type { ColumnConfig } from '../features/dashboard/types/index';
import { mockTasks } from '../features/dashboard/mockData/index';

const meta: Meta<any> = {
  title: 'Dashboard/GanttTableRow',
  component: GanttTableRow,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    rowHeight: {
      control: 'number',
      description: 'Height of the row in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<any>;

const defaultColumns: ColumnConfig[] = [
  { key: 'title', visible: true, width: 250 },
  { key: 'startDate', visible: true, width: 160 },
  { key: 'endDate', visible: true, width: 160 },
  { key: 'duration', visible: true, width: 140 },
  { key: 'progress', visible: true, width: 90 },
  { key: 'predecessors', visible: true, width: 130 },
];

const defaultArgs = {
  task: mockTasks[0],
  columns: defaultColumns,
  rowHeight: 40,
  isExpanded: false,
  onToggleExpand: () => {},
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const TallRow: Story = {
  args: {
    ...defaultArgs,
    rowHeight: 60,
  },
};

export const ShortRow: Story = {
  args: {
    ...defaultArgs,
    rowHeight: 30,
  },
};

export const ExpandedRow: Story = {
  args: {
    ...defaultArgs,
    isExpanded: true,
  },
};

export const ProjectTask: Story = {
  args: {
    ...defaultArgs,
    task: mockTasks.find(t => t.type === 'project') || mockTasks[0],
  },
};

export const MilestoneTask: Story = {
  args: {
    ...defaultArgs,
    task: mockTasks.find(t => t.type === 'milestone') || mockTasks[0],
  },
};