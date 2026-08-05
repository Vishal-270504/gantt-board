import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddTaskButtonProps {
  onClick: () => void;
}

export function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <div className="flex items-center justify-center h-full">
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className="h-7 px-2"
      >
        <Plus className="w-4 h-4 mr-1" />
        Add Task
      </Button>
    </div>
  );
}