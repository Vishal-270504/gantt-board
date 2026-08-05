import { useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useDashboardStore } from '../store/useDashboardStore';

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskDialog({
  open,
  onOpenChange,
}: AddTaskDialogProps) {
  const tasks = useDashboardStore((state) => state.tasks);

  const parentTasks = useMemo(
    () =>
      tasks.filter(
        (task) => task.type === 'project' || task.type === 'task'
      ),
    [tasks]
  );

  const predecessorTasks = useMemo(() => tasks, [tasks]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>

          <DialogDescription>
            This dialog is displayed for demonstration purposes only.
            Task creation will be available in Phase 2.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-5 py-4">
          {/* Task Name */}
          <div className="space-y-2 col-span-2">
            <Label htmlFor="taskName">
              Task Name
            </Label>

            <Input
              id="taskName"
              placeholder="Enter task name"
              disabled
            />
          </div>

          {/* Parent */}
          <div className="space-y-2">
            <Label>Parent Task</Label>

            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select parent task" />
              </SelectTrigger>

              <SelectContent>
                {parentTasks.map((task) => (
                  <SelectItem
                    key={task.id}
                    value={task.id}
                  >
                    {task.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Task Type */}
          <div className="space-y-2">
            <Label>Task Type</Label>

            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Task Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="task">
                  Task
                </SelectItem>

                <SelectItem value="project">
                  Project
                </SelectItem>

                <SelectItem value="milestone">
                  Milestone
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label>Start Date</Label>

            <Input
              type="datetime-local"
              disabled
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label>End Date</Label>

            <Input
              type="datetime-local"
              disabled
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label>Duration</Label>

            <Input
              placeholder="e.g. 5 Days"
              disabled
            />
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <Label>Progress (%)</Label>

            <Input
              type="number"
              placeholder="0"
              disabled
            />
          </div>

          {/* Predecessor */}
          <div className="space-y-2 col-span-2">
            <Label>Predecessor</Label>

            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select predecessor task" />
              </SelectTrigger>

              <SelectContent>
                {predecessorTasks.map((task) => (
                  <SelectItem
                    key={task.id}
                    value={task.id}
                  >
                    {task.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>

          <Button disabled>
            Create Task (Phase 2)
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}