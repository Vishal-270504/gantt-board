import { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TooltipProvider } from '@/components/ui/tooltip';
import { MilestoneMarker } from '../components/Timeline/MilestoneMarker';
import { useDashboardStore } from '../features/dashboard/store/useDashboardStore';
import type { GanttColor, MilestoneShape } from '../features/dashboard/types/index';

function MilestoneMarkerWrapper({
  left,
  top,
  title,
  backgroundColor,
  shape,
}: {
  left: number;
  top: number;
  title: string;
  backgroundColor: GanttColor;
  shape: MilestoneShape;
}) {
  const setMilestoneBackgroundColor = useDashboardStore((s) => s.setMilestoneBackgroundColor);
  const setMilestoneShape = useDashboardStore((s) => s.setMilestoneShape);

  useEffect(() => {
    setMilestoneBackgroundColor(backgroundColor);
    setMilestoneShape(shape);
  }, [backgroundColor, shape, setMilestoneBackgroundColor, setMilestoneShape]);

  return <MilestoneMarker left={left} top={top} title={title} />;
}

const meta: Meta<typeof MilestoneMarkerWrapper> = {
  title: 'Dashboard/MilestoneMarker',
  component: MilestoneMarkerWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    backgroundColor: {
      control: 'select',
      options: ['slate', 'blue', 'indigo', 'emerald', 'amber', 'rose', 'violet', 'cyan'],
      description: 'Background color of the milestone marker',
    },
    shape: {
      control: 'select',
      options: ['diamond', 'circle', 'square', 'triangle'],
      description: 'Shape of the milestone marker',
    },
    left: {
      control: { type: 'number', min: 0, max: 750 },
      description: 'Left position in pixels',
    },
    top: {
      control: { type: 'number', min: 0, max: 350 },
      description: 'Top position in pixels',
    },
    title: {
      control: 'text',
      description: 'Tooltip title shown on hover',
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div
          style={{
            position: 'relative',
            width: '800px',
            height: '400px',
            border: '2px dashed #ccc',
            backgroundColor: '#f9fafb',
            overflow: 'hidden',
            margin: '20px auto',
          }}
        >
          {/* Vertical grid lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={`v${i}`}
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${(i + 1) * 10}%`,
                width: '1px',
                backgroundColor: '#ccc',
                opacity: 0.3,
                pointerEvents: 'none',
              }}
            />
          ))}
          {/* Horizontal grid lines */}
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={`h${i}`}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${(i + 1) * 10}%`,
                height: '1px',
                backgroundColor: '#ccc',
                opacity: 0.3,
                pointerEvents: 'none',
              }}
            />
          ))}
          {/* Label showing coordinates */}
          <div
            style={{
              position: 'absolute',
              bottom: 5,
              left: 5,
              fontSize: '11px',
              color: '#666',
              pointerEvents: 'none',
            }}
          >
            Grid (800x400)
          </div>
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MilestoneMarkerWrapper>;

const defaultArgs = {
  left: 100,
  top: 100,
  title: 'Milestone',
  backgroundColor: 'amber' as GanttColor,
  shape: 'diamond' as MilestoneShape,
};

export const Default: Story = {
  args: defaultArgs,
};

export const CircleShape: Story = {
  args: {
    ...defaultArgs,
    shape: 'circle' as MilestoneShape,
    title: 'Circle Milestone',
  },
};

export const SquareShape: Story = {
  args: {
    ...defaultArgs,
    shape: 'square' as MilestoneShape,
    title: 'Square Milestone',
  },
};

export const TriangleShape: Story = {
  args: {
    ...defaultArgs,
    shape: 'triangle' as MilestoneShape,
    title: 'Triangle Milestone',
  },
};

export const BlueMarker: Story = {
  args: {
    ...defaultArgs,
    backgroundColor: 'blue' as GanttColor,
    title: 'Blue Milestone',
  },
};

export const EmeraldMarker: Story = {
  args: {
    ...defaultArgs,
    backgroundColor: 'emerald' as GanttColor,
    title: 'Emerald Milestone',
  },
};

export const RoseMarker: Story = {
  args: {
    ...defaultArgs,
    backgroundColor: 'rose' as GanttColor,
    title: 'Rose Milestone',
  },
};

export const VioletCircle: Story = {
  args: {
    ...defaultArgs,
    backgroundColor: 'violet' as GanttColor,
    shape: 'circle' as MilestoneShape,
    title: 'Violet Circle',
  },
};

export const DeepPosition: Story = {
  args: {
    ...defaultArgs,
    left: 300,
    top: 200,
    backgroundColor: 'indigo' as GanttColor,
    title: 'Deep Position Milestone',
  },
};

export const CornerPosition: Story = {
  args: {
    ...defaultArgs,
    left: 750,
    top: 350,
    backgroundColor: 'cyan' as GanttColor,
    shape: 'square' as MilestoneShape,
    title: 'Corner Position',
  },
};