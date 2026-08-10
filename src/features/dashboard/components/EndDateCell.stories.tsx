import type { Meta, StoryObj } from '@storybook/react';
import { EndDateCell } from './EndDateCell';

const meta: Meta<typeof EndDateCell> = {
  title: 'Dashboard/EndDateCell',
  component: EndDateCell,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EndDateCell>;

export const Default: Story = {
  args: { dateString: '2026-08-05T17:00:00' },
};

export const EndOfYear: Story = {
  args: { dateString: '2026-12-31T17:00:00' },
};

export const SameDay: Story = {
  args: { dateString: '2026-08-01T17:00:00' },
};