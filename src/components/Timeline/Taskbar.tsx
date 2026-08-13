import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type {
  Task,
  GanttColor,
  GanttCustomization,
} from "../../features/dashboard/types";
import type { CSSProperties } from "react";
import { useDashboardStore } from "@/features/dashboard/store/useDashboardStore";

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
  showTitle?: GanttCustomization["showTitle"];
}

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
  showTitle?: GanttCustomization["showTitle"];
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
  hasParentId: _hasParentId = true,
  projectBarColor = "blue",
  assignee,
  type = "task",
  barColor = "blue",
  progressColor = "indigo",
  radius = "md",
  onDoubleClick,
  showTitle,
}: TaskBarProps) {
  const isProject = type === "project";
  const customization = useDashboardStore((s) => s.customization) || {
  projectBarColor: "blue",
  taskBarColor: "blue",
  taskBarProgressColor: "indigo",
  taskBarRadius: "md",
  showTitle: true,
};

  const safeLeft = Number.isFinite(left) ? left : 0;
  const safeTop = Number.isFinite(top) ? top : 0;
  const safeHeight = Number.isFinite(height) && height > 0 ? height : 18;
  const safeWidth = Number.isFinite(width) && width > 0 ? width : 0;
  const safeProgress = Number.isFinite(progress) ? Math.min(100, Math.max(0, progress)) : 0;
  const safeTitle = title ?? "";

  const finalBarColor = isProject
    ? (customization.projectBarColor ?? projectBarColor ?? "blue")
    : (customization.taskBarColor ?? barColor ?? "blue");

  const color = BAR_COLOR_STYLES[finalBarColor] ?? BAR_COLOR_STYLES.blue;

  const finalProgressColor =
    customization.taskBarProgressColor ?? progressColor ?? "indigo";
  const progressFill = (BAR_COLOR_STYLES[finalProgressColor] ?? BAR_COLOR_STYLES.indigo).progress;

  const finalRadius = customization.taskBarRadius ?? radius ?? "md";

  const barStyle: CSSProperties = {
    position: "absolute",
    left: `${safeLeft}px`,
    top: `${safeTop}px`,
    height: `${safeHeight}px`,
  };

  const progressStyle: CSSProperties = {
    width: `${safeProgress}%`,
  };

  const estimatedTextWidth = safeTitle.length * CHAR_WIDTH + BAR_PADDING;
  const titleFits = safeWidth > 0 && estimatedTextWidth <= safeWidth;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="absolute flex items-center mt-1"
          style={{
            ...barStyle,
            width: titleFits ? `${safeWidth}px` : "auto",
          }}
          onDoubleClick={onDoubleClick}
        >
          <div
            className={cn(
              "relative overflow-hidden border flex-shrink-0",
              RADIUS_STYLES[finalRadius],
              isProject ? color.solid : color.bar,
            )}
            style={{ width: `${safeWidth}px`, height: "100%" }}
          >
            {!isProject && (
              <div
                className={cn("h-full", progressFill)}
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
                {safeTitle}
              </span>
            )}
          </div>

          {showTitle && !titleFits && safeTitle && (
            <span
              className={cn(
                "ml-2 text-xs whitespace-nowrap font-medium",
                isProject ? "text-foreground font-semibold" : "text-foreground",
              )}
            >
              {safeTitle}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent aria-label={safeTitle || "Task bar details"}>
        {safeTitle || "Task"} — {safeProgress}%{assignee ? ` · ${assignee}` : ""}
      </TooltipContent>
    </Tooltip>
  );
}