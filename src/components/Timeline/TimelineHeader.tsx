import { memo, useMemo } from "react";
import { SCALE_CONFIGS } from "../../features/Timeline/ScaleConfig";
import type { TimelineScale, GanttColor } from "../../features/dashboard/types";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SCALES_WITHOUT_WEEKDAY_TIER: TimelineScale[] = ["quarter", "year"];

// Tailwind purges classes it can't statically detect, so we map full class
// strings rather than constructing them dynamically (e.g. `bg-${color}-100`).
const GANTT_COLOR_BG: Record<GanttColor, string> = {
  slate:   "bg-slate-100 dark:bg-slate-800",
  blue:    "bg-blue-100 dark:bg-blue-900",
  indigo:  "bg-indigo-100 dark:bg-indigo-900",
  emerald: "bg-emerald-100 dark:bg-emerald-900",
  amber:   "bg-amber-100 dark:bg-amber-900",
  rose:    "bg-rose-100 dark:bg-rose-900",
  violet:  "bg-violet-100 dark:bg-violet-900",
  cyan:    "bg-cyan-100 dark:bg-cyan-900",
};

const GANTT_COLOR_TEXT: Record<GanttColor, string> = {
  slate:   "text-slate-700 dark:text-slate-300",
  blue:    "text-blue-700 dark:text-blue-300",
  indigo:  "text-indigo-700 dark:text-indigo-300",
  emerald: "text-emerald-700 dark:text-emerald-300",
  amber:   "text-amber-700 dark:text-amber-300",
  rose:    "text-rose-700 dark:text-rose-300",
  violet:  "text-violet-700 dark:text-violet-300",
  cyan:    "text-cyan-700 dark:text-cyan-300",
};

function formatHourGroupLabel(label: string): string {
  const commaIndex = label.indexOf(",");
  if (commaIndex === -1) return label;
  return label.slice(commaIndex + 2);
}

function isToday(d: Date) {
  const t = new Date();
  return d.toDateString() === t.toDateString();
}

function isWeekend(d: Date) {
  const day = d.getDay();
  return day === 0 || day === 6;
}

interface TimelineHeaderProps {
  startDate: Date;
  endDate: Date;
  scale: TimelineScale;
  showDayLabels?: boolean;
  weekendColor?: GanttColor;
  headerColor?: GanttColor;
}

function TimelineHeaderComponent({
  startDate,
  endDate,
  scale,
  showDayLabels = false,
  weekendColor,
  headerColor,
}: TimelineHeaderProps) {
  const config = SCALE_CONFIGS[scale];

  const units = useMemo(
    () => config.getUnits(startDate, endDate),
    [config, startDate, endDate],
  );

  const groups = useMemo(
    () => config.getGroups(startDate, endDate),
    [config, startDate, endDate],
  );

  const showTier3 =
    showDayLabels &&
    !SCALES_WITHOUT_WEEKDAY_TIER.includes(scale) &&
    scale !== "week";

  const totalTiers = showTier3 ? 3 : 2;
  const tierHeight = 24;
  const totalHeight = totalTiers * tierHeight;

  const headerStyle = {
    "--header-w": `${units.length * config.unitWidth}px`,
    height: `${totalHeight}px`,
  } as CSSProperties;

  // Resolved class strings — undefined when no color prop passed
  const headerBg = headerColor ? GANTT_COLOR_BG[headerColor] : undefined;
  const weekendBg = weekendColor ? GANTT_COLOR_BG[weekendColor] : undefined;
  const weekendText = weekendColor ? GANTT_COLOR_TEXT[weekendColor] : undefined;

  const weekendCn = (d: Date) =>
    isWeekend(d) && weekendColor
      ? cn(weekendBg, weekendText)
      : undefined;

  return (
    <div
      className={cn(
        "sticky top-0 z-10 bg-background border-b w-[var(--header-w)]",
        headerBg,
      )}
      style={headerStyle}
    >
      {/* Tier 1: groups (e.g. months, weeks, quarters) */}
      <div className="flex border-b h-6">
        {groups.map((g, i) => {
          const label =
            scale === "hour" ? formatHourGroupLabel(g.label) : g.label;

          // For hour scale, the group represents a full day — apply weekend
          // color to the whole group cell if that day is a weekend.
          const isHourWeekend = scale === "hour" && isWeekend(g.start);

          const groupStyle = {
            "--group-w": `${g.widthInUnits * config.unitWidth}px`,
          } as CSSProperties;

          return (
            <div
              key={i}
              className={cn(
                "flex items-center justify-center border-r px-2 text-xs font-medium text-muted-foreground w-[var(--group-w)] h-full truncate",
                isHourWeekend && weekendBg,
                isHourWeekend && weekendText,
              )}
              style={groupStyle}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* Tier 2: units (e.g. hours, day numbers) */}
      <div className="flex h-6">
        {units.map((u, i) => {
          const unitStyle = {
            "--unit-w": `${config.unitWidth}px`,
          } as CSSProperties;

          // For hour scale, derive the day from the unit date to check weekend.
          const isUnitWeekend = isWeekend(u);

          return (
            <div
              key={i}
              className={cn(
                "flex items-center justify-center border-r text-[11px] text-muted-foreground w-[var(--unit-w)] h-full",
                isToday(u) && "bg-primary/10 font-semibold text-primary",
                isUnitWeekend && weekendBg,
                isUnitWeekend && weekendText,
              )}
              style={unitStyle}
            >
              {config.formatUnit(u)}
            </div>
          );
        })}
      </div>

      {/* Tier 3: weekday labels — per unit for day/month, per group for hour */}
      {showTier3 && (
        <div className="flex h-6 border-t">
          {scale === "hour"
            ? groups.map((g, i) => {
                const weekday = WEEKDAY_SHORT[g.start.getDay()];
                const groupStyle = {
                  "--group-w": `${g.widthInUnits * config.unitWidth}px`,
                } as CSSProperties;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-center border-r text-[11px] text-muted-foreground w-[var(--group-w)] h-full truncate",
                      weekendCn(g.start),
                    )}
                    style={groupStyle}
                  >
                    {weekday}
                  </div>
                );
              })
            : units.map((u, i) => {
                const weekday = WEEKDAY_SHORT[u.getDay()];
                const unitStyle = {
                  "--unit-w": `${config.unitWidth}px`,
                } as CSSProperties;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-center border-r text-[11px] text-muted-foreground w-[var(--unit-w)] h-full",
                      isToday(u) && "bg-primary/10 font-semibold text-primary",
                      weekendCn(u),
                    )}
                    style={unitStyle}
                  >
                    {weekday}
                  </div>
                );
              })}
        </div>
      )}
    </div>
  );
}

export const TimelineHeader = memo(TimelineHeaderComponent);
