// Turns an already-routed orthogonal polyline into an SVG path string with
// XYFlow-style rounded corners (the same idea `getSmoothStepPath` uses
// internally: back off from each vertex by a small radius along the incoming
// direction, then draw a quadratic curve through the vertex to a point offset
// along the outgoing direction). This file only touches path *string*
// generation — it never changes point positions, so it can sit directly on
// top of `routeDependencies()` output without affecting obstacle avoidance.

import type { DepPoint } from "../ui/dependencyRouter";

const MIN_RADIUS_SEGMENT = 1; // below this we just draw a straight join, no curve

export interface EdgePathOptions {
  /** Corner radius in px. Clamped per-corner so it never overruns a short segment. */
  radius?: number;
}

function dist(a: DepPoint, b: DepPoint): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/**
 * Convert a polyline of orthogonal points into a rounded SVG path `d` string.
 * Mirrors XYFlow's smooth-step corner treatment: straight `L` segments with a
 * short `Q` (quadratic) curve carved out of each interior vertex.
 */
export function toRoundedPath(points: DepPoint[], options: EdgePathOptions = {}): string {
  const radius = options.radius ?? 8;

  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i += 1) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    const distToPrev = dist(prev, curr);
    const distToNext = dist(curr, next);

    // Clamp so the rounded corner never eats more than half of either
    // adjoining segment (avoids overshoot on short hops near obstacles).
    const r = Math.min(radius, distToPrev / 2, distToNext / 2);

    if (r < MIN_RADIUS_SEGMENT) {
      d += ` L ${curr.x} ${curr.y}`;
      continue;
    }

    const inX = curr.x - ((curr.x - prev.x) / distToPrev) * r;
    const inY = curr.y - ((curr.y - prev.y) / distToPrev) * r;
    const outX = curr.x + ((next.x - curr.x) / distToNext) * r;
    const outY = curr.y + ((next.y - curr.y) / distToNext) * r;

    d += ` L ${inX} ${inY} Q ${curr.x} ${curr.y} ${outX} ${outY}`;
  }

  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;

  return d;
}

/** Straight-line fallback (no rounding) — kept for parity/debugging. */
export function toStraightPath(points: DepPoint[]): string {
  if (points.length === 0) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}