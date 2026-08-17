import type { CSSProperties } from "react";
import type { PositionedTask } from "../../features/dashboard/types";
import {
  routeDependencies,
  type DepConnector,
  type DepRect,
  type DepPoint,
} from "../ui/dependencyRouter";

const ARROW_COLOR = "indigo";
const ARROW_LEN = 12;
const ARROW_GAP = 6;
const PADDING = 16;
const LINE_OPACITY = 0.7;

// Geometry constants that match Taskbar.tsx
const BAR_LEFT_OFFSET = 17;
const BAR_WIDTH_OFFSET = 15;
const BAR_TOP_MARGIN = 4;
const BAR_HEIGHT_OFFSET = 8;
const TITLE_GAP = 8;
const CHAR_WIDTH = 7;
const BAR_PADDING = 16;

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

// Ensure all segments are either horizontal or vertical (90 degree angles only)
// and first segment is horizontal for at least 10px
function ensureOrthogonalRouting(
  routes: DepPoint[][],
  connectors: DepConnector[],
  tasks: PositionedTask[]
): DepPoint[][] {
  return routes.map((route, index) => {
    const connector = connectors[index];
    if (!connector || route.length < 2) return route;
    
    // Start with the first point
    const orthogonalRoute: DepPoint[] = [route[0]];
    
    // Add a point 10px to the right for the initial horizontal segment
    orthogonalRoute.push({ x: route[0].x + 10, y: route[0].y });
    
    // For the rest of the route, ensure only horizontal or vertical moves
    for (let i = 1; i < route.length; i++) {
      const prev = route[i - 1];
      const curr = route[i];
      
      // If moving horizontally (same y), keep it
      if (prev.y === curr.y) {
        orthogonalRoute.push(curr);
      }
      // If moving vertically (same x), keep it  
      else if (prev.x === curr.x) {
        orthogonalRoute.push(curr);
      }
      // If diagonal, split into horizontal then vertical
      else {
        // First go horizontal to align x, then vertical to align y
        orthogonalRoute.push({ x: curr.x, y: prev.y });
        orthogonalRoute.push(curr);
      }
    }
    
    // Remove consecutive duplicates
    const filteredRoute: DepPoint[] = [];
    for (const point of orthogonalRoute) {
      const last = filteredRoute[filteredRoute.length - 1];
      if (!last || last.x !== point.x || last.y !== point.y) {
        filteredRoute.push(point);
      }
    }
    
    return filteredRoute;
  });
}

// Compute content bounding box (bar + title) for a task
function getContentRect(task: PositionedTask): DepRect {
  // For milestones (width === 0), return a small box around the marker position
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
  
  // Check if title overflows
  const estimatedTextWidth = task.title.length * CHAR_WIDTH + BAR_PADDING;
  const titleFits = estimatedTextWidth <= task.width;
  
  // Compute content bounding box
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

export function DependencyArrows({ tasks, rowHeight }: DependencyArrowsProps) {
  if (!tasks.length) return null;

  const taskMap = new Map<string, PositionedTask>();
  tasks.forEach((t) => taskMap.set(t.id, t));

  // Treat every visible task bar as a routing obstacle using actual bar geometry
  const obstacles: DepRect[] = tasks.map(getContentRect);

  const connectors: DepConnector[] = [];
  const keys: string[] = [];

  tasks.forEach((successor) => {
    if (!successor.predecessors?.length) return;

    successor.predecessors.forEach((predId) => {
      const pred = taskMap.get(predId);
      if (!pred) return;

      // Get actual bar geometry
      const predRect = getContentRect(pred);
      const succRect = getContentRect(successor);
      
      // For milestones, use the center point
      const isPredMilestone = pred.type === "milestone" || pred.width === 0;
      const isSuccMilestone = successor.type === "milestone" || successor.width === 0;
      
      // Source point - at the actual edge of task/milestone
      const sourceBaseX = isPredMilestone 
        ? pred.left // Milestone center
        : predRect.x + predRect.w; // Right edge of task bar
      const sourceY = pred.top + rowHeight / 2;
      
      // Target point
      const targetBaseX = isSuccMilestone
        ? successor.left // Milestone center
        : succRect.x; // Left edge of task bar
      const targetY = successor.top + rowHeight / 2;
      
      // Adjust target for arrow marker
      const adjustedTargetX = targetBaseX - ARROW_LEN - ARROW_GAP;

      connectors.push({
        from: { x: sourceBaseX, y: sourceY },
        to: { x: adjustedTargetX, y: targetY },
      });
      keys.push(`${pred.id}->${successor.id}`);
    });
  });

  if (connectors.length === 0) return null;

  const routes = routeDependencies(connectors, obstacles, rowHeight);
  const adjustedRoutes = ensureOrthogonalRouting(routes, connectors, tasks);
  const { width, height } = boundsOf(adjustedRoutes);

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
      {adjustedRoutes.map((points, i) => (
<path
           key={keys[i]}
           d={pointsToPath(points)}
           fill="none"
           stroke={ARROW_COLOR}
           strokeWidth="1.5"
           strokeLinecap="round"
           strokeLinejoin="round"
           opacity={LINE_OPACITY}
           markerEnd="url(#arrowhead)"
         />
      ))}
    </svg>
  );
}
