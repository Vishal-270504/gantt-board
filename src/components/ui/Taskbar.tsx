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
}

export function TaskBar({ left, width, top, height, progress, title, assignee, type = 'task' }: TaskBarProps) {
  const isProject = type === 'project';

  const barStyle = {
    '--bar-left': `${left}px`,
    '--bar-w': `${width}px`,
    '--bar-top': `${top}px`,
    '--bar-h': `${height}px`,
  } as CSSProperties;

  const progressStyle = { '--progress-w': `${progress}%` } as CSSProperties;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={cn(
            'absolute overflow-hidden border left-[var(--bar-left)] w-[var(--bar-w)] top-[var(--bar-top)] h-[var(--bar-h)]',
            isProject
              ? 'rounded-sm bg-slate-700/80 border-slate-800'
              : 'rounded-md bg-blue-500/20 border-blue-500'
          )}
          style={barStyle}
        >
          {!isProject && <div className="h-full bg-blue-500/60 w-[var(--progress-w)]" style={progressStyle} />}
          <span
            className={cn(
              'absolute inset-0 flex items-center px-2 text-xs truncate',
              isProject ? 'text-white font-medium' : 'text-foreground'
            )}
          >
            {title}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {title} — {progress}%{assignee ? ` · ${assignee}` : ''}
      </TooltipContent>
    </Tooltip>
  );
}