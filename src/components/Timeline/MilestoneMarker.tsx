import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import type { CSSProperties } from 'react';
import { useDashboardStore, selectMilestoneBackgroundColor, selectMilestoneShape } from '@/features/dashboard/store/useDashboardStore';

interface MilestoneMarkerProps {
  left: number;
  top: number;
  title: string;
}

export function MilestoneMarker({ left, top, title }: MilestoneMarkerProps) {
  const milestoneBackgroundColor = useDashboardStore(selectMilestoneBackgroundColor);
  const milestoneShape = useDashboardStore(selectMilestoneShape);

  const markerStyle = {
    '--m-left': `${left + 5}px`,
    '--m-top': `${top + 12.5}px`,
  } as CSSProperties;

  const colorClasses: Record<string, { bg: string; border: string }> = {
    slate: {
      bg: "bg-slate-500",
      border: "border-slate-600",
    },
    blue: {
      bg: "bg-blue-500",
      border: "border-blue-600",
    },
    indigo: {
      bg: "bg-indigo-500",
      border: "border-indigo-600",
    },
    emerald: {
      bg: "bg-emerald-500",
      border: "border-emerald-600",
    },
    amber: {
      bg: "bg-amber-500",
      border: "border-amber-600",
    },
    rose: {
      bg: "bg-rose-500",
      border: "border-rose-600",
    },
    violet: {
      bg: "bg-violet-500",
      border: "border-violet-600",
    },
    cyan: {
      bg: "bg-cyan-500",
      border: "border-cyan-600",
    },
  };

  const shapeClasses: Record<typeof milestoneShape, string> = {
    diamond: 'rotate-45',
    circle: 'rounded-full',
    square: 'rounded-none',
    triangle: 'rotate-45',
  };

  const colorClass = colorClasses[milestoneBackgroundColor] || colorClasses.amber;
  const shapeClass = shapeClasses[milestoneShape] || shapeClasses.diamond;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`absolute h-3.5 w-3.5 ${shapeClass} ${colorClass.bg} ${colorClass.border} border left-[var(--m-left)] top-[var(--m-top)]`}
          style={markerStyle}
        />
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}