import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';
import { TimelineGrid } from '../components/Timeline/TimelineGrid';

const meta: Meta<typeof TimelineGrid> = {
  title: 'Dashboard/TimelineGrid',
  component: TimelineGrid,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TimelineGrid>;

const startDate = new Date('2026-08-01T00:00:00');
const endDate = new Date('2026-08-31T23:59:59');

// Wrapper to provide the required scrollContainerRef
function TimelineGridWrapper(props: React.ComponentProps<typeof TimelineGrid>) {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={scrollRef} className="relative w-full h-[400px] overflow-auto border">
      <div className="relative" style={{ width: '2000px', height: '100%' }}>
        <TimelineGrid {...props} scrollContainerRef={scrollRef} />
      </div>
    </div>
  );
}

const defaultArgs = {
  startDate,
  endDate,
  scale: 'day' as const,
};

export const Default: Story = {
  args: { ...defaultArgs },
  render: (args) => <TimelineGridWrapper {...args} />,
};

export const WeekScale: Story = {
  args: { ...defaultArgs, scale: 'week' as const },
  render: (args) => <TimelineGridWrapper {...args} />,
};

export const MonthScale: Story = {
  args: { ...defaultArgs, scale: 'month' as const },
  render: (args) => <TimelineGridWrapper {...args} />,
};

export const QuarterScale: Story = {
  args: { ...defaultArgs, scale: 'quarter' as const },
  render: (args) => <TimelineGridWrapper {...args} />,
};

export const YearScale: Story = {
  args: { ...defaultArgs, scale: 'year' as const },
  render: (args) => <TimelineGridWrapper {...args} />,
};

export const HourScale: Story = {
  args: { ...defaultArgs, scale: 'hour' as const },
  render: (args) => <TimelineGridWrapper {...args} />,
};

export const WideRange: Story = {
  args: {
    startDate: new Date('2026-01-01T00:00:00'),
    endDate: new Date('2026-12-31T23:59:59'),
    scale: 'month' as const,
  },
  render: (args) => <TimelineGridWrapper {...args} />,
};