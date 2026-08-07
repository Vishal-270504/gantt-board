import type { Meta, StoryObj } from '@storybook/react';
import { DurationCell } from './DurationCell';

const meta: Meta<typeof DurationCell> = {
  title: 'Dashboard/DurationCell',
  component: DurationCell,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DurationCell>;

export const ZeroHours: Story = {
  args: {
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-01T09:00:00',
  },
};

export const OneDay: Story = {
  args: {
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-02T09:00:00',
  },
};

export const FiveDays: Story = {
  args: {
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-06T09:00:00',
  },
};

export const TwentyDays: Story = {
  args: {
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-21T09:00:00',
  },
};

export const OneDayAndHours: Story = {
  args: {
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-02T17:00:00',
  },
};

export const HoursOnly: Story = {
  args: {
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-01T17:00:00',
  },
};