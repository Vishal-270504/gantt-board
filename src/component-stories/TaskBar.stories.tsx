import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TaskBar } from '../components/Timeline/Taskbar';
import { useDashboardStore } from '@/features/dashboard/store/useDashboardStore';
import type { GanttColor, GanttCustomization } from '@/features/dashboard/types';

// CHANGED: Add TooltipProvider wrapper
import { TooltipProvider } from '@/components/ui/tooltip';

// Keep the story self-contained so it renders reliably in Storybook without
// depending on global store state from other dashboard stories.
function TaskBarWrapper(props: React.ComponentProps<typeof TaskBar> & { showTitle?: boolean }) {
  const { barColor, projectBarColor, progressColor, radius, showTitle, ...rest } = props;
  const setCustomization = useDashboardStore((s) => s.setCustomization);

  useEffect(() => {
    setCustomization({
      taskBarColor: barColor ?? 'blue',
      projectBarColor: projectBarColor ?? 'blue',
      taskBarProgressColor: progressColor ?? 'indigo',
      taskBarRadius: radius ?? 'md',
      showTitle: showTitle !== false,
    });
  }, [barColor, projectBarColor, progressColor, radius, setCustomization, showTitle]);

  return (
    <TaskBar
      {...rest}
      barColor={barColor ?? 'blue'}
      projectBarColor={projectBarColor ?? 'blue'}
      progressColor={progressColor ?? 'indigo'}
      radius={radius ?? 'md'}
      showTitle={showTitle !== false}
    />
  );
}

const meta: Meta<typeof TaskBarWrapper> = {
  title: 'Dashboard/TaskBar',
  component: TaskBarWrapper,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    left: { control: { type: 'number', min: 0, max: 600 } },
    width: { control: { type: 'number', min: 20, max: 500 } },
    top: { control: { type: 'number', min: 0, max: 300 } },
    height: { control: { type: 'number', min: 16, max: 64 } },
    progress: { control: { type: 'range', min: 0, max: 100 } },
    title: { control: 'text' },
    hasParentId: { control: 'boolean' },
    type: { control: 'select', options: ['task', 'project', 'milestone'] },
    barColor: { control: 'select', options: ['slate', 'blue', 'indigo', 'emerald', 'amber', 'rose', 'violet', 'cyan'] },
    projectBarColor: { control: 'select', options: ['slate', 'blue', 'indigo', 'emerald', 'amber', 'rose', 'violet', 'cyan'] },
    progressColor: { control: 'select', options: ['slate', 'blue', 'indigo', 'emerald', 'amber', 'rose', 'violet', 'cyan'] },
    radius: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'full'] },
    assignee: { control: 'text' },
    showTitle: { control: 'boolean' },
    onDoubleClick: { action: 'doubleClicked' },
  },
  decorators: [
    // CHANGED: Wrap with TooltipProvider and use relative container with explicit dimensions
    (Story) => (
      <TooltipProvider>
        <div className="relative w-[800px] h-[400px] border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={`v${i}`} className="absolute top-0 bottom-0 border-l border-gray-300" style={{ left: `${(i + 1) * 10}%` }} />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={`h${i}`} className="absolute left-0 right-0 border-t border-gray-300" style={{ top: `${(i + 1) * 10}%` }} />
            ))}
          </div>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TaskBarWrapper>;

const defaultArgs = {
  left: 100, width: 200, top: 100, height: 32, progress: 75,
  title: 'Database Setup', assignee: 'Bob', hasParentId: true,
  type: 'task' as const, barColor: 'blue' as GanttColor,
  projectBarColor: 'blue' as GanttColor, progressColor: 'indigo' as GanttColor,
  radius: 'md' as GanttCustomization['taskBarRadius'], showTitle: true,
  onDoubleClick: () => {},
};

export const Default: Story = { args: { ...defaultArgs } };
export const Project: Story = { args: { ...defaultArgs, type: 'project', title: 'Phase 1: Infrastructure', progress: 50 } };
export const Milestone: Story = { args: { ...defaultArgs, type: 'milestone', title: 'Kickoff Complete', progress: 100, width: 120 } };
export const ShortTitleFits: Story = { args: { ...defaultArgs, title: 'API', width: 80 } };
export const LongTitleOverflow: Story = { args: { ...defaultArgs, title: 'Phase 1: Database Setup - Migration Scripts, Schema Design, and Index Optimization', width: 100 } };
export const ZeroProgress: Story = { args: { ...defaultArgs, progress: 0 } };
export const FullProgress: Story = { args: { ...defaultArgs, progress: 100 } };
export const NoAssignee: Story = { args: { ...defaultArgs, assignee: undefined } };
export const DeepPosition: Story = { args: { ...defaultArgs, top: 200, left: 250 } };
export const NoParent: Story = { args: { ...defaultArgs, hasParentId: false } };
export const TitleHidden: Story = { args: { ...defaultArgs, showTitle: false } };
export const SlateBar: Story = { args: { ...defaultArgs, barColor: 'slate' as GanttColor, progressColor: 'slate' as GanttColor } };
export const EmeraldBar: Story = { args: { ...defaultArgs, barColor: 'emerald' as GanttColor, progressColor: 'emerald' as GanttColor } };
export const AmberBar: Story = { args: { ...defaultArgs, barColor: 'amber' as GanttColor, progressColor: 'amber' as GanttColor } };
export const RoseBar: Story = { args: { ...defaultArgs, barColor: 'rose' as GanttColor, progressColor: 'rose' as GanttColor } };
export const VioletBar: Story = { args: { ...defaultArgs, barColor: 'violet' as GanttColor, progressColor: 'violet' as GanttColor } };
export const CyanBar: Story = { args: { ...defaultArgs, barColor: 'cyan' as GanttColor, progressColor: 'cyan' as GanttColor } };
export const RadiusNone: Story = { args: { ...defaultArgs, radius: 'none' as GanttCustomization['taskBarRadius'] } };
export const RadiusSmall: Story = { args: { ...defaultArgs, radius: 'sm' as GanttCustomization['taskBarRadius'] } };
export const RadiusLarge: Story = { args: { ...defaultArgs, radius: 'lg' as GanttCustomization['taskBarRadius'] } };
export const RadiusFull: Story = { args: { ...defaultArgs, radius: 'full' as GanttCustomization['taskBarRadius'] } };
export const BlueBarIndigoProgress: Story = { args: { ...defaultArgs, barColor: 'blue' as GanttColor, progressColor: 'indigo' as GanttColor } };
export const SlateBarEmeraldProgress: Story = { args: { ...defaultArgs, barColor: 'slate' as GanttColor, progressColor: 'emerald' as GanttColor } };