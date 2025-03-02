import { cn } from "@/lib/utils";

interface ValueDisplayProps {
  value: string | number;
  className?: string;
  showControls?: boolean;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function ValueDisplay({ value, className }: ValueDisplayProps) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <span className="text-center flex-1">{value}</span>
    </div>
  );
}
