import { ChevronRight, ChevronDown } from 'lucide-react';
import { useCallback } from 'react';
import { useDashboardStore } from '../store/useDashboardStore';

interface ExpandCollapseButtonProps {
  taskId: string;
  isExpanded: boolean;
  hasChildren: boolean;
}

export function ExpandCollapseButton({ taskId, isExpanded, hasChildren }: ExpandCollapseButtonProps) {
  const toggleExpand = useDashboardStore(state => state.toggleExpand);
  const handleClick = useCallback(() => {
    toggleExpand(taskId);
  }, [taskId, toggleExpand]);

  if (!hasChildren) {
    // Leaf node placeholder to maintain text alignment
    return <span className="w-5 h-5 flex-shrink-0 mr-1" />;
  }

  return (
    <button
      onClick={handleClick}
      className="w-5 h-5 flex items-center justify-center mr-1 rounded hover:bg-muted focus:outline-none transition-colors"
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
    >
      {isExpanded ? (
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      ) : (
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  );
}
