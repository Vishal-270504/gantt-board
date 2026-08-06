import type { CSSProperties } from "react";
import type { PositionedTask } from "../../features/dashboard/types";

interface DependencyArrowsProps {
  tasks: PositionedTask[];
  rowHeight: number;
}

/**
 * Renders SVG polyline arrows from the right edge of a predecessor task bar
 * to the left edge of the successor task bar.
 */
export function DependencyArrows({ tasks, rowHeight }: DependencyArrowsProps) {
  if (!tasks.length) return null;

  // Build a map from task id → positioned task
  const taskMap = new Map<string, PositionedTask>();
  tasks.forEach((t) => taskMap.set(t.id, t));

  // Total grid dimensions
  const maxRight = Math.max(...tasks.map((t) => t.left + t.width), 0);
  const totalHeight = tasks.length * rowHeight;

  const arrows: React.ReactNode[] = [];

  tasks.forEach((successor) => {
    if (!successor.predecessors?.length) return;

    // successor.predecessors.forEach((predId) => {
    //   const pred = taskMap.get(predId);
    //   if (!pred) return;

    //   // Source: right edge of predecessor bar, vertically centred
    //   const x1 = pred.left + pred.width;
    //   const y1 = pred.top + rowHeight / 2;

    //   // Target: left edge of successor bar, vertically centred
    //   const x2 = successor.left;
    //   const y2 = successor.top + rowHeight / 2;

    //   // Route an orthogonal elbow:
    //   // go right 10px, drop/rise to y2, then go right to x2
    //   const elbowX = Math.max(x1 + 12, x2 - 12);

    //   const points = `${x1},${y1} ${elbowX},${y1} ${elbowX},${y2} ${x2},${y2}`;

    //   arrows.push(
    //     <g key={`${pred.id}->${successor.id}`}>
    //       <polyline
    //         points={points}
    //         fill="none"
    //         stroke="var(--arrow-color, #6366f1)"
    //         strokeWidth="1.5"
    //         strokeDasharray="4 2"
    //         opacity="0.75"
    //         markerEnd="url(#arrowhead)"
    //       />
    //     </g>
    //   );
    // });

    successor.predecessors.forEach((predId) => {
  const pred = taskMap.get(predId);
  if (!pred) return;

  // Source: right edge of predecessor
  const x1 = pred.left + pred.width;
  const y1 = pred.top + rowHeight / 2;

  // Target: left edge of successor
  const x2 = successor.left;
  const y2 = successor.top + rowHeight / 2;

  const dx = x2 - x1;
  const dy = y2 - y1;

  const gap = 16; // horizontal clearance off each bar
  const r = 8;    // corner radius

  let path: string;

  if (x2 < x1 + gap && dy !== 0) {
    // successor starts at/before predecessor's right edge ->
    // wrap around behind the tile: right, down, left, down, right
    const xRight = x1 + gap;
    const xLeft = x2 - gap;
    const dropY = successor.top - 12;
    const vDir = Math.sign(dropY - y1) || 1;
    const vDir2 = Math.sign(y2 - dropY) || 1;

    path = `
      M ${x1} ${y1}
      H ${xRight - r}
      Q ${xRight} ${y1} ${xRight} ${y1 + vDir * r}
      V ${dropY - vDir * r}
      Q ${xRight} ${dropY} ${xRight - r} ${dropY}
      H ${xLeft + r}
      Q ${xLeft} ${dropY} ${xLeft} ${dropY + vDir2 * r}
      V ${y2 - vDir2 * r}
      Q ${xLeft} ${y2} ${xLeft + r} ${y2}
      H ${x2}
    `;
  } else if (dx >= 0 && dy !== 0) {
    // successor is below (and to the right, or directly below) ->
    // simple down-then-right elbow, no curve
    const vDir = Math.sign(dy) || 1;

    path = `
      M ${x1} ${y1}
      V ${y2 - vDir * r}
      Q ${x1} ${y2} ${x1 + r} ${y2}
      H ${x2}
    `;
  } else {
    // same row roughly, or successor to the left at same height ->
    // existing elbow routing (right, corner, right)
    const elbowX = Math.max(x1 + 16, x2 - 16);
    path = `
      M ${x1} ${y1}
      H ${elbowX - r}
      Q ${elbowX} ${y1} ${elbowX} ${y1 + Math.sign(dy) * r}
      V ${y2 - Math.sign(dy) * r}
      Q ${elbowX} ${y2} ${elbowX + r} ${y2}
      H ${x2}
    `;
  }

  arrows.push(
    <path
      key={`${pred.id}->${successor.id}`}
      d={path}
      fill="none"
      stroke="var(--arrow-color, #6366f1)"
      strokeWidth="1.5"
      strokeDasharray="4 2"
      opacity="0.75"
      markerEnd="url(#arrowhead)"
    />
  );
});
  })

  if (!arrows.length) return null;

  const svgStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${maxRight + 60}px`,
    height: `${totalHeight}px`,
    pointerEvents: "none",
    overflow: "visible",
  };

  return (
    <svg style={svgStyle}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="3"
          orient="auto"
        >
          <path
            d="M0,0 L0,6 L6,3 z"
            fill="var(--arrow-color, #6366f1)"
            opacity="0.85"
          />
        </marker>
      </defs>
      {arrows}
    </svg>
  );
}
