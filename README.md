# gantt-board

A React-based Gantt Chart component supporting hierarchical tasks, timeline scaling (Hour, Day, Week, Month, Quarter, Year), dependency visualization, milestones, progress tracking, and expandable task trees.

# Quick Start

```tsx
import { Gantt } from "gantt-board";

function App() {
  return (
    <Gantt
      tasks={mockTasks}
      displayOptions={{
        scale: "week",
        availableScales: ["day", "week", "month"],
      }}
      columns={[
        { key: "duration", visible: false },
        { key: "title", width: 280 },
        {
          key: "progress",
          render: (task) => <ProgressRing value={task.progress} />,
        },
      ]}
      styleOptions={{
        rowHeight: 40,

        taskBar: {
          barColor: "blue",
          progressColor: "emerald",
          radius: "full",
        },
      }}
      onTaskDoubleClick={(task) => {}}
    />
  );
}
```

## Domain Concepts

### Task

A schedulable work item displayed on the Gantt chart, with a start date, end date, progress, hierarchy, and predecessors.

### Project

A project in a Gantt chart is a high-level work item that groups related tasks and milestones required to achieve a specific project goal.

### Milestone

A significant event or checkpoint in a project, shown as a single point on the Gantt timeline.

### Parent / Child task

Tasks can have a parent. Child tasks appear indented under their parent, while top-level tasks have no parent.

### Predecessors

`predecessors` is an optional array of task IDs. If a task lists predecessor IDs, dependency arrows are routed from each predecessor task to the successor.

### Task bar

The timeline representation of a task's duration. `project` tasks render as a solid bar, regular `task` items render a bar with a progress fill, and `milestone` items render as point markers.

### Progress

The percentage of a task that is completed, shown in the table and on the timeline bar.

### Duration

Computed from `startDate` to `endDate`. For table display, the difference is shown as days and hours.

### Timeline

The horizontal time axis used to place task bars and milestones.

### `Task`

| Property       | Type                               | Required | Description                               |
| -------------- | ---------------------------------- | -------- | ----------------------------------------- |
| `id`           | `string`                           | yes      | Unique task identifier                    |
| `title`        | `string`                           | yes      | Task title                                |
| `assignee`     | `string`                           | no       | Optional assigned user or team            |
| `progress`     | `number`                           | yes      | Percent complete; range should be `0-100` |
| `startDate`    | `string`                           | yes      | ISO 8601 date/time string                 |
| `endDate`      | `string`                           | yes      | ISO 8601 date/time string                 |
| `type`         | `'project'` `'task'` `'milestone'` | yes      | Task category                             |
| `predecessors` | `string[]`                         | no       | IDs of dependency tasks                   |
| `parentId`     | `string` `null`                    | yes      | Parent task ID, or `null` for root tasks  |

# Gantt Props

The main configuration interface for the Gantt Chart. It controls task data, display settings, styling options, and event callbacks.

```text
type TimelineScale =
    "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

type Color =
    "slate"
  | "blue"
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "cyan";

type MilestoneShape =
    "diamond"
  | "circle"
  | "square"
  | "triangle";

type Radius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "full";

type DateFormat =
  | "DD/MM/YYYY"
  | "MM/DD/YYYY"
  | "YYYY-MM-DD"
  | "DD MMM YYYY";

type TimeFormat =
  | "12-hour"
  | "24-hour";

type FormatDateOptions = {
  dateFormat?: DateFormat;
  timeFormat?: TimeFormat;
};

type ColumnKey = "title" | "startDate" | "endDate" | "duration" | "progress" | "predecessors" | "assignee";

interface ColumnConfig {
  key: ColumnKey;
  visible?: boolean;
  width?: number;
  dateFormat?: FormatDateOptions['dateFormat'];
  render?: (task: Task) => React.ReactNode;
}

interface GanttProps {
  tasks: Task[];

  displayOptions?: {
      scale?: TimelineScale;
      availableScales?: TimelineScale[];
      showDependencies?: boolean;
      showDayLabels?: boolean;
      timeFormat?: FormatDateOptions['timeFormat'];
    };

    columns?: ColumnConfig[];

    styleOptions?: {
      rowHeight?: number;

      ganttList?: {
        headerColor?: Color;
      }

      taskBar?: {
        barColor?: Color;
        projectBarColor?: Color;
        progressColor?: Color;
        radius?:  Radius;
        showTitle?: boolean;
      };

      milestone?: {
        backgroundColor?: Color;
        shape?: MilestoneShape;
    };

      timeline?: {
        todayColor?: Color;
        weekendColor?: Color;
        headerColor?: Color;
      };
  };

  onTaskDoubleClick?: (task: Task) => void;
}

```

## Props

| Prop                | Type                   | Required | Description                                                          |
| ------------------- | ---------------------- | -------- | -------------------------------------------------------------------- |
| `tasks`             | `Task[]`               | YES      | Tasks displayed in the Gantt chart                                   |
| `displayOptions`    | `DisplayOptions`       | NO       | Controls timeline display and table visibility                       |
| `styleOptions`      | `StyleOptions`         | NO       | Controls visual styling of the chart                                 |
| `columns`           | `ColumnConfig[]`       | NO       | Configures which table columns are shown, their width, and rendering |
| `onTaskDoubleClick` | `(task: Task) => void` | NO       | Triggered when a task is double-clicked                              |

### displayOptions

> Note: All properties below are optional unless otherwise specified. Default values are used when omitted.

| Property           | Type                                              | Default        | Description                                                  |
| ------------------ | ------------------------------------------------- | -------------- | ------------------------------------------------------------ |
| `scale`            | `hour \| day \| week \| month \| quarter \| year` | `week`         | Initial timeline scale                                       |
| `availableScales`  | `TimelineScale[]`                                 | all six scales | Restricts which scales appear in the scale switcher UI       |
| `showDependencies` | `boolean`                                         | `true`         | Controls whether dependency arrows are displayed             |
| `showDayLabels`    | `boolean`                                         | `true`         | shows the days of week                                       |
| `timeFormat`       | `FormatDateOptions['timeFormat']`                 | `"24-hour"`    | Format used to display times when hour-level detail is shown |

> **Time format options:** `12-hour`, `24-hour`.

> **showDayLabels** is set to false for scales `quarter`and `year`

### Columns

`columns` is an array of `ColumnConfig` objects, one per column, replacing `visibleColumns` and `columnWidths`.

| Property     | Type                              | Required | Description                                                                                                           |
| ------------ | --------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `key`        | `ColumnKey`                       | yes      | Identifies which column this config applies to                                                                        |
| `visible`    | `boolean`                         | no       | Show or hide the column. Defaults to `true` if omitted                                                                |
| `width`      | `number`                          | no       | Width of the column in pixels. Falls back to the column's default width if omitted                                    |
| `render`     | `(task: Task) => React.ReactNode` | no       | Custom renderer for this column's cell. Receives the full `task`. Falls back to the default cell rendering if omitted |
| `dateFormat` | `DateFormat`                      | no       | Date format for this column. Only meaningful for `startDate` / `endDate` columns                                      |

> **Date format options:** `DD/MM/YYYY`, `MM/DD/YYYY`, `YYYY-MM-DD`, `DD MMM YYYY`

> **`ColumnKey` options:** `title`, `startDate`, `endDate`, `duration`, `progress`, `predecessors`, `assignee`

**Defaults per column**:

| `key`          | `visible` default | `width` default |
| -------------- | ----------------- | --------------- |
| `title`        | `true`            | `250`           |
| `startDate`    | `true`            | `160`           |
| `endDate`      | `true`            | `160`           |
| `duration`     | `true`            | `140`           |
| `progress`     | `true`            | `90`            |
| `predecessors` | `true`            | `130`           |
| `assignee`     | `false`           | `140`           |

### styleOptions

> Note: All properties below are optional unless otherwise specified. Default values are used when omitted.

| Property    | Type     | Default | Description                       |
| ----------- | -------- | ------- | --------------------------------- |
| `rowHeight` | `number` | `40`    | Height of each task row in pixels |

#### ganttList

> Note: All properties below are optional unless otherwise specified. Default values are used when omitted.

| Property      | Type    | Default   | Description                                   |
| ------------- | ------- | --------- | --------------------------------------------- |
| `headerColor` | `Color` | `"slate"` | Background color of the task table header row |

#### Taskbar

> Note: All properties below are optional unless otherwise specified. Default values are used when omitted.

| Property          | Type      | Default    | Description                                                           |
| ----------------- | --------- | ---------- | --------------------------------------------------------------------- |
| `barColor`        | `Color`   | `"blue"`   | Main color of the task bar                                            |
| `progressColor`   | `Color`   | `"indigo"` | Color of the progress fill                                            |
| `projectBarColor` | `Color`   | `"slate"`  | Color of `project`-type task bar; falls back to `barColor` if omitted |
| `radius`          | `Radius`  | `"md"`     | Border radius of the task bar                                         |
| `showTitle`       | `boolean` | `true`     | Controls whether task titles in the taskbar is displayed or not       |

#### Milestone

> Note: All properties below are optional unless otherwise specified. Default values are used when omitted.

| Property          | Type                                              | Default     | Description                     |
| ----------------- | ------------------------------------------------- | ----------- | ------------------------------- |
| `backgroundColor` | `Color`                                           | `"amber"`   | Color of the milestone marker   |
| `shape`           | `"diamond" \| "circle" \| "square" \| "triangle"` | `"diamond"` | Shape used to render milestones |

#### Timeline

> Note: All properties below are optional unless otherwise specified. Default values are used when omitted.

| Property       | Type    | Default   | Description                                 |
| -------------- | ------- | --------- | ------------------------------------------- |
| `todayColor`   | `Color` | `"rose"`  | Highlight color for the current day         |
| `weekendColor` | `Color` | `"slate"` | Background color used for weekend cells     |
| `headerColor`  | `Color` | `"slate"` | Background color of the timeline header row |

# Components

| Component        | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| Gantt            | Main entry component. It contains the gantt view                       |
| GanttList        | Task table view. It is rendered on the left side                       |
| Timeline         | Timeline visualization for the tasks. It is rendered on the right side |
| TaskBar          | Task representation on the timeline                                    |
| MilestoneMarker  | Milestone rendering                                                    |
| DependencyArrows | Dependency visualization                                               |

# Dependencies

Built with:

- React
- TypeScript
- Zustand
- TailwindCSS
- Shadcn
