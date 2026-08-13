import {  Tooltip,  TooltipTrigger,  TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type {
  Task,
  GanttColor,
  GanttCustomization,
} from "../../features/dashboard/types";
import type { CSSProperties } from "react";
import {
  selectProjectBarColor,
  selectTaskBarColor,
  selectTaskBarProgressColor,
  selectTaskBarRadius,
  useDashboardStore,
} from "@/features/dashboard";

interface TaskBarProps {
  left: number;
  width: number;
  top: number;
  height: number;
  progress: number;
  title: string;
  hasParentId?: boolean;
  projectBarColor?: GanttColor;
  assignee?: string;
  type?: Task["type"];
  barColor?: GanttColor;
  progressColor?: GanttColor;
  radius?: GanttCustomization["taskBarRadius"];
  onDoubleClick?: () => void;
  showTitle?: GanttCustomization["showTitle"]
}

// Tailwind classes are written out explicitly so the JIT compiler can detect them.
const BAR_COLOR_STYLES: Record<
  GanttColor,
  { bar: string; solid: string; progress: string }
> = {
  slate: {
    bar: "bg-slate-500/20 border-slate-500",
    solid: "bg-slate-700/80 border-slate-800",
    progress: "bg-slate-500/60",
  },
  blue: {
    bar: "bg-blue-500/20 border-blue-500",
    solid: "bg-blue-700/80 border-blue-800",
    progress: "bg-blue-500/60",
  },
  indigo: {
    bar: "bg-indigo-500/20 border-indigo-500",
    solid: "bg-indigo-700/80 border-indigo-800",
    progress: "bg-indigo-500/60",
  },
  emerald: {
    bar: "bg-emerald-500/20 border-emerald-500",
    solid: "bg-emerald-700/80 border-emerald-800",
    progress: "bg-emerald-500/60",
  },
  amber: {
    bar: "bg-amber-500/20 border-amber-500",
    solid: "bg-amber-700/80 border-amber-800",
    progress: "bg-amber-500/60",
  },
  rose: {
    bar: "bg-rose-500/20 border-rose-500",
    solid: "bg-rose-700/80 border-rose-800",
    progress: "bg-rose-500/60",
  },
  violet: {
    bar: "bg-violet-500/20 border-violet-500",
    solid: "bg-violet-700/80 border-violet-800",
    progress: "bg-violet-500/60",
  },
  cyan: {
    bar: "bg-cyan-500/20 border-cyan-500",
    solid: "bg-cyan-700/80 border-cyan-800",
    progress: "bg-cyan-500/60",
  },
};

const RADIUS_STYLES: Record<GanttCustomization["taskBarRadius"], string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

// Approximate char width at 12px font ~7px/char, plus 16px padding
const CHAR_WIDTH = 7;
const BAR_PADDING = 16;

export function TaskBar({
  left,
  width,
  top,
  height,
  progress,
  title,
  projectBarColor = "blue",
  assignee,
  type = "task",
  barColor = "blue",
  progressColor = "indigo",
  radius = "md",
  onDoubleClick,
  showTitle
}: TaskBarProps) {
  const isProject = type === "project";
  const customizedProjectBarColor = useDashboardStore(selectProjectBarColor);
  const customizedTaskBarColor = useDashboardStore(selectTaskBarColor);
  const customizedTaskBarProgressColor = useDashboardStore(
    selectTaskBarProgressColor,
  );
  const customizedTaskBarRadius = useDashboardStore(selectTaskBarRadius);

  const finalBarColor = isProject
    ? (customizedProjectBarColor ?? projectBarColor)
    : (customizedTaskBarColor ?? barColor);

  const color = BAR_COLOR_STYLES[finalBarColor];

  const finalProgressColor =
    customizedTaskBarProgressColor ?? progressColor;
  const progressFill = BAR_COLOR_STYLES[finalProgressColor].progress;

  const finalRadius = customizedTaskBarRadius ?? radius;

  const barStyle = {
    "--bar-left": `${left}px`,
    "--bar-w": `${width}px`,
    "--bar-top": `${top}px`,
    "--bar-h": `${height}px`,
  } as CSSProperties;

  const progressStyle = { "--progress-w": `${progress}%` } as CSSProperties;

  // Determine if the title fits inside the bar
  const estimatedTextWidth = title.length * CHAR_WIDTH + BAR_PADDING;
  const titleFits = estimatedTextWidth <= width;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="absolute left-[var(--bar-left)] top-[var(--bar-top)] h-[var(--bar-h)] flex items-center mt-1"
          style={{ ...barStyle, width: titleFits ? `${width}px` : undefined }}
          onDoubleClick={onDoubleClick}
        >
          {/* The actual coloured bar */}
          <div
            className={cn(
              "relative overflow-hidden border flex-shrink-0",
              RADIUS_STYLES[finalRadius],
              isProject ? color.solid : color.bar,
            )}
            style={{ width: `${width}px`, height: "100%" }}
          >
            {!isProject && (
              <div
                className={cn("h-full w-[var(--progress-w)]", progressFill)}
                style={progressStyle}
              />
            )}
            {showTitle && titleFits && (
              <span
                className={cn(
                  "absolute inset-0 flex items-center px-2 text-xs truncate",
                  isProject ? "text-white font-medium" : "text-foreground",
                )}
              >
                {title}
              </span>
            )}
          </div>

          {/* Title shown beside the bar when it doesn't fit inside */}
          {showTitle && !titleFits && (
            <span
              className={cn(
                "ml-2 text-xs whitespace-nowrap font-medium",
                isProject ? "text-foreground font-semibold" : "text-foreground",
              )}
            >
              {title}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {title} — {progress}%{assignee ? ` · ${assignee}` : ""}
      </TooltipContent>
    </Tooltip>
  );
}
