export function EmptyState() {
  return (
    <div className="flex-1 w-full bg-background flex flex-col items-center justify-center p-12 text-muted-foreground">
      <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center w-full max-w-md">
        <p className="text-lg font-medium">No tasks found</p>
        <p className="text-sm opacity-75 mt-2">There are currently no tasks to display.</p>
      </div>
    </div>
  );
}
