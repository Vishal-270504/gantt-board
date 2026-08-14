// Lightweight orthogonal routing for Gantt dependency connectors.
//
// Builds a coarse grid from task-bar boundaries and connector endpoints, then
// A*-searches each connector so the route travels horizontally along the free
// lanes between task rows and vertically along free corridors, treating task
// bars as solid obstacles. Already-used grid edges are mildly penalised so that
// connector lines spread out and avoid overlapping each other where reasonable.

export interface DepPoint {
  x: number;
  y: number;
}

export interface DepRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface DepConnector {
  from: DepPoint;
  to: DepPoint;
}

// Horizontal/vertical remove-from-task clearance used to decide whether a
// segment is inside a bar. Boundary lines (exact row edges) are intentionally
// treated as free space so routes thread through the gutters between rows.
const EDGE_WEIGHT_PENALTY = 20;
const ESCAPE_MARGIN = 120;
const LANE_CENTER_PENALTY = 30;

function minMax(values: number[]): [number, number] {
  let lo = Infinity;
  let hi = -Infinity;
  for (const v of values) {
    if (v < lo) lo = v;
    if (v > hi) hi = v;
  }
  return [lo, hi];
}

function uniqueSorted(values: number[]): number[] {
  return Array.from(new Set(values)).sort((a, b) => a - b);
}

function horizontallyBlocked(x1: number, x2: number, y: number, rects: DepRect[]): boolean {
  for (const r of rects) {
    if (y > r.y && y < r.y + r.h && x1 < r.x + r.w && x2 > r.x) return true;
  }
  return false;
}

function verticallyBlocked(y1: number, y2: number, x: number, rects: DepRect[]): boolean {
  for (const r of rects) {
    if (x > r.x && x < r.x + r.w && y1 < r.y + r.h && y2 > r.y) return true;
  }
  return false;
}

// Every task-bar x boundary (left or right edge). Vertical connector segments
// are penalised when they run along one of these so routes prefer to travel
// down the middle of the free lane between task bars.
function boundarySet(rects: DepRect[]): Set<number> {
  const s = new Set<number>();
  for (const r of rects) {
    s.add(r.x);
    s.add(r.x + r.w);
  }
  return s;
}

// Insert the midpoint of each gap between two adjacent task-bar boundaries so
// A* has a column in the center of the free lane to route vertical segments.
function withLaneCenters(vals: number[], boundaries: Set<number>): number[] {
  const out: number[] = [];
  for (let i = 0; i < vals.length - 1; i += 1) {
    const a = vals[i];
    const b = vals[i + 1];
    out.push(a);
    if (boundaries.has(a) && boundaries.has(b)) out.push((a + b) / 2);
  }
  out.push(vals[vals.length - 1]);
  return out;
}

function segmentKey(idA: number, idB: number): string {
  return idA < idB ? `${idA}-${idB}` : `${idB}-${idA}`;
}

interface AStarNode {
  id: number;
  f: number;
  g: number;
  prev: number | null;
}

export function routeDependencies(
  connectors: DepConnector[],
  obstacles: DepRect[],
  rowHeight: number,
): DepPoint[][] {
  if (connectors.length === 0) return [];

  const rects: DepRect[] = obstacles;

  // ── Build the routing grid ──
  const xsRaw: number[] = [];
  const ysRaw: number[] = [];

  let maxBottom = 0;
  for (const r of rects) {
    xsRaw.push(r.x, r.x + r.w);
    ysRaw.push(r.y, r.y + r.h);
    if (r.y + r.h > maxBottom) maxBottom = r.y + r.h;
  }
  for (const c of connectors) {
    xsRaw.push(c.from.x, c.to.x);
    ysRaw.push(c.from.y, c.to.y);
  }

  // Row boundaries (gutter lanes) from the top down to the last row.
  const rowCount = Math.ceil(maxBottom / rowHeight) + 1;
  for (let r = 0; r <= rowCount; r += 1) ysRaw.push(r * rowHeight);

  const [minXi, maxXi] = minMax(xsRaw);
  const [minYi, maxYi] = minMax(ysRaw);
  xsRaw.push(minXi - ESCAPE_MARGIN, maxXi + ESCAPE_MARGIN);
  ysRaw.push(minYi - ESCAPE_MARGIN, maxYi + ESCAPE_MARGIN);

  const boundaries = boundarySet(rects);
  const xs = withLaneCenters(uniqueSorted(xsRaw), boundaries);
  const ys = uniqueSorted(ysRaw);
  const xCount = xs.length;
  const yCount = ys.length;

  const xIndex = new Map<number, number>();
  xs.forEach((x, i) => xIndex.set(x, i));
  const yIndex = new Map<number, number>();
  ys.forEach((y, i) => yIndex.set(y, i));

  const nodeId = (xi: number, yi: number): number => yi * xCount + xi;
  const usedEdges = new Map<string, number>();

  const trace = (from: DepPoint, to: DepPoint): DepPoint[] => {
    const startXi = xIndex.get(from.x);
    const startYi = yIndex.get(from.y);
    const targetXi = xIndex.get(to.x);
    const targetYi = yIndex.get(to.y);
    if (
      startXi === undefined ||
      startYi === undefined ||
      targetXi === undefined ||
      targetYi === undefined
    ) {
      return [from, to];
    }

    const startId = nodeId(startXi, startYi);
    const targetId = nodeId(targetXi, targetYi);
    const total = xCount * yCount;

    const open = new Heap<AStarNode>((a, b) => a.f - b.f);
    const gScore = new Float64Array(total).fill(Infinity);
    const cameFrom = new Int32Array(total).fill(-1);
    const closed = new Uint8Array(total);

    gScore[startId] = 0;
    open.push({
      id: startId,
      f: Math.abs(to.x - from.x) + Math.abs(to.y - from.y),
      g: 0,
      prev: null,
    });

    let found = false;

    while (open.size() > 0) {
      const current = open.pop()!;
      if (current.id === targetId) {
        found = true;
        break;
      }
      if (closed[current.id]) continue;
      closed[current.id] = 1;

      const cx = current.id % xCount;
      const cy = Math.floor(current.id / xCount);
      const cxCoord = xs[cx];
      const cyCoord = ys[cy];

      const neighbors: Array<{ id: number; weight: number; blocked: boolean }> = [];

      if (cx > 0) {
        const x1 = xs[cx - 1];
        neighbors.push({
          id: nodeId(cx - 1, cy),
          weight: x1 !== cxCoord ? Math.abs(cxCoord - x1) : Infinity,
          blocked: horizontallyBlocked(x1, cxCoord, cyCoord, rects),
        });
      }
      if (cx < xCount - 1) {
        const x2 = xs[cx + 1];
        neighbors.push({
          id: nodeId(cx + 1, cy),
          weight: Math.abs(x2 - cxCoord),
          blocked: horizontallyBlocked(cxCoord, x2, cyCoord, rects),
        });
      }
      const lanePenalty = boundaries.has(cxCoord) ? LANE_CENTER_PENALTY : 0;
      if (cy > 0) {
        const y1 = ys[cy - 1];
        neighbors.push({
          id: nodeId(cx, cy - 1),
          weight: Math.abs(cyCoord - y1) + lanePenalty,
          blocked: verticallyBlocked(y1, cyCoord, cxCoord, rects),
        });
      }
      if (cy < yCount - 1) {
        const y2 = ys[cy + 1];
        neighbors.push({
          id: nodeId(cx, cy + 1),
          weight: Math.abs(y2 - cyCoord) + lanePenalty,
          blocked: verticallyBlocked(cyCoord, y2, cxCoord, rects),
        });
      }

      for (const n of neighbors) {
        if (n.blocked || n.weight === Infinity) continue;
        if (closed[n.id]) continue;

        const edge = segmentKey(current.id, n.id);
        const reuse = usedEdges.get(edge) ?? 0;
        const tentative = current.g + n.weight + reuse * EDGE_WEIGHT_PENALTY;

        if (tentative < gScore[n.id]) {
          gScore[n.id] = tentative;
          cameFrom[n.id] = current.id;
          const nx = n.id % xCount;
          const ny = Math.floor(n.id / xCount);
          open.push({
            id: n.id,
            f: tentative + Math.abs(xs[targetXi] - xs[nx]) + Math.abs(ys[targetYi] - ys[ny]),
            g: tentative,
            prev: current.id,
          });
        }
      }
    }

    if (!found) {
      return [from, to];
    }

    // Reconstruct path ids, oldest first.
    const ids: number[] = [];
    let curId = targetId;
    while (curId !== -1) {
      ids.push(curId);
      curId = cameFrom[curId];
    }
    ids.reverse();

    // Record used edges to spread subsequent lines.
    for (let i = 0; i < ids.length - 1; i += 1) {
      const edge = segmentKey(ids[i], ids[i + 1]);
      usedEdges.set(edge, (usedEdges.get(edge) ?? 0) + 1);
    }

    return ids.map((id) => {
      const xi = id % xCount;
      const yi = Math.floor(id / xCount);
      return { x: xs[xi], y: ys[yi] };
    });
  };

  return connectors.map((c) => trace(c.from, c.to));
}

// Minimal binary min-heap keyed by the supplied comparator.
class Heap<T> {
  private readonly items: T[] = [];
  private readonly less: (a: T, b: T) => number;

  constructor(less: (a: T, b: T) => number) {
    this.less = less;
  }

  size(): number {
    return this.items.length;
  }

  push(item: T): void {
    const items = this.items;
    items.push(item);
    let i = items.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.less(items[i], items[parent]) >= 0) break;
      const tmp = items[i];
      items[i] = items[parent];
      items[parent] = tmp;
      i = parent;
    }
  }

  pop(): T | undefined {
    const items = this.items;
    if (items.length === 0) return undefined;
    const top = items[0];
    const last = items.pop()!;
    if (items.length > 0) {
      items[0] = last;
      let i = 0;
      for (;;) {
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        let smallest = i;
        if (left < items.length && this.less(items[left], items[smallest]) < 0) smallest = left;
        if (right < items.length && this.less(items[right], items[smallest]) < 0) smallest = right;
        if (smallest === i) break;
        const tmp = items[i];
        items[i] = items[smallest];
        items[smallest] = tmp;
        i = smallest;
      }
    }
    return top;
  }
}