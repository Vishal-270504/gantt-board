# gantt-board

A React-based Gantt Chart component supporting hierarchical tasks, timeline scaling (Hour, Day, Week, Month, Quarter, Year), dependency visualization, milestones, progress tracking, and expandable task trees.

# Quick Start

```tsx
import { DashboardLayout } from "gantt-board";

function App() {
  return (
    <DashboardLayout
        tasks={mockTasks}
        displayOptions={{
            scale: "week",
        }}
        styleOptions={{
            rowHeight: 40,

            taskBar: {
            barColor: "blue",
            progressColor: "emerald",
            radius: 6,
            },
        }}
    />
    />
  );
}
```

```text
type TimelineScale =
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year";

type Color =
  | "slate"
  | "blue"
  | "indigo"
  | "emerald"
  | "amber"
  | "rose"
  | "violet"
  | "cyan";

interface DashboardLayoutProps {
  tasks: Task[];

  displayOptions?: {
    scale?: TimelineScale;
    showDependencies?: boolean;

    columnWidths?: {
      title?: number;
      startDate?: number;
      endDate?: number;
      duration?: number;
      progress?: number;
      predecessor?: number;
    };
  };

  styleOptions?: {
    rowHeight?: number;

    taskBar?: {
      barColor?: Color;
      progressColor?: Color;
      radius?: number;
    };
  };
}
```

# Props

| Prop             | Type             | Required | Description                        |
| ---------------- | ---------------- | -------- | ---------------------------------- |
| `tasks`          | `Task[]`         | YES      | Tasks displayed in the Gantt chart |
| `displayOptions` | `DisplayOptions` | NO       | Controls timeline display behavior |
| `styleOptions`   | `StyleOptions`   | NO       | Controls visual styling            |

# displayOptions

| Property      | Type                                              | Default | Description                     |
| ------------- | ------------------------------------------------- | ------- | ------------------------------- |
| `scale`       | `hour \| day \| week \| month \| quarter \| year` | `week`  | Initial timeline scale          |
| `title`       | `number`                                          | `250`   | Width of the task title column  |
| `startDate`   | `number`                                          | `160`   | Width of the start date column  |
| `endDate`     | `number`                                          | `160`   | Width of the end date column    |
| `duration`    | `number`                                          | `140`   | Width of the duration column    |
| `progress`    | `number`                                          | `90`    | Width of the progress column    |
| `predecessor` | `number`                                          | `130`   | Width of the predecessor column |

# styleOptions

| Property    | Type     | Default | Description                       |
| ----------- | -------- | ------- | --------------------------------- |
| `rowHeight` | `number` | `40`    | Height of each task row in pixels |

# Taskbar

| Property        | Type                                                                                    | Default  | Description                                    |
| --------------- | --------------------------------------------------------------------------------------- | -------- | ---------------------------------------------- |
| `barColor`      | `"slate" \| "blue" \| "indigo" \| "emerald" \| "amber" \| "rose" \| "violet" \| "cyan"` | `"blue"` | Main color of the task bar                     |
| `progressColor` | `"slate" \| "blue" \| "indigo" \| "emerald" \| "amber" \| "rose" \| "violet" \| "cyan"` | `"blue"` | Color of the progress fill inside the task bar |
| `radius`        | `none \| md \| sm \| md \| lg`                                                        | `full`   | Border radius of the task bar                  |


# Core Types

## Task

| Property     | Type                   | Description            |
| ------------ | ---------------------- | ---------------------- |
| id           | string                 | Unique task identifier |
| title        | string                 | Task title             |
| assignee     | string                 | Assigned user          |
| progress     | number                 | Completion percentage  |
| startDate    | string                 | ISO date string        |
| endDate      | string                 | ISO date string        |
| type         | task/project/milestone | Task category          |
| predecessors | string[]               | Dependency task IDs    |
| parentId     | string                 | Parent task ID         |

# Components

| Component        | Description              |
| ---------------- | ------------------------ |
| DashboardLayout  | Main entry component     |
| GanttTable       | Task table view          |
| Timeline         | Timeline visualization   |
| TaskBar          | Task representation      |
| MilestoneMarker  | Milestone rendering      |
| DependencyArrows | Dependency visualization |

# Dependencies

Built with:

- React
- TypeScript
- Zustand
- TailwindCSS
- Shadcn
