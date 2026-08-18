/* eslint-disable storybook/use-storybook-expect, storybook/no-renderer-packages */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { flushSync } from "react-dom";
import { expect } from "vitest";
import { Gantt } from "./Gantt";
import type { Task, DisplayOptions } from "../types";

const VALID_TASKS: Task[] = [
  {
    id: "p1",
    title: "Parent Task",
    progress: 30,
    startDate: "2026-08-01T00:00:00",
    endDate: "2026-08-10T00:00:00",
    type: "project",
    parentId: null,
    predecessors: [],
  },
  {
    id: "c1",
    title: "Child Task",
    progress: 0,
    startDate: "2026-08-02T00:00:00",
    endDate: "2026-08-04T00:00:00",
    type: "task",
    parentId: "p1",
    predecessors: [],
  },
  {
    id: "t2",
    title: "Standalone Task",
    progress: 50,
    startDate: "2026-08-05T00:00:00",
    endDate: "2026-08-06T00:00:00",
    type: "task",
    parentId: null,
    predecessors: [],
  },
];

const REPLACEMENT_TASKS: Task[] = [
  {
    id: "n1",
    title: "Replacement Task",
    progress: 0,
    startDate: "2026-09-01T00:00:00",
    endDate: "2026-09-05T00:00:00",
    type: "task",
    parentId: null,
    predecessors: [],
  },
];

const INVALID_TASKS = [
  {
    id: "bad-1",
    title: "Bad Task",
    progress: 0,
    startDate: "not-a-date",
    endDate: "2026-09-05T00:00:00",
    type: "task",
    parentId: null,
    predecessors: [],
  },
];

const DEFAULT_DISPLAY: DisplayOptions = {
  scale: "week",
  availableScales: ["day", "week", "month"],
};

const meta: Meta<typeof Gantt> = {
  title: "Components/Gantt/Integration",
  component: Gantt,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Gantt>;

function click(el: HTMLElement) {
  flushSync(() => el.click());
}

function scaleButtons(root: ParentNode): HTMLButtonElement[] {
  return Array.from(
    root.querySelectorAll<HTMLButtonElement>("nav button"),
  ).filter((b) =>
    ["day", "week", "month", "quarter", "year", "hour"].includes(
      b.textContent?.trim() ?? "",
    ),
  );
}

function activeScaleButton(root: ParentNode): HTMLButtonElement | undefined {
  return scaleButtons(root).find((b) => b.className.includes("bg-primary"));
}

export const ValidTasksRender: Story = {
  render: () => <Gantt tasks={VALID_TASKS} displayOptions={DEFAULT_DISPLAY} />,
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;
    expect(root.textContent).toContain("Parent Task");
    expect(root.textContent).toContain("Child Task");
    expect(root.textContent).toContain("Standalone Task");
    expect(scaleButtons(root).length).toBe(3);
  },
};

function TaskReplacementHarness() {
  const [tasks, setTasks] = useState<Task[]>(VALID_TASKS);
  return (
    <div data-testid="harness">
      <button
        type="button"
        data-testid="replace-btn"
        onClick={() => setTasks(REPLACEMENT_TASKS)}
      >
        Replace
      </button>
      <Gantt tasks={tasks} displayOptions={DEFAULT_DISPLAY} />
    </div>
  );
}

export const TaskReplacement: Story = {
  render: () => <TaskReplacementHarness />,
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;
    const btn = root.querySelector(
      '[data-testid="replace-btn"]',
    ) as HTMLButtonElement;
    expect(root.textContent).toContain("Parent Task");
    click(btn);
    expect(root.textContent).not.toContain("Parent Task");
    expect(root.textContent).toContain("Replacement Task");
  },
};

export const ExpandCollapse: Story = {
  render: () => <Gantt tasks={VALID_TASKS} displayOptions={DEFAULT_DISPLAY} />,
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;
    expect(root.textContent).toContain("Child Task");
    const collapseBtn = Array.from(
      root.querySelectorAll<HTMLButtonElement>("button[aria-label]"),
    ).find((b) => b.getAttribute("aria-label") === "Collapse");
    expect(collapseBtn).toBeTruthy();
    click(collapseBtn!);
    expect(root.textContent).not.toContain("Child Task");
    const expandBtn = Array.from(
      root.querySelectorAll<HTMLButtonElement>("button[aria-label]"),
    ).find((b) => b.getAttribute("aria-label") === "Expand");
    expect(expandBtn).toBeTruthy();
    click(expandBtn!);
    expect(root.textContent).toContain("Child Task");
  },
};

export const ScaleChange: Story = {
  render: () => <Gantt tasks={VALID_TASKS} displayOptions={DEFAULT_DISPLAY} />,
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;
    expect(activeScaleButton(root)?.textContent?.trim()).toBe("week");
    const monthBtn = scaleButtons(root).find(
      (b) => b.textContent?.trim() === "month",
    );
    expect(monthBtn).toBeTruthy();
    click(monthBtn!);
    expect(activeScaleButton(root)?.textContent?.trim()).toBe("month");
  },
};

function MultiInstanceHarness() {
  const aTasks: Task[] = [
    {
      id: "a1",
      title: "Task A",
      progress: 0,
      startDate: "2026-08-01T00:00:00",
      endDate: "2026-08-04T00:00:00",
      type: "task",
      parentId: null,
      predecessors: [],
    },
  ];
  const bTasks: Task[] = [
    {
      id: "b1",
      title: "Task B",
      progress: 0,
      startDate: "2026-08-01T00:00:00",
      endDate: "2026-08-04T00:00:00",
      type: "task",
      parentId: null,
      predecessors: [],
    },
  ];
  return (
    <div data-testid="multi">
      <div data-testid="gantt-a">
        <Gantt tasks={aTasks} displayOptions={DEFAULT_DISPLAY} />
      </div>
      <div data-testid="gantt-b">
        <Gantt tasks={bTasks} displayOptions={DEFAULT_DISPLAY} />
      </div>
    </div>
  );
}

export const MultiInstanceIsolation: Story = {
  render: () => <MultiInstanceHarness />,
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;
    const ganttA = root.querySelector(
      '[data-testid="gantt-a"]',
    ) as HTMLElement;
    const ganttB = root.querySelector(
      '[data-testid="gantt-b"]',
    ) as HTMLElement;
    expect(ganttA.textContent).toContain("Task A");
    expect(ganttB.textContent).toContain("Task B");
    expect(ganttA.textContent).not.toContain("Task B");
    expect(ganttB.textContent).not.toContain("Task A");

    const monthA = scaleButtons(ganttA).find(
      (b) => b.textContent?.trim() === "month",
    );
    click(monthA!);
    expect(activeScaleButton(ganttA)?.textContent?.trim()).toBe("month");
    expect(activeScaleButton(ganttB)?.textContent?.trim()).toBe("week");
  },
};

function InvalidDataHarness() {
  const [tasks, setTasks] = useState<Task[]>(VALID_TASKS);
  const [invalidLoaded, setInvalidLoaded] = useState(false);
  return (
    <div data-testid="harness">
      <button
        type="button"
        data-testid="invalid-btn"
        onClick={() => {
          setTasks(INVALID_TASKS as unknown as Task[]);
          setInvalidLoaded(true);
        }}
      >
        Load invalid
      </button>
      <button
        type="button"
        data-testid="valid-btn"
        onClick={() => {
          setTasks(VALID_TASKS);
          setInvalidLoaded(false);
        }}
      >
        Reload valid
      </button>
      <Gantt
        key={invalidLoaded ? "invalid" : "valid"}
        tasks={tasks}
        displayOptions={DEFAULT_DISPLAY}
      />
    </div>
  );
}

export const InvalidDataRejected: Story = {
  render: () => <InvalidDataHarness />,
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;
    const harness = root.querySelector(
      '[data-testid="harness"]',
    ) as HTMLElement;
    const invalidBtn = harness.querySelector(
      '[data-testid="invalid-btn"]',
    ) as HTMLButtonElement;
    const validBtn = harness.querySelector(
      '[data-testid="valid-btn"]',
    ) as HTMLButtonElement;
    expect(harness.textContent).toContain("Parent Task");

    click(invalidBtn);
    expect(harness.textContent).not.toContain("Bad Task");

    click(validBtn);
    expect(harness.textContent).toContain("Parent Task");
    expect(harness.textContent).not.toContain("Bad Task");
  },
};

function CallbackHarness() {
  const [clicked, setClicked] = useState<string | null>(null);
  return (
    <div data-testid="harness">
      <div data-testid="result">{clicked ?? "none"}</div>
      <Gantt
        tasks={VALID_TASKS}
        displayOptions={DEFAULT_DISPLAY}
        onTaskDoubleClick={(t) => setClicked(t.title)}
      />
    </div>
  );
}

export const TaskCallback: Story = {
  render: () => <CallbackHarness />,
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;
    const harness = root.querySelector(
      '[data-testid="harness"]',
    ) as HTMLElement;
    const titleEl = Array.from(
      harness.querySelectorAll<HTMLSpanElement>("span"),
    ).find((s) => s.textContent?.trim() === "Parent Task");
    expect(titleEl).toBeTruthy();
    flushSync(() =>
      titleEl!.dispatchEvent(
        new MouseEvent("dblclick", { bubbles: true, cancelable: true }),
      ),
    );
    expect(
      (harness.querySelector('[data-testid="result"]') as HTMLElement)
        .textContent,
    ).toBe("Parent Task");
  },
};

function RemountHarness() {
  const [show, setShow] = useState(true);
  const [counter, setCounter] = useState(0);
  return (
    <div data-testid="harness">
      <button
        type="button"
        data-testid="toggle-btn"
        onClick={() => setShow((s) => !s)}
      >
        Toggle
      </button>
      <button
        type="button"
        data-testid="counter-btn"
        onClick={() => setCounter((c) => c + 1)}
      >
        Count {counter}
      </button>
      {show && <Gantt tasks={VALID_TASKS} displayOptions={DEFAULT_DISPLAY} />}
    </div>
  );
}

export const UnmountRemount: Story = {
  render: () => <RemountHarness />,
  play: async ({ canvasElement }) => {
    const root = canvasElement as HTMLElement;
    const harness = root.querySelector(
      '[data-testid="harness"]',
    ) as HTMLElement;
    const toggle = harness.querySelector(
      '[data-testid="toggle-btn"]',
    ) as HTMLButtonElement;
    const counterBtn = harness.querySelector(
      '[data-testid="counter-btn"]',
    ) as HTMLButtonElement;
    expect(harness.textContent).toContain("Parent Task");
    click(toggle);
    expect(harness.textContent).not.toContain("Parent Task");
    click(counterBtn);
    click(toggle);
    expect(harness.textContent).toContain("Parent Task");
    expect(harness.textContent).toContain("Count 1");
  },
};
