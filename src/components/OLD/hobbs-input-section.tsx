import { cn } from "@/lib/utils";
import { EditableField } from "@/components/flight-form/editable-field";

interface HobbsInputSectionProps {
  firstValue?: string | number;
  secondValue?: string | number;
  duration?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  isEditing?: boolean;
  onFirstValueChange?: (value: string) => void;
  onSecondValueChange?: (value: string) => void;
}

export function HobbsInputSection({
  firstValue,
  secondValue,
  duration,
  className,
  headerClassName,
  contentClassName = "bg-white",
  isEditing = false,
  onFirstValueChange,
  onSecondValueChange,
}: HobbsInputSectionProps) {
  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <div className={cn("text-center py-2 font-medium", headerClassName)}>
        HOBBS START
      </div>
      {firstValue !== undefined && (
        <div className={cn("border-t", contentClassName)}>
          <EditableField
            value={firstValue}
            onChange={onFirstValueChange || (() => {})}
            isEditing={isEditing}
            type="number"
            step="0.1"
            placeholder="0.0"
            className="justify-center border-none focus-visible:ring-offset-0 focus-visible:ring-0"
          />
        </div>
      )}
      <div
        className={cn("border-t text-center py-2 font-medium", headerClassName)}
      >
        HOBBS END
      </div>
      {secondValue !== undefined && (
        <div className={cn("border-t", contentClassName)}>
          <EditableField
            value={secondValue}
            onChange={onSecondValueChange || (() => {})}
            isEditing={isEditing}
            type="number"
            step="0.1"
            placeholder="0.0"
            className="justify-center border-none focus-visible:ring-offset-0 focus-visible:ring-0"
          />
        </div>
      )}
      {duration && (
        <div
          className={cn(
            "text-center py-2 font-medium border-t",
            headerClassName
          )}
        >
          <div className={cn("font-bold")}>{duration}</div>
        </div>
      )}
    </div>
  );
}
