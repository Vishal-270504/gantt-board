import type { Meta, StoryObj } from "@storybook/react";
import { Gantt } from "../features/dashboard/components/Gantt";
import { mockTasks } from "../features/dashboard/mockData";
import type { ColumnConfig } from "../features/dashboard/types";

const meta: Meta<typeof Gantt> = {
  title: "Components/Gantt",
  component: Gantt,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Gantt>;

// QA Story - kept exactly as you had it
export const QA: Story = {
  args: {
    tasks: mockTasks,

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
        "radius": "full",
        "showTitle": true
      },

      "milestone": {
        "milestoneColor": "amber",
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

// Define the type for our custom controls args
interface CustomRenderArgs {
  tasks: any;
  displayOptions: any;
  styleOptions: any;
  showCustomProgress: boolean;
  progressColorLow: string;
  progressColorHigh: string;
  progressBgColor: string;
  progressPadding: number;
  progressFontWeight: string;
  progressFontSize: number;
  showCustomAssignee: boolean;
  assigneeBgColor: string;
  assigneePadding: number;
  assigneeFontWeight: string;
  assigneeFontSize: number;
  assigneeTextColor: string;
  assigneeUnassignedText: string;
  assigneeShowUnassigned: boolean;
  showStartDate: boolean;
  showEndDate: boolean;
  showDuration: boolean;
  showPredecessors: boolean;
}

// Custom Render with Controls Story
export const CustomRenderWithControls: StoryObj<CustomRenderArgs> = {
  render: (args) => {
    const {
      tasks,
      displayOptions,
      styleOptions,
      showCustomProgress,
      progressColorLow,
      progressColorHigh,
      progressBgColor,
      progressPadding,
      progressFontWeight,
      progressFontSize,
      showCustomAssignee,
      assigneeBgColor,
      assigneePadding,
      assigneeFontWeight,
      assigneeFontSize,
      assigneeTextColor,
      assigneeUnassignedText,
      assigneeShowUnassigned,
      showStartDate,
      showEndDate,
      showDuration,
      showPredecessors,
    } = args;

  // Build columns with optional custom renders
  const columns: ColumnConfig[] = [
    {
      key: "title",
      visible: true,
      width: 260,
    },
    {
      key: "startDate",
      visible: showStartDate,
      width: 100,
      dateFormat: "DD MMM YYYY",
    },
    {
      key: "endDate",
      visible: showEndDate,
      width: 160,
      dateFormat: "DD MMM YYYY",
    },
    {
      key: "duration",
      visible: showDuration,
      width: 140,
    },
    {
      key: "progress",
      visible: true,
      width: 90,
      render: showCustomProgress
        ? (task: any) => (
            <div
              style={{
                width: 90,
                padding: `${progressPadding}px`,
                textAlign: "center",
                backgroundColor: progressBgColor,
              }}
            >
              <span
                style={{
                  color: task.progress > 50 ? progressColorHigh : progressColorLow,
                  fontWeight: progressFontWeight,
                  fontSize: `${progressFontSize}px`,
                }}
              >
                {task.progress}%
              </span>
            </div>
          )
        : undefined,
    },
    {
      key: "predecessors",
      visible: showPredecessors,
      width: 130,
    },
    {
      key: "assignee",
      visible: true,
      width: 140,
      render: showCustomAssignee
        ? (task: any) => (
            <div
              style={{
                width: 140,
                padding: `${assigneePadding}px`,
                backgroundColor: assigneeBgColor,
              }}
            >
              <strong
                style={{
                  fontWeight: assigneeFontWeight,
                  fontSize: `${assigneeFontSize}px`,
                  color: assigneeTextColor,
                }}
              >
                {assigneeShowUnassigned && !task.assignee
                  ? assigneeUnassignedText
                  : task.assignee || assigneeUnassignedText}
              </strong>
            </div>
          )
        : undefined,
    },
  ];

  // Only pass Gantt props to the component
  return (
    <Gantt
      tasks={tasks}
      displayOptions={displayOptions}
      columns={columns}
      styleOptions={styleOptions}
    />
    );
  },

  args: {
    tasks: mockTasks,
  displayOptions: {
    scale: "week",
    availableScales: ["hour", "day", "week", "month", "quarter", "year"],
    showDependencies: true,
    showDayLabels: true,
    timeFormat: "12-hour",
  },
  styleOptions: {
    rowHeight: 50,
    taskBar: {
      barColor: "emerald",
      progressColor: "rose",
      radius: "full",
      showTitle: true,
    },
    milestone: {
      milestoneColor: "amber",
      shape: "circle",
    },
    timeline: {
      todayColor: "rose",
      weekendColor: "slate",
      headerColor: "blue",
    },
  },
  showCustomProgress: true,
  progressColorLow: "red",
  progressColorHigh: "green",
  progressBgColor: "transparent",
  progressPadding: 8,
  progressFontWeight: "normal",
  progressFontSize: 14,
  showCustomAssignee: true,
  assigneeBgColor: "#f0f0f0",
  assigneePadding: 8,
  assigneeFontWeight: "bold",
  assigneeFontSize: 14,
  assigneeTextColor: "#000000",
  assigneeUnassignedText: "Unassigned",
  assigneeShowUnassigned: true,
  showStartDate: true,
  showEndDate: true,
  showDuration: true,
  showPredecessors: true,
  },
  argTypes: {
    showCustomProgress: { 
    control: "boolean",
    description: "Enable custom progress render"
  },
  progressColorLow: { 
    control: "color",
    description: "Color when progress <= 50%"
  },
  progressColorHigh: { 
    control: "color",
    description: "Color when progress > 50%"
  },
  progressBgColor: { 
    control: "color",
    description: "Background color for progress cell"
  },
  progressPadding: { 
    control: { type: "number", min: 0, max: 20, step: 1 },
    description: "Padding for progress cell"
  },
  progressFontWeight: { 
    control: "select",
    options: ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
    description: "Font weight for progress"
  },
  progressFontSize: { 
    control: { type: "number", min: 10, max: 24, step: 1 },
    description: "Font size for progress"
  },
  showCustomAssignee: { 
    control: "boolean",
    description: "Enable custom assignee render"
  },
  assigneeBgColor: { 
    control: "color",
    description: "Background color for assignee cell"
  },
  assigneePadding: { 
    control: { type: "number", min: 0, max: 20, step: 1 },
    description: "Padding for assignee cell"
  },
  assigneeFontWeight: { 
    control: "select",
    options: ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
    description: "Font weight for assignee"
  },
  assigneeFontSize: { 
    control: { type: "number", min: 10, max: 24, step: 1 },
    description: "Font size for assignee"
  },
  assigneeTextColor: { 
    control: "color",
    description: "Text color for assignee"
  },
  assigneeUnassignedText: { 
    control: "text",
    description: "Text to show when unassigned"
  },
  assigneeShowUnassigned: { 
    control: "boolean",
    description: "Show unassigned text"
  },
  showStartDate: { 
    control: "boolean",
    description: "Show Start Date column"
  },
  showEndDate: { 
    control: "boolean",
    description: "Show End Date column"
  },
  showDuration: { 
    control: "boolean",
    description: "Show Duration column"
  },
  showPredecessors: { 
    control: "boolean",
    description: "Show Predecessors column"
  },
  },
};