import type { Meta, StoryObj } from '@storybook/react-vite';
import { TaskBar } from './Taskbar';
import type { GanttColor, GanttCustomization } from '../../features/dashboard/types';

const meta: Meta<typeof TaskBar> = {
  title: 'Dashboard/TaskBar',
  component: TaskBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    barColor: {
      control: 'select',
      options: ['slate', 'blue', 'indigo', 'emerald', 'amber', 'rose', 'violet', 'cyan'],
      description: 'Background color of the task bar',
    },
    progressColor: {
      control: 'select',
      options: ['slate', 'blue', 'indigo', 'emerald', 'amber', 'rose', 'violet', 'cyan'],
      description: 'Color of the progress fill',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Corner radius of the task bar',
    },
  },
  decorators: [
    (Story) => (
      <div className="relative w-[800px] h-[400px] border-2 border-red-500 bg-white">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TaskBar>;

const defaultArgs = {
  left: 50,
  width: 200,
  top: 20,
  height: 32,
  progress: 75,
  title: 'Database Setup',
  assignee: 'Bob',
  type: 'task' as const,
  barColor: 'blue' as GanttColor,
  progressColor: 'indigo' as GanttColor,
  radius: 'md' as GanttCustomization['taskBarRadius'],
};

export const Default: Story = {
  args: { ...defaultArgs },
};

export const Project: Story = {
  args: {
    ...defaultArgs,
    type: 'project',
    title: 'Phase 1: Infrastructure',
    progress: 50,
  },
};

export const Milestone: Story = {
  args: {
    ...defaultArgs,
    type: 'milestone',
    title: 'Kickoff Complete',
    progress: 100,
    width: 120,
  },
};

export const ShortTitleFits: Story = {
  args: {
    ...defaultArgs,
    title: 'API',
    width: 80,
  },
};

export const LongTitleOverflow: Story = {
  args: {
    ...defaultArgs,
    title: 'Phase 1: Database Setup - Migration Scripts, Schema Design, and Index Optimization',
    width: 100,
  },
};

export const ZeroProgress: Story = {
  args: {
    ...defaultArgs,
    progress: 0,
  },
};

export const FullProgress: Story = {
  args: {
    ...defaultArgs,
    progress: 100,
  },
};

export const NoAssignee: Story = {
  args: {
    ...defaultArgs,
    assignee: undefined,
  },
};

export const DeepPosition: Story = {
  args: {
    ...defaultArgs,
    top: 100,
    left: 150,
  },
};

// ── Color Palette Stories ──

export const SlateBar: Story = {
  args: { ...defaultArgs, barColor: 'slate' as GanttColor, progressColor: 'slate' as GanttColor },
};

export const EmeraldBar: Story = {
  args: { ...defaultArgs, barColor: 'emerald' as GanttColor, progressColor: 'emerald' as GanttColor },
};

export const AmberBar: Story = {
  args: { ...defaultArgs, barColor: 'amber' as GanttColor, progressColor: 'amber' as GanttColor },
};

export const RoseBar: Story = {
  args: { ...defaultArgs, barColor: 'rose' as GanttColor, progressColor: 'rose' as GanttColor },
};

export const VioletBar: Story = {
  args: { ...defaultArgs, barColor: 'violet' as GanttColor, progressColor: 'violet' as GanttColor },
};

export const CyanBar: Story = {
  args: { ...defaultArgs, barColor: 'cyan' as GanttColor, progressColor: 'cyan' as GanttColor },
};

// ── Radius Stories ──

export const RadiusNone: Story = {
  args: { ...defaultArgs, radius: 'none' as GanttCustomization['taskBarRadius'] },
};

export const RadiusSmall: Story = {
  args: { ...defaultArgs, radius: 'sm' as GanttCustomization['taskBarRadius'] },
};

export const RadiusLarge: Story = {
  args: { ...defaultArgs, radius: 'lg' as GanttCustomization['taskBarRadius'] },
};

export const RadiusFull: Story = {
  args: { ...defaultArgs, radius: 'full' as GanttCustomization['taskBarRadius'] },
};

// ── Mixed Color Combo ──

export const BlueBarIndigoProgress: Story = {
  args: {
    ...defaultArgs,
    barColor: 'blue' as GanttColor,
    progressColor: 'indigo' as GanttColor,
  },
};

export const SlateBarEmeraldProgress: Story = {
  args: {
    ...defaultArgs,
    barColor: 'slate' as GanttColor,
    progressColor: 'emerald' as GanttColor,
  },
};