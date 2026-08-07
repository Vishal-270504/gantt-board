import type { Meta, StoryObj } from '@storybook/react';
import { StartDateCell } from './StartDateCell';

const meta: Meta<typeof StartDateCell> = {
  title: 'Dashboard/StartDateCell',
  component: StartDateCell,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StartDateCell>;

export const Default: Story = {
  args: { dateString: '2026-08-01T09:00:00' },
};

export const EndOfYear: Story = {
  args: { dateString: '2026-12-31T17:00:00' },
};

export const LeapYear: Story = {
  args: { dateString: '2024-02-29T09:00:00' },
};