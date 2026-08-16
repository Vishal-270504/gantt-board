import type { Meta, StoryObj } from "@storybook/react";
import { Gantt } from "../features/dashboard/components/Gantt";
import type { Task } from "../features/dashboard/index";

const today = new Date();
const d = (offsetDays: number, hour = 0): string => {
  const dt = new Date(today);
  dt.setDate(dt.getDate() + offsetDays);
  dt.setHours(hour, 0, 0, 0);
  return dt.toISOString();
};

const tasks: Task[] = [
  {
    id: "proj-1",
    title: "Project Alpha",
    type: "project",
    startDate: d(0),
    endDate: d(30),
    progress: 40,
    parentId: null,
    predecessors: [],
    assignee: "Alice",
  },
  {
    id: "task-1",
    title: "Discovery",
    type: "task",
    startDate: d(0),
    endDate: d(7),
    progress: 100,
    parentId: "proj-1",
    predecessors: [],
    assignee: "Alice",
  },
  {
    id: "task-2",
    title: "Design",
    type: "task",
    startDate: d(7),
    endDate: d(14),
    progress: 60,
    parentId: "proj-1",
    predecessors: ["task-1"],
    assignee: "Bob",
  },
  {
    id: "task-3",
    title: "Development",
    type: "task",
    startDate: d(14),
    endDate: d(24),
    progress: 20,
    parentId: "proj-1",
    predecessors: ["task-2"],
    assignee: "Carol",
  },
  {
    id: "ms-1",
    title: "Launch",
    type: "milestone",
    startDate: d(24),
    endDate: d(24),
    progress: 0,
    parentId: "proj-1",
    predecessors: ["task-3"],
    assignee: "",
  },
  {
    id: "task-4",
    title: "Post-launch Support",
    type: "task",
    startDate: d(24),
    endDate: d(30),
    progress: 0,
    parentId: "proj-1",
    predecessors: ["ms-1"],
    assignee: "Dave",
  },
];

const meta: Meta<typeof Gantt> = {
  title: "Components/Gantt",
  component: Gantt,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Gantt>;

export const QA: Story = {
  args: {
    tasks,

    displayOptions: {
      "scale": "week",
      "availableScales": ["hour", "day", "week", "month", "quarter", "year"],
      "showDependencies": true,
      "showDayLabels": true,
      "timeFormat": "12-hour"
    },

    columns: [{
      "key": "title",
      "visible": true,
      "width": 260
    }, {
      "key": "startDate",
      "visible": true,
      "width": 100,
      "dateFormat": "DD MMM YYYY"
    }, {
      "key": "endDate",
      "visible": true,
      "width": 160,
      "dateFormat": "DD MMM YYYY"
    }, {
      "key": "duration",
      "visible": true,
      "width": 140
    }, {
      "key": "progress",
      "visible": true,
      "width": 90
    }, {
      "key": "predecessors",
      "visible": true,
      "width": 130
    }, {
      "key": "assignee",
      "visible": true,
      "width": 140
    }],

    styleOptions: {
      "rowHeight": 50,

      "taskBar": {
        "barColor": "emerald",
        "progressColor": "rose",
        "radius": "full"
      },

      "milestone": {
        "backgroundColor": "amber",
        "shape": "circle"
      },

      "timeline": {
        "todayColor": "rose",
        "weekendColor": "slate",
        "headerColor": "blue"
      }
    },
  },
};