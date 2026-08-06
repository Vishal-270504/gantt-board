import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { Task } from '../../features/dashboard/types';
import type { CSSProperties } from 'react';

interface TaskBarProps {
  left: number;
  width: number;
  top: number;
  height: number;
  progress: number;
  title: string;
  assignee?: string;
  type?: Task['type'];
  onDoubleClick?: () => void;
}

// Approximate char width at 12px font ~7px/char, plus 16px padding
const CHAR_WIDTH = 7;
const BAR_PADDING = 16;

export function TaskBar({ left, width, top, height, progress, title, assignee, type = 'task', onDoubleClick }: TaskBarProps) {
  const isProject = type === 'project';

  const barStyle = {
    '--bar-left': `${left}px`,
    '--bar-w': `${width}px`,
    '--bar-top': `${top}px`,
    '--bar-h': `${height}px`,
  } as CSSProperties;

  const progressStyle = { '--progress-w': `${progress}%` } as CSSProperties;

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
              'relative overflow-hidden border flex-shrink-0',
              isProject
                ? 'rounded-sm bg-slate-700/80 border-slate-800'
                : 'rounded-md bg-blue-500/20 border-blue-500'
            )}
            style={{ width: `${width}px`, height: '100%' }}
          >
            {!isProject && <div className="h-full bg-blue-500/60 w-[var(--progress-w)]" style={progressStyle} />}
            {titleFits && (
              <span
                className={cn(
                  'absolute inset-0 flex items-center px-2 text-xs truncate',
                  isProject ? 'text-white font-medium' : 'text-foreground'
                )}
              >
                {title}
              </span>
            )}
          </div>

          {/* Title shown beside the bar when it doesn't fit inside */}
          {!titleFits && (
            <span
              className={cn(
                'ml-2 text-xs whitespace-nowrap font-medium',
                isProject ? 'text-foreground font-semibold' : 'text-foreground'
              )}
            >
              {title}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {title} — {progress}%{assignee ? ` · ${assignee}` : ''}
      </TooltipContent>
    </Tooltip>
  );
}