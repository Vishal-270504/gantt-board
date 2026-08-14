import type { CSSProperties } from "react";
import type { PositionedTask } from "../../features/dashboard/types";
import {
  routeDependencies,
  type DepConnector,
  type DepRect,
  type DepPoint,
} from "../ui/dependencyRouter";

const ARROW_COLOR = "#6b7280";
const ARROW_LEN = 10;
const ARROW_GAP = 4;
const PADDING = 16;

interface DependencyArrowsProps {
  tasks: PositionedTask[];
  rowHeight: number;
}

function pointsToPath(points: DepPoint[]): string {
  if (points.length === 0) return "";
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
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

export function DependencyArrows({ tasks, rowHeight }: DependencyArrowsProps) {
  if (!tasks.length) return null;

  const taskMap = new Map<string, PositionedTask>();
  tasks.forEach((t) => taskMap.set(t.id, t));

  // Treat every visible task bar as a routing obstacle.
  const obstacles: DepRect[] = tasks.map((t) => ({
    x: t.left,
    y: t.top,
    w: Math.max(t.width, 2),
    h: t.rowHeight,
  }));

  const connectors: DepConnector[] = [];
  const keys: string[] = [];

  tasks.forEach((successor) => {
    if (!successor.predecessors?.length) return;

    successor.predecessors.forEach((predId) => {
      const pred = taskMap.get(predId);
      if (!pred) return;

      connectors.push({
        from: {
          x: pred.left + pred.width,
          y: pred.top + rowHeight / 2,
        },
        to: {
          x: successor.left - ARROW_LEN - ARROW_GAP,
          y: successor.top + rowHeight / 2,
        },
      });
      keys.push(`${pred.id}->${successor.id}`);
    });
  });

  if (connectors.length === 0) return null;

  const routes = routeDependencies(connectors, obstacles, rowHeight);
  const { width, height } = boundsOf(routes);

  const svgStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${width}px`,
    height: `${height}px`,
    pointerEvents: "none",
    overflow: "visible",
  };

  return (
    <svg style={svgStyle}>
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="10"
          refX="0"
          refY="5"
          orient="0"
        >
          <path
            d="M0,0 L0,10 L10,5 Z"
            fill={ARROW_COLOR}
            stroke={ARROW_COLOR}
            strokeWidth="1.5"
          />
        </marker>
      </defs>
      {routes.map((points, i) => (
        <path
          key={keys[i]}
          d={pointsToPath(points)}
          fill="none"
          stroke={ARROW_COLOR}
          strokeWidth="1.5"
          strokeDasharray="4 2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.75"
          markerEnd="url(#arrowhead)"
        />
      ))}
    </svg>
  );
}
