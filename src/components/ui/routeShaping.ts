// Shapes an already-routed orthogonal polyline (output of routeDependencies)
// into the "S-curve" silhouette dependency lines are expected to have: a
// short horizontal stub leaving the predecessor, one or more vertical/
// horizontal jogs around obstacles (untouched — these come straight from
// the router), and a short horizontal stub entering the successor.
//
// This module never re-runs pathfinding. The two stub helpers below handle
// two distinct cases coming out of the router:
//
//   Case A — the route already ends (or starts) on a horizontal run: we
//   just trim/extend that run to exactly `stubLength`.
//
//   Case B — the route approaches the endpoint on a purely vertical run
//   (no horizontal segment at all right before the endpoint). Naively
//   appending a stub point here would either produce a diagonal segment or
//   an odd backtracking "hook". Instead we shift the entire contiguous
//   vertical run sideways by `stubLength` so it lines up with the stub
//   column, then the final hop into the endpoint is a clean, single
//   horizontal segment. This is what guarantees the arrowhead's final
//   tangent always points horizontally into the task/milestone, and is
//   what fixes routes whose last leg was rendering as vertical (or
//   effectively missing, since a near-zero-length dangling segment can
//   collapse away).
//
// ── Root-cause fix (2026-08) ──────────────────────────────────────────────
//
//   When A* returns an L-shaped route (horizontal hop to target.x, then
//   vertical drop to target.y), Case A of applyExitStub previously shifted
//   the *entire* vertical run — including the terminal point — to stubX.
//   This dragged the entry anchor from (targetX, targetY) to (stubX, targetY),
//   so applyEntryStub then saw a degenerate situation: its mirrored Case B
//   shifted the entire intermediate column back, overwriting the exit-stub
//   corner and producing an all-vertical path with no horizontal segments.
//
//   Fix (Part 1): both Case A and Case B now cap j at n−1 so the terminal
//   point is never consumed into shiftedRun. applyEntryStub (which reuses
//   applyExitStub in mirrored space) inherits the same protection, keeping
//   the exit-stub corner untouched when the entry stub is being shaped.
//
//   Fix (Part 2): widenFirstJog now searches for the first interior
//   horizontal jog starting at index 2 (never index 1, which is the
//   exit-stub corner) and its column-propagation loops are bounded so they
//   can never reach index 0/1 (exit stub) or index n−2/n−1 (entry stub).

import type { DepPoint, DepRect } from "./dependencyRouter";

export interface ShapeRouteOptions {
  /** Length of the straight run leaving the source, in px. */
  exitStubLength?: number;
  /** Length of the straight run entering the target, in px. */
  entryStubLength?: number;
  /** Minimum length for the first interior horizontal jog, in px. */
  minFirstJogLength?: number;
}

const DEFAULT_EXIT_STUB = 14;
const DEFAULT_ENTRY_STUB = 14;
const DEFAULT_MIN_FIRST_JOG = 32;

function dedupeConsecutive(points: DepPoint[]): DepPoint[] {
  const out: DepPoint[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (!last || last.x !== p.x || last.y !== p.y) out.push(p);
  }
  return out;
}

// Defensive only — A* already returns grid-aligned (orthogonal) points, but
// the direct from/to fallback path (used when a point can't be located on
// the grid) can be a single diagonal hop, so this still guards against that.
function splitDiagonals(points: DepPoint[]): DepPoint[] {
  if (points.length < 2) return points;
  const out: DepPoint[] = [points[0]];
  for (let i = 1; i < points.length; i += 1) {
    const prev = out[out.length - 1];
    const curr = points[i];
    if (prev.x !== curr.x && prev.y !== curr.y) {
      out.push({ x: curr.x, y: prev.y });
    }
    out.push(curr);
  }
  return out;
}

/**
 * Force the route to leave `points[0]` on a horizontal run of exactly
 * `stubLength`, extending to the RIGHT of the source (predecessors exit
 * rightward in this Gantt's connector geometry).
 *
 * Two cases coming out of the router:
 *   Case A — `points[1]` already shares the source's y (a horizontal run
 *   exists). The run's corner — where it turns vertical — is shifted
 *   sideways to the stub column as one contiguous block, so everything
 *   downstream of the corner stays correctly aligned with it.
 *   Case B — `points[1]` departs vertically with no horizontal run at all.
 *   An explicit stub point is inserted to bridge the source's y to the
 *   (shifted) vertical run, then that run is shifted to the stub column.
 *
 * Routes that are already a single straight horizontal line all the way to
 * the far endpoint are left untouched (nothing needs reshaping, and the far
 * endpoint must never be consumed here — that's the entry stub's job).
 *
 * IMPORTANT: j is capped at n−1 in both cases to ensure the terminal point
 * (the entry anchor, points[n-1]) is never pulled into shiftedRun. Without
 * this cap, an L-shaped route whose entire vertical leg shares the same x as
 * the pivot would have its destination dragged to stubX, which then causes
 * applyEntryStub (which reuses this function in mirrored space) to
 * overwrite the exit-stub corner and produce an all-vertical output.
 */
function applyExitStub(points: DepPoint[], stubLength: number): DepPoint[] {
  const n = points.length;
  if (n < 2) return points;

  const anchor = points[0];
  const stubX = anchor.x + stubLength;

  if (points[1].y === anchor.y) {
    // Case A.
    let i = 1;
    while (i < n && points[i].y === anchor.y) i += 1;
    if (i >= n) return points; // straight line the whole way; nothing to reshape

    const pivotX = points[i - 1].x; // === points[i].x by orthogonality
    let j = i;
    // Cap at n-1: never consume the terminal point (entry anchor) into the
    // shifted run — it must remain at its original coordinates so that
    // applyEntryStub can find and reshape it correctly afterward.
    while (j < n - 1 && points[j].x === pivotX) j += 1;

    const before = points.slice(0, 1); // just the anchor — any interior points
    // that also shared anchor.y were redundant waypoints along the same
    // straight run and are safely discarded, not left stranded at their
    // old x while the corner shifts.
    const shiftedRun = points.slice(i - 1, j).map((p) => ({ x: stubX, y: p.y }));
    const after = points.slice(j);
    return [...before, ...shiftedRun, ...after];
  }

  // Case B.
  const runX = points[1].x;
  let j = 1;
  // Cap at n-1: same reason as Case A — preserve the terminal point.
  while (j < n - 1 && points[j].x === runX) j += 1;
  const stubPoint = { x: stubX, y: anchor.y };
  const shiftedRun = points.slice(1, j).map((p) => ({ x: stubX, y: p.y }));
  const after = points.slice(j);
  return [anchor, stubPoint, ...shiftedRun, ...after];
}

/**
 * Symmetric counterpart of applyExitStub: force the route to arrive at its
 * final point on a horizontal run of exactly `stubLength`, extending to the
 * LEFT of the target (successors are entered from the left). This is what
 * guarantees the arrowhead's final tangent always points horizontally into
 * the task/milestone, regardless of which direction the router's own last
 * internal waypoint happened to approach from.
 *
 * Implemented by mirroring the array (reverse order + negate x), reusing
 * the verified applyExitStub logic in that mirrored space, then mirroring
 * back — rather than a separately hand-derived (and easy to get subtly
 * wrong) backward version of the same algorithm.
 */
function applyEntryStub(points: DepPoint[], stubLength: number): DepPoint[] {
  if (points.length < 2) return points;
  const mirrored = points
    .slice()
    .reverse()
    .map((p) => ({ x: -p.x, y: p.y }));
  const shaped = applyExitStub(mirrored, stubLength);
  return shaped.map((p) => ({ x: -p.x, y: p.y })).reverse();
}

function isHorizontalSpanFree(x1: number, x2: number, y: number, obstacles: DepRect[]): boolean {
  const lo = Math.min(x1, x2);
  const hi = Math.max(x1, x2);
  for (const r of obstacles) {
    if (y > r.y && y < r.y + r.h && lo < r.x + r.w && hi > r.x) return false;
  }
  return true;
}

// Widen the first interior horizontal segment (the jog right after the
// initial exit stub) up to `minLength`, extending each end independently
// and only when the extension doesn't pass through a task bar. Adjacent
// vertical runs are shifted in lockstep so the route stays orthogonal.
//
// Search starts at i=2 (index 1 is the exit-stub corner — never widen
// that), and column-propagation is bounded so it never reaches the exit
// stub (indices 0 and 1) or the entry stub (indices n-2 and n-1).
function widenFirstJog(points: DepPoint[], obstacles: DepRect[], minLength: number): DepPoint[] {
  let ai = -1;
  // Start at 2: index 1 is the exit-stub corner; widening must never touch it.
  // Stop at length-2: index n-2 is the entry-stub corner.
  for (let i = 2; i < points.length - 2; i += 1) {
    if (points[i].y === points[i + 1].y) {
      ai = i;
      break;
    }
  }
  if (ai === -1) return points;

  const a = points[ai];
  const b = points[ai + 1];
  const length = Math.abs(b.x - a.x);
  if (length >= minLength) return points;

  const deficit = minLength - length;
  const half = deficit / 2;
  const dir = b.x >= a.x ? 1 : -1; // segment runs left(a)->right(b) if dir===1

  const candidateAx = a.x - dir * half;
  const candidateBx = b.x + dir * half;

  const leftOk = isHorizontalSpanFree(candidateAx, a.x, a.y, obstacles);
  const rightOk = isHorizontalSpanFree(b.x, candidateBx, b.y, obstacles);

  const newAx = leftOk ? candidateAx : a.x;
  const newBx = rightOk ? candidateBx : b.x;
  if (newAx === a.x && newBx === b.x) return points;

  const out = points.map((p) => ({ ...p }));

  // Extend left: propagate newAx backward, but stop at index 1 (exit-stub
  // corner) so the exit stub's length is never altered by this pass.
  if (newAx !== a.x) {
    for (let i = ai; i >= 1 && out[i].x === a.x; i -= 1) out[i] = { ...out[i], x: newAx };
  }
  // Extend right: propagate newBx forward, but stop at index n-2 (entry-stub
  // corner) so the entry stub's length is never altered by this pass.
  if (newBx !== b.x) {
    for (let i = ai + 1; i <= out.length - 2 && out[i].x === b.x; i += 1) out[i] = { ...out[i], x: newBx };
  }

  return out;
}

/**
 * Apply the full shaping pass to a single routed polyline. `obstacles`
 * should be the same task-bar rects passed into `routeDependencies` so the
 * jog-widening step never draws through a task.
 */
export function shapeOrthogonalRoute(
  route: DepPoint[],
  obstacles: DepRect[],
  options: ShapeRouteOptions = {},
): DepPoint[] {
  if (route.length < 2) return route;

  const exitStubLength = options.exitStubLength ?? DEFAULT_EXIT_STUB;
  const entryStubLength = options.entryStubLength ?? DEFAULT_ENTRY_STUB;
  const minFirstJogLength = options.minFirstJogLength ?? DEFAULT_MIN_FIRST_JOG;

  let points = splitDiagonals(route);
  points = dedupeConsecutive(points);
  points = applyExitStub(points, exitStubLength);
  points = dedupeConsecutive(points);
  points = applyEntryStub(points, entryStubLength);
  points = dedupeConsecutive(points);
  points = widenFirstJog(points, obstacles, minFirstJogLength);
  points = dedupeConsecutive(points);

  return points;
}