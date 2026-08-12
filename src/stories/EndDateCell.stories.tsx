import type { Meta, StoryObj } from '@storybook/react-vite';
import { EndDateCell } from './EndDateCell';

const meta: Meta<typeof EndDateCell> = {
  title: 'Dashboard/EndDateCell',
  component: EndDateCell,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    dateString: {
      control: 'date',
      description: 'ISO date string',
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
type Story = StoryObj<typeof EndDateCell>;

export const Default: Story = {
  args: {
    dateString: '2026-08-05T17:00:00',
    width: 160,
    dateFormat: 'DD MMM YYYY',
    timeFormat: '24-hour',
  },
};

export const EndOfYear: Story = {
  args: {
    dateString: '2026-12-31T23:59:00',
    width: 160,
  },
};

export const SameDay: Story = {
  args: {
    dateString: '2026-08-05T09:00:00',
    width: 160,
  },
};