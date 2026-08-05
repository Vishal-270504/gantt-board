import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
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

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <Label>
      {children}
      <span className="text-red-500 ml-0.5">*</span>
    </Label>
  );
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
        </DialogHeader>

        <div className="grid grid-cols-2 gap-5 py-4">
          {/* Task Name - MANDATORY */}
          <div className="space-y-2 col-span-2">
            <RequiredLabel>Task Name</RequiredLabel>
            <Input
              id="taskName"
              placeholder="Enter task name"
              disabled
            />
          </div>

          {/* Parent - OPTIONAL (auto-assigned if empty) */}
          <div className="space-y-2">
            <Label>Parent Task</Label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select parent task" />
              </SelectTrigger>
              <SelectContent>
                {parentTasks.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Task Type - MANDATORY */}
          <div className="space-y-2">
            <RequiredLabel>Task Type</RequiredLabel>
            <Select disabled>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Task Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="task">Task</SelectItem>
                <SelectItem value="project">Project</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date - MANDATORY */}
          <div className="space-y-2">
            <RequiredLabel>Start Date</RequiredLabel>
            <Input type="datetime-local" disabled />
          </div>

          {/* End Date - MANDATORY */}
          <div className="space-y-2">
            <RequiredLabel>End Date</RequiredLabel>
            <Input type="datetime-local" disabled />
          </div>

          {/* Duration - MANDATORY */}
          <div className="space-y-2">
            <RequiredLabel>Duration</RequiredLabel>
            <Input placeholder="e.g. 5 Days" disabled />
          </div>

          {/* Progress - MANDATORY */}
          <div className="space-y-2">
            <RequiredLabel>Progress (%)</RequiredLabel>
            <Input type="number" placeholder="0" disabled />
          </div>

          {/* Assignee - OPTIONAL */}
          <div className="space-y-2">
            <Label>Assignee</Label>
            <Input placeholder="Enter assignee name" disabled />
          </div>

          {/* Predecessor - OPTIONAL */}
          <div className="space-y-2">
            <Label>Predecessor</Label>
            <Select disabled>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select predecessor" />
              </SelectTrigger>
              <SelectContent>
                {predecessorTasks.map((task) => (
                  <SelectItem key={task.id} value={task.id}>
                    {task.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button disabled>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}