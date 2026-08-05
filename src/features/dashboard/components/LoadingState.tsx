import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex-1 w-full bg-background flex flex-col items-center justify-center p-12 text-muted-foreground">
      <Loader2 className="w-8 h-8 animate-spin mb-4" />
      <p>Loading tasks...</p>
    </div>
  );
}
