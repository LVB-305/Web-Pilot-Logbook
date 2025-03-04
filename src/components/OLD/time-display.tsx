import { cn } from "@/lib/utils";

interface TimeDisplayProps {
  time: string;
  className?: string;
  showIcon?: boolean;
}

export function TimeDisplay({ time, className }: TimeDisplayProps) {
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <span className="text-center">{time}</span>
    </div>
  );
}
