// Post-processing for routed dependency polylines.
//
// Industry Gantt tools (MS Project, Jira Plans, Smartsheet, Asana Timeline)
// always draw a dependency link that *leaves* the predecessor horizontally and
// *enters* the successor horizontally. That guarantees the arrowhead is
// axis-aligned instead of ending mid-corner at a random tangent, and it gives
// the eye a clear "start here / land there" read.
//
// The A* router only guarantees an orthogonal polyline, so we normalise the
// first and last segments here before the path is rounded and rendered.

import type { DepPoint } from "../ui/dependencyRouter";

const EPS = 0.5;

function isHorizontal(a: DepPoint, b: DepPoint): boolean {
  return Math.abs(a.y - b.y) <= EPS;
}

function isVertical(a: DepPoint, b: DepPoint): boolean {
  return Math.abs(a.x - b.x) <= EPS;
}

/** Remove duplicate and collinear points so rounding has clean corners. */
export function simplifyRoute(points: DepPoint[]): DepPoint[] {
  const out: DepPoint[] = [];
  for (const p of points) {
    const last = out[out.length - 1];
    if (last && Math.abs(last.x - p.x) <= EPS && Math.abs(last.y - p.y) <= EPS) continue;
    out.push({ x: p.x, y: p.y });
  }
  const result: DepPoint[] = [];
  for (let i = 0; i < out.length; i += 1) {
    const prev = result[result.length - 1];
    const next = out[i + 1];
    const curr = out[i];
    if (prev && next) {
      const collinear =
        (isHorizontal(prev, curr) && isHorizontal(curr, next)) ||
        (isVertical(prev, curr) && isVertical(curr, next));
      if (collinear) continue;
    }
    result.push(curr);
  }
  return result;
}

/**
 * Force a horizontal exit stub at the source and a horizontal entry stub at
 * the target, both at least `exit` / `entry` pixels long.
 */
export function withApproachStubs(
  points: DepPoint[],
  { exit = 14, entry = 18 }: { exit?: number; entry?: number } = {},
): DepPoint[] {
  let pts = simplifyRoute(points);
  if (pts.length < 2) return pts;

  // ── Source: horizontal departure to the right ──
  const start = pts[0];
  const second = pts[1];
  if (isHorizontal(start, second)) {
    const dir = second.x >= start.x ? 1 : -1;
    if (Math.abs(second.x - start.x) < exit) {
      const newX = start.x + exit * dir;
      second.x = newX;
      const third = pts[2];
      if (third && isVertical(second, third)) third.x = newX;
    }
  } else {
    const stubX = start.x + exit;
    second.x = stubX;
    const third = pts[2];
    if (third && isVertical(second, third)) third.x = stubX;
    pts = [start, { x: stubX, y: start.y }, ...pts.slice(1)];
  }

  pts = simplifyRoute(pts);
  if (pts.length < 2) return pts;

  // ── Target: horizontal arrival so the arrowhead is axis-aligned ──
  const end = pts[pts.length - 1];
  const beforeEnd = pts[pts.length - 2];
  if (isHorizontal(beforeEnd, end)) {
    const dir = end.x >= beforeEnd.x ? 1 : -1;
    if (Math.abs(end.x - beforeEnd.x) < entry) {
      const newX = end.x - entry * dir;
      beforeEnd.x = newX;
      const beforeThat = pts[pts.length - 3];
      if (beforeThat && isVertical(beforeThat, beforeEnd)) beforeThat.x = newX;
    }
  } else {
    const stubX = end.x - entry;
    beforeEnd.x = stubX;
    const beforeThat = pts[pts.length - 3];
    if (beforeThat && isVertical(beforeThat, beforeEnd)) beforeThat.x = stubX;
    pts = [...pts.slice(0, pts.length - 1), { x: stubX, y: end.y }, end];
  }

  return simplifyRoute(pts);
}
