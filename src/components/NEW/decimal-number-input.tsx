import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
interface DecimalNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  placeholder?: string;
}

export function DecimalNumberInput({
  value,
  onChange,
  className,
  placeholder,
}: DecimalNumberInputProps) {
  return (
    <Input
      type="number"
      step="0.1"
      min="0"
      value={value || ""}
      onChange={(e) => {
        const newValue = Number.parseFloat(e.target.value);
        if (!isNaN(newValue) && newValue >= 0) {
          onChange(newValue);
        }
      }}
      placeholder={placeholder}
      className={cn(
        "border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0 text-center",
        className
      )}
    />
  );
}
