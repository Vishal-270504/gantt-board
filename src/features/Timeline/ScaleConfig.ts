import type { TimelineScale } from "../dashboard/types/index";

export interface HeaderGroup {
  label: string;
  start: Date;
  widthInUnits: number;
}

export interface ScaleConfig {
  unitWidth: number; // px per smallest tick
  msPerUnit: number; // real-world duration one unit represents
  getUnits: (start: Date, end: Date) => Date[];
  getGroups: (start: Date, end: Date) => HeaderGroup[];
  formatUnit: (date: Date) => string;
}

const MS_PER_DAY = 86_400_000;
const MS_PER_HOUR = 3_600_000;

const eachDay = (start: Date, end: Date): Date[] => {
  const days: Date[] = [];
  const cur = new Date(start);
  cur.setHours(0, 0, 0, 0);
  while (cur <= end) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
};

const eachHour = (start: Date, end: Date): Date[] => {
  const hours: Date[] = [];
  const cur = new Date(start);
  cur.setMinutes(0, 0, 0);
  while (cur <= end) {
    hours.push(new Date(cur));
    cur.setHours(cur.getHours() + 1);
  }
  return hours;
};

function groupByFormat(
  units: Date[],
  labelFn: (d: Date) => string,
): HeaderGroup[] {
  const groups: HeaderGroup[] = [];
  units.forEach((u) => {
    const label = labelFn(u);
    const last = groups[groups.length - 1];
    if (last && last.label === label) {
      last.widthInUnits += 1;
    } else {
      groups.push({ label, start: u, widthInUnits: 1 });
    }
  });
  return groups;
}

function getWeekNumber(d: Date): number {
  const onejan = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(
    ((d.getTime() - onejan.getTime()) / MS_PER_DAY + onejan.getDay() + 1) / 7,
  );
}

export const SCALE_CONFIGS: Record<TimelineScale, ScaleConfig> = {
  hour: {
    unitWidth: 60,
    msPerUnit: MS_PER_HOUR,
    getUnits: eachHour,
    getGroups: (start, end) =>
      groupByFormat(eachHour(start, end), (d) =>
        d.toLocaleDateString(undefined, {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      ),
    formatUnit: (d) => d.toLocaleTimeString(undefined, { hour: "numeric" }),
  },

  day: {
    unitWidth: 48,
    msPerUnit: MS_PER_DAY,
    getUnits: eachDay,
    getGroups: (start, end) =>
      groupByFormat(eachDay(start, end), (d) =>
        d.toLocaleDateString(undefined, { month: "long", year: "numeric" }),
      ),
    formatUnit: (d) => d.toLocaleDateString(undefined, { day: "numeric" }),
  },

  week: {
    unitWidth: 36,
    msPerUnit: MS_PER_DAY,
    getUnits: eachDay,
    getGroups: (start, end) =>
      groupByFormat(eachDay(start, end), (d) => `Week ${getWeekNumber(d)}`),
    formatUnit: (d) => d.toLocaleDateString(undefined, { weekday: "short" }),
  },

  month: {
    unitWidth: 24,
    msPerUnit: MS_PER_DAY,
    getUnits: eachDay,
    getGroups: (start, end) =>
      groupByFormat(eachDay(start, end), (d) =>
        d.toLocaleDateString(undefined, { month: "short", year: "numeric" }),
      ),
    formatUnit: (d) => String(d.getDate()),
  },

  quarter: {
    unitWidth: 12,
    msPerUnit: MS_PER_DAY,
    getUnits: eachDay,
    getGroups: (start, end) =>
      groupByFormat(
        eachDay(start, end),
        (d) => `Q${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`,
      ),
    formatUnit: () => "",
  },

  year: {
    unitWidth: 15,
    msPerUnit: MS_PER_DAY,
    getUnits: eachDay,
    getGroups: (start, end) =>
      groupByFormat(eachDay(start, end), (d) => String(d.getFullYear())),
    formatUnit: () => "",
  },
};

export function getOffset(
  date: Date,
  base: Date,
  scale: TimelineScale,
): number {
  const { unitWidth, msPerUnit } = SCALE_CONFIGS[scale];
  return ((date.getTime() - base.getTime()) / msPerUnit) * unitWidth;
}

export interface GridLine {
  offset: number;
}

export interface GridConfig {
  lines: GridLine[];
  unitWidth?: number;
}

