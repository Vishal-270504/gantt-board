import type { CSSProperties } from 'react';
import type { PositionedTask } from '../../features/dashboard/types';

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

    successor.predecessors.forEach((predId) => {
      const pred = taskMap.get(predId);
      if (!pred) return;

      // Source: right edge of predecessor bar, vertically centred
      const x1 = pred.left + pred.width;
      const y1 = pred.top + rowHeight / 2;

      // Target: left edge of successor bar, vertically centred
      const x2 = successor.left;
      const y2 = successor.top + rowHeight / 2;

      // Route an orthogonal elbow:
      // go right 10px, drop/rise to y2, then go right to x2
      const elbowX = Math.max(x1 + 12, x2 - 12);

      const points = `${x1},${y1} ${elbowX},${y1} ${elbowX},${y2} ${x2},${y2}`;

      arrows.push(
        <g key={`${pred.id}->${successor.id}`}>
          <polyline
            points={points}
            fill="none"
            stroke="var(--arrow-color, #6366f1)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.75"
            markerEnd="url(#arrowhead)"
          />
        </g>
      );
    });
  });

  if (!arrows.length) return null;

  const svgStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${maxRight + 60}px`,
    height: `${totalHeight}px`,
    pointerEvents: 'none',
    overflow: 'visible',
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
          <path d="M0,0 L0,6 L6,3 z" fill="var(--arrow-color, #6366f1)" opacity="0.85" />
        </marker>
      </defs>
      {arrows}
    </svg>
  );
}
