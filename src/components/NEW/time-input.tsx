import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface TimeInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function TimeInput({
  placeholder = "HH:MM",
  value,
  onChange,
  className,
}: TimeInputProps) {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      type="time"
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        "border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0 text-center",
        className
      )}
    />
  );
}
