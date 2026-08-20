// Deterministic finish-to-start link routing, matching how established Gantt
// tools (MS Project, Bryntum, Smartsheet, Jira Plans) draw dependencies:
//
//   • the link always leaves the predecessor's right edge horizontally
//   • the link always enters the successor's left edge horizontally
//   • when there is room, it is a single elbow: stub → vertical drop → stub
//   • when the successor starts before the predecessor ends, the link detours
//     through the empty gutter between two rows instead of crossing bars
//
// Deterministic routing means links never jitter between renders, they read
// the same way everywhere in the chart, and the arrowhead is always horizontal.

import type { DepPoint } from "../ui/dependencyRouter";

export interface LinkRouteOptions {
  /** Minimum horizontal run leaving the predecessor. */
  exitStub?: number;
  /** Minimum horizontal run entering the successor (the arrow approach). */
  entryStub?: number;
  /** Row pitch, used to find the gutter between rows for detours. */
  rowHeight: number;
}

/**
 * @param from right edge / vertical center of the predecessor
 * @param to   left edge / vertical center of the successor (arrow tip)
 */
export function routeGanttLink(
  from: DepPoint,
  to: DepPoint,
  { exitStub = 14, entryStub = 16, rowHeight }: LinkRouteOptions,
): DepPoint[] {
  const sameRow = Math.abs(to.y - from.y) < 1;
  const hasRoom = to.x - from.x >= exitStub + entryStub;

  if (sameRow && hasRoom) {
    return [
      { x: from.x, y: from.y },
      { x: to.x, y: to.y },
    ];
  }

  if (hasRoom) {
    // Standard elbow: run out, drop right before the successor, run in.
    const turnX = to.x - entryStub;
    return [
      { x: from.x, y: from.y },
      { x: turnX, y: from.y },
      { x: turnX, y: to.y },
      { x: to.x, y: to.y },
    ];
  }

  // Backwards / overlapping link: detour through the gutter next to the
  // successor row so the line never runs across a task bar.
  const goingDown = to.y >= from.y;
  const gutterY = goingDown ? to.y - rowHeight / 2 : to.y + rowHeight / 2;
  const outX = from.x + exitStub;
  const inX = to.x - entryStub;

  return [
    { x: from.x, y: from.y },
    { x: outX, y: from.y },
    { x: outX, y: gutterY },
    { x: inX, y: gutterY },
    { x: inX, y: to.y },
    { x: to.x, y: to.y },
  ];
}
