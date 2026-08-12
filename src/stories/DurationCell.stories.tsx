import type { Meta, StoryObj } from '@storybook/react-vite';
import { DurationCell } from './DurationCell';

const meta: Meta<typeof DurationCell> = {
  title: 'Dashboard/DurationCell',
  component: DurationCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    startDate: {
      control: 'date',
    },
    endDate: {
      control: 'date',
    },
    width: {
      control: 'number',
    },
    dateFormat: {
      control: 'select',
      options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD MMM YYYY'],
    },
    timeFormat: {
      control: 'select',
      options: ['12-hour', '24-hour'],
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[200px] border border-border">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DurationCell>;

export const ZeroHours: Story = {
  args: {
    startDate: '2026-08-05T09:00:00',
    endDate: '2026-08-05T09:00:00',
    width: 140,
  },
};

export const OneDay: Story = {
  args: {
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-02T09:00:00',
    width: 140,
  },
};

export const FiveDays: Story = {
  args: {
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-06T09:00:00',
    width: 140,
  },
};

export const OneDayAndHours: Story = {
  args: {
    startDate: '2026-08-01T09:00:00',
    endDate: '2026-08-02T14:30:00',
    width: 140,
  },
};