import { memo, type CSSProperties } from "react";

// Inspired by XYFlow's <BaseEdge />: every edge is two stacked <path>s —
// a transparent, wide "interaction" path that makes the edge easy to hit
// with the mouse (XYFlow calls this `interactionWidth`), and the thin
// visible path drawn on top of it. Splitting them this way means we can
// keep the visible stroke at a normal 1.5–2.5px while still giving the
// user a generous ~14px hover/click target, without changing the path
// geometry itself.

export type DependencyEdgeState = "default" | "hovered" | "selected";

export interface DependencyEdgeProps {
  id: string;
  /** SVG path `d` string, already rounded — see edgePath.ts. */
  path: string;
  state: DependencyEdgeState;
  markerEndId: string;
  interactionWidth?: number;
  onMouseEnter?: (id: string) => void;
  onMouseLeave?: (id: string) => void;
  onClick?: (id: string) => void;
}

const STROKE_BY_STATE: Record<DependencyEdgeState, string> = {
  default: "var(--dep-edge-stroke, #64748b)",
  hovered: "var(--dep-edge-stroke-hover, #2563eb)",
  selected: "var(--dep-edge-stroke-selected, #1d4ed8)",
};

const WIDTH_BY_STATE: Record<DependencyEdgeState, number> = {
  default: 1.5,
  hovered: 2.25,
  selected: 2.25,
};

const OPACITY_BY_STATE: Record<DependencyEdgeState, number> = {
  default: 0.85,
  hovered: 1,
  selected: 1,
};

function DependencyEdgeImpl({
  id,
  path,
  state,
  markerEndId,
  interactionWidth = 14,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: DependencyEdgeProps) {
  const visibleStyle: CSSProperties = {
    fill: "none",
    stroke: STROKE_BY_STATE[state],
    strokeWidth: WIDTH_BY_STATE[state],
    opacity: OPACITY_BY_STATE[state],
    transition: "stroke 120ms ease, stroke-width 120ms ease, opacity 120ms ease",
    vectorEffect: "non-scaling-stroke",
  };

  const interactive = Boolean(onMouseEnter || onMouseLeave || onClick);

  return (
    <g
      className="dep-edge"
      data-dep-edge-id={id}
      data-state={state}
      onMouseEnter={onMouseEnter ? () => onMouseEnter(id) : undefined}
      onMouseLeave={onMouseLeave ? () => onMouseLeave(id) : undefined}
      onClick={onClick ? () => onClick(id) : undefined}
    >
      {/* Wide, invisible hit target — never painted, just catches pointer events. */}
      {interactive && (
        <path
          d={path}
          fill="none"
          stroke="transparent"
          strokeWidth={interactionWidth}
          style={{ pointerEvents: "stroke", cursor: onClick ? "pointer" : "default" }}
        />
      )}
      {/* Halo: a slightly wider stroke in the surface color so the link stays
          legible where it crosses a task bar or grid line — the same trick
          Jira Plans and Smartsheet use for their dependency lines. */}
      <path
        d={path}
        fill="none"
        stroke="var(--dep-edge-halo, #ffffff)"
        strokeWidth={WIDTH_BY_STATE[state] + 3}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
        pointerEvents="none"
      />
      {/* The line the user actually sees. */}
      <path
        d={path}
        style={visibleStyle}
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd={`url(#${markerEndId})`}
        pointerEvents="none"
      />
    </g>
  );
}

// Edges only need to re-render when their own path or state changes, not
// when a sibling among hundreds of other dependency edges changes.
export const DependencyEdge = memo(DependencyEdgeImpl, (prev, next) => {
  return (
    prev.path === next.path &&
    prev.state === next.state &&
    prev.markerEndId === next.markerEndId &&
    prev.interactionWidth === next.interactionWidth
  );
});