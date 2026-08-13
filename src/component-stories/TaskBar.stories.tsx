import type { Meta, StoryObj } from "@storybook/react-vite";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TaskBar } from "../components/Timeline/Taskbar";

const meta: Meta<typeof TaskBar> = {
  title: "Timeline/TaskBar",
  component: TaskBar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="relative w-[900px] h-[250px] border bg-background">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  argTypes: {
    left: {
      control: { type: "number", min: 0, max: 800 },
    },
    width: {
      control: { type: "number", min: 40, max: 500 },
    },
    top: {
      control: { type: "number", min: 0, max: 200 },
    },
    height: {
      control: { type: "number", min: 20, max: 60 },
    },
    progress: {
      control: { type: "range", min: 0, max: 100 },
    },
    title: {
      control: "text",
    },
    type: {
      control: "radio",
      options: ["task", "project"],
    },
    showTitle: {
      control: "boolean",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TaskBar>;

export const Default: Story = {
  args: {
    left: 100,
    top: 60,
    width: 220,
    height: 28,
    progress: 75,
    title: "Database Setup",
    assignee: "Bob",
    type: "task",
    showTitle: true,
  },
};

export const Project: Story = {
  args: {
    left: 100,
    top: 60,
    width: 320,
    height: 28,
    progress: 50,
    title: "Phase 1 Infrastructure",
    assignee: "Team A",
    type: "project",
    showTitle: true,
  },
};

export const LongTitle: Story = {
  args: {
    left: 100,
    top: 60,
    width: 120,
    height: 28,
    progress: 60,
    title:
      "Database Setup Migration Scripts And Index Optimization",
    assignee: "Bob",
    type: "task",
    showTitle: true,
  },
};

export const ZeroProgress: Story = {
  args: {
    left: 100,
    top: 60,
    width: 220,
    height: 28,
    progress: 0,
    title: "Not Started",
    type: "task",
    showTitle: true,
  },
};

export const Complete: Story = {
  args: {
    left: 100,
    top: 60,
    width: 220,
    height: 28,
    progress: 100,
    title: "Completed Task",
    type: "task",
    showTitle: true,
  },
};

export const HiddenTitle: Story = {
  args: {
    left: 100,
    top: 60,
    width: 220,
    height: 28,
    progress: 75,
    title: "Hidden Title",
    type: "task",
    showTitle: false,
  },
};