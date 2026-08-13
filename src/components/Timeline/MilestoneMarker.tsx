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

  const colorClasses: Record<string, { bg: string; border: string }> = {
    slate: { bg: 'bg-slate-500', border: 'border-slate-600' },
    blue: { bg: 'bg-blue-500', border: 'border-blue-600' },
    indigo: { bg: 'bg-indigo-500', border: 'border-indigo-600' },
    emerald: { bg: 'bg-emerald-500', border: 'border-emerald-600' },
    amber: { bg: 'bg-amber-500', border: 'border-amber-600' },
    rose: { bg: 'bg-rose-500', border: 'border-rose-600' },
    violet: { bg: 'bg-violet-500', border: 'border-violet-600' },
    cyan: { bg: 'bg-cyan-500', border: 'border-cyan-600' },
  };

  const shapeClasses: Record<string, string> = {
    diamond: 'rotate-45',
    circle: 'rounded-full',
    square: 'rounded-none',
    triangle: '', // triangle uses inline styles
  };

  const colorClass = colorClasses[milestoneBackgroundColor] || colorClasses.amber;
  const shapeClass = shapeClasses[milestoneShape] || shapeClasses.diamond;

  // Get the actual bg color for triangle border
  const bgColorMap: Record<string, string> = {
    slate: '#64748b',
    blue: '#3b82f6',
    indigo: '#6366f1',
    emerald: '#10b981',
    amber: '#f59e0b',
    rose: '#f43f5e',
    violet: '#8b5cf6',
    cyan: '#06b6d4',
  };

  const getMarkerStyle = (): CSSProperties => {
    const base: CSSProperties = {
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
    };

    if (milestoneShape === 'triangle') {
      return {
        ...base,
        width: 0,
        height: 0,
        borderLeft: '7px solid transparent',
        borderRight: '7px solid transparent',
        borderBottom: `14px solid ${bgColorMap[milestoneBackgroundColor] || bgColorMap.amber}`,
        backgroundColor: 'transparent',
        borderTop: 'none',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
      };
    }

    return base;
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`h-3.5 w-3.5 ${shapeClass} ${milestoneShape !== 'triangle' ? `${colorClass.bg} ${colorClass.border} border` : ''} cursor-pointer hover:shadow-lg transition-shadow`}
          style={getMarkerStyle()}
        />
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}