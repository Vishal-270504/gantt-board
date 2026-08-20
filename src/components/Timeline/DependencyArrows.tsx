import { useCallback, useMemo, useState, type CSSProperties } from "react";
import type { PositionedTask } from "../../features/dashboard/types";
import type { DepRect, DepPoint } from "../ui/dependencyRouter";
import { routeGanttLink } from "./ganttLinkRoute";
import { DependencyEdge, type DependencyEdgeState } from "./DependencyEdge";
import { toRoundedPath } from "./EdgePath";
import { withApproachStubs } from "./edgeStubs";

// ── Visual constants ──────────────────────────────────────────────────────
// (Routing constants — bar geometry, arrow gap, etc. — are unchanged from
// the original implementation; only rendering constants live here.)
const ARROW_GAP = 3;
const PADDING = 16;
const CORNER_RADIUS = 6;
const EXIT_STUB = 14;
const ENTRY_STUB = 18;

// Geometry constants that match Taskbar.tsx
const BAR_LEFT_OFFSET = 17;
const BAR_WIDTH_OFFSET = 15;
const BAR_TOP_MARGIN = 4;
const BAR_HEIGHT_OFFSET = 8;
const TITLE_GAP = 8;
const CHAR_WIDTH = 7;
const BAR_PADDING = 16;
const MILESTONE_SIZE = 14;

// Colors mirrored 1:1 with the CSS variables read by DependencyEdge.tsx, so
// the <marker> fills (which can't reliably read CSS vars for `fill` across
// browsers) always match the stroke of the path they're attached to.
const COLOR_DEFAULT = "#64748b"; // slate-500 — neutral, reads over any bar color
const COLOR_HOVER = "#2563eb"; // blue-600
const COLOR_SELECTED = "#1d4ed8"; // blue-700

const MARKER_ID_DEFAULT = "dep-arrow-default";
const MARKER_ID_HOVER = "dep-arrow-hover";
const MARKER_ID_SELECTED = "dep-arrow-selected";

interface DependencyArrowsProps {
  tasks: PositionedTask[];
  rowHeight: number;
  /** Controlled selection (optional) — omit to let the component manage it internally. */
  selectedDependencyKey?: string | null;
  onSelectDependency?: (key: string | null) => void;
}

function boundsOf(pointsList: DepPoint[][]): { width: number; height: number } {
  let maxX = 0;
  let maxY = 0;
  for (const points of pointsList) {
    for (const p of points) {
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }
  }
  return { width: maxX + PADDING, height: maxY + PADDING };
}

// Compute content bounding box (bar + title) for a task
function getContentRect(task: PositionedTask): DepRect {
  if (task.type === "milestone" || task.width === 0) {
    return {
      x: task.left - 8,
      y: task.top + BAR_TOP_MARGIN,
      w: 16,
      h: task.rowHeight - BAR_HEIGHT_OFFSET,
    };
  }

  const barLeft = task.left - BAR_LEFT_OFFSET;
  const barRight = barLeft + task.width - BAR_WIDTH_OFFSET;
  const barTop = task.top + BAR_TOP_MARGIN;
  const barBottom = barTop + task.rowHeight - BAR_HEIGHT_OFFSET;

  const estimatedTextWidth = task.title.length * CHAR_WIDTH + BAR_PADDING;
  const titleFits = estimatedTextWidth <= task.width;

  const contentLeft = barLeft;
  const contentRight = titleFits
    ? barRight
    : barRight + TITLE_GAP + task.title.length * CHAR_WIDTH;
  const contentTop = barTop;
  const contentBottom = barBottom;

  return {
    x: contentLeft,
    y: contentTop,
    w: contentRight - contentLeft,
    h: contentBottom - contentTop,
  };
}

function markerIdFor(state: DependencyEdgeState): string {
  if (state === "selected") return MARKER_ID_SELECTED;
  if (state === "hovered") return MARKER_ID_HOVER;
  return MARKER_ID_DEFAULT;
}

// A single closed-triangle arrowhead, XYFlow's `ArrowClosed`-style: it uses
// `orient="auto-start-reverse"` so it always points along the *actual* final
// tangent of the path it's attached to, rather than being pinned to a fixed
// angle (the previous implementation used a hardcoded orient="0", so the
// arrowhead could end up misaligned whenever a route's last segment wasn't a
// simple left-to-right approach).
function ArrowMarkerDefs() {
  return (
    <defs>
      {([
        [MARKER_ID_DEFAULT, COLOR_DEFAULT],
        [MARKER_ID_HOVER, COLOR_HOVER],
        [MARKER_ID_SELECTED, COLOR_SELECTED],
      ] as const).map(([id, color]) => (
        <marker
          key={id}
          id={id}
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="10"
          markerHeight="10"
          markerUnits="userSpaceOnUse"
          orient="auto-start-reverse"
        >
          <path d="M 0.5,0.8 L 9.2,5 L 0.5,9.2 Z" fill={color} stroke="none" strokeLinejoin="round" />
        </marker>
      ))}
    </defs>
  );
}

export function DependencyArrows({
  tasks,
  rowHeight,
  selectedDependencyKey,
  onSelectDependency,
}: DependencyArrowsProps) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [internalSelectedKey, setInternalSelectedKey] = useState<string | null>(null);

  const selectedKey = selectedDependencyKey !== undefined ? selectedDependencyKey : internalSelectedKey;

  const setSelectedKey = useCallback(
    (key: string | null) => {
      if (onSelectDependency) {
        onSelectDependency(key);
      } else {
        setInternalSelectedKey(key);
      }
    },
    [onSelectDependency],
  );

  const handleMouseEnter = useCallback((key: string) => setHoveredKey(key), []);
  const handleMouseLeave = useCallback(
    (key: string) => setHoveredKey((current) => (current === key ? null : current)),
    [],
  );
  const handleClick = useCallback(
    (key: string) => setSelectedKey(selectedKey === key ? null : key),
    [selectedKey, setSelectedKey],
  );

  // Routes are deterministic elbows (see ganttLinkRoute.ts) — memoized so
  // hundreds of edges don't get re-routed on hover/selection changes.
  const { keys, adjustedRoutes } = useMemo(() => {
    if (!tasks.length) return { keys: [] as string[], adjustedRoutes: [] as DepPoint[][] };

    const taskMap = new Map<string, PositionedTask>();
    tasks.forEach((t) => taskMap.set(t.id, t));

    const routes: DepPoint[][] = [];
    const localKeys: string[] = [];

    tasks.forEach((successor) => {
      if (!successor.predecessors?.length) return;

      successor.predecessors.forEach((predId) => {
        const pred = taskMap.get(predId);
        if (!pred) return;

        const predRect = getContentRect(pred);
        const succRect = getContentRect(successor);

        const isPredMilestone = pred.type === "milestone" || pred.width === 0;
        const isSuccMilestone = successor.type === "milestone" || successor.width === 0;

        const sourceBaseX = isPredMilestone ? pred.left + MILESTONE_SIZE + 1.80 : predRect.x + predRect.w;
        const sourceY = pred.top + rowHeight / 2;

        const targetBaseX = isSuccMilestone ? successor.left : succRect.x;
        const targetY = successor.top + rowHeight / 2;

        // The arrowhead tip sits on the last point, so stop just shy of the milestone.
        const adjustedTargetX = isSuccMilestone ? targetBaseX - MILESTONE_SIZE / 2.80 : targetBaseX - ARROW_GAP;

        routes.push(
          routeGanttLink(
            { x: sourceBaseX, y: sourceY },
            { x: adjustedTargetX, y: targetY },
            { rowHeight, exitStub: EXIT_STUB, entryStub: ENTRY_STUB },
          ),
        );
        localKeys.push(`${pred.id}->${successor.id}`);
      });
    });

    if (routes.length === 0) return { keys: [] as string[], adjustedRoutes: [] as DepPoint[][] };

    const shaped = routes.map((route) =>
      withApproachStubs(route, { exit: EXIT_STUB, entry: ENTRY_STUB }),
    );

    return { keys: localKeys, adjustedRoutes: shaped };
  }, [tasks, rowHeight]);


  // Presentation-only step: turn each routed polyline into a rounded path
  // string. Purely a rendering concern — the underlying points never change.
  const paths = useMemo(
    () => adjustedRoutes.map((route) => toRoundedPath(route, { radius: CORNER_RADIUS })),
    [adjustedRoutes],
  );

  const { width, height } = useMemo(() => boundsOf(adjustedRoutes), [adjustedRoutes]);

  if (!tasks.length || keys.length === 0) return null;

  // Draw order = z-order in SVG. Keep everything in its natural order except
  // promote the hovered edge, then the selected edge (highest priority), to
  // the end so they visually sit above the rest of the dependency graph —
  // the same "selected edges render last" convention XYFlow uses internally.
  const order = keys.map((_, i) => i).sort((a, b) => {
    const rank = (i: number) => {
      if (keys[i] === selectedKey) return 2;
      if (keys[i] === hoveredKey) return 1;
      return 0;
    };
    return rank(a) - rank(b);
  });

  const svgStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${width}px`,
    height: `${height}px`,
    pointerEvents: "none",
    overflow: "visible",
    zIndex: 5, // above grid lines, below floating UI chrome such as menus/tooltips
    // Default theme — override by setting these custom properties on an
    // ancestor element (e.g. a dark-mode wrapper).
    ["--dep-edge-stroke" as string]: COLOR_DEFAULT,
    ["--dep-edge-stroke-hover" as string]: COLOR_HOVER,
    ["--dep-edge-stroke-selected" as string]: COLOR_SELECTED,
  };

  return (
    <svg style={svgStyle} className="dep-edges-layer">
      <ArrowMarkerDefs />
      {order.map((i) => {
        const key = keys[i];
        const state: DependencyEdgeState =
          key === selectedKey ? "selected" : key === hoveredKey ? "hovered" : "default";
        return (
          <DependencyEdge
            key={key}
            id={key}
            path={paths[i]}
            state={state}
            markerEndId={markerIdFor(state)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
          />
        );
      })}
    </svg>
  );
}