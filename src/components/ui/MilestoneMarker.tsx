import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import type { CSSProperties } from 'react';

interface MilestoneMarkerProps {
  left: number;
  top: number;
  title: string;
}

export function MilestoneMarker({ left, top, title }: MilestoneMarkerProps) {
  const markerStyle = {
    '--m-left': `${left - 7}px`,
    '--m-top': `${top + 6}px`,
  } as CSSProperties;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className="absolute h-3.5 w-3.5 rotate-45 bg-amber-500 border border-amber-600 left-[var(--m-left)] top-[var(--m-top)]"
          style={markerStyle}
        />
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}