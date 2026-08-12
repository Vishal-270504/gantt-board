import type { Meta, StoryObj } from '@storybook/react';
import { ProgressCell } from './ProgressCell';

const meta: Meta<typeof ProgressCell> = {
  title: 'Dashboard/ProgressCell',
  component: ProgressCell,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressCell>;

export const Zero: Story = {
  args: { progress: 0 },
};

export const Quarter: Story = {
  args: { progress: 25 },
};

export const Half: Story = {
  args: { progress: 50 },
};

export const SeventyFive: Story = {
  args: { progress: 75 },
};

export const Full: Story = {
  args: { progress: 100 },
};