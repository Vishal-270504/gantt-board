import type { Meta, StoryObj } from '@storybook/react';
import { TimelineHeader } from '../components/Timeline/TimelineHeader';

const meta: Meta<typeof TimelineHeader> = {
  title: 'Dashboard/TimelineHeader',
  component: TimelineHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TimelineHeader>;

const startDate = new Date('2026-08-01T00:00:00');
const endDate = new Date('2026-08-31T23:59:59');

export const DayScale: Story = {
  args: {
    startDate,
    endDate,
    scale: 'day' as const,
  },
};

export const WeekScale: Story = {
  args: {
    startDate,
    endDate,
    scale: 'week' as const,
  },
};

export const MonthScale: Story = {
  args: {
    startDate,
    endDate,
    scale: 'month' as const,
  },
};

export const QuarterScale: Story = {
  args: {
    startDate: new Date('2026-01-01T00:00:00'),
    endDate: new Date('2026-12-31T23:59:59'),
    scale: 'quarter' as const,
  },
};

export const HourScale: Story = {
  args: {
    startDate: new Date('2026-08-01T09:00:00'),
    endDate: new Date('2026-08-05T17:00:00'),
    scale: 'hour' as const,
  },
};

export const YearScale: Story = {
  args: {
    startDate: new Date('2026-01-01T00:00:00'),
    endDate: new Date('2026-12-31T23:59:59'),
    scale: 'year' as const,
  },
};

export const LongRange: Story = {
  args: {
    startDate: new Date('2026-01-01T00:00:00'),
    endDate: new Date('2026-12-31T23:59:59'),
    scale: 'day' as const,
  },
};