import { cn } from "@/lib/utils";
import { EditableField } from "@/components/flight-form/editable-field";

interface LogSectionProps {
  title: string;
  subtitle: string;
  firstTime?: string;
  firstDate?: string;
  secondTime?: string;
  secondDate?: string;
  firstValue?: string | number;
  secondValue?: string | number;
  duration?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  showValueControls?: boolean;
  isEditing?: boolean;
  onFirstTimeChange?: (value: string) => void;
  onFirstDateChange?: (value: string) => void;
  onSecondTimeChange?: (value: string) => void;
  onSecondDateChange?: (value: string) => void;
  onFirstValueChange?: (value: string) => void;
  onSecondValueChange?: (value: string) => void;
}

export function LogSection({
  title,
  subtitle,
  firstTime,
  firstDate,
  secondTime,
  secondDate,
  firstValue,
  secondValue,
  duration,
  className,
  headerClassName,
  contentClassName = "bg-white",
  showValueControls = false,
  isEditing = false,
  onFirstTimeChange,
  onFirstDateChange,
  onSecondTimeChange,
  onSecondDateChange,
  onFirstValueChange,
  onSecondValueChange,
}: LogSectionProps) {
  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <div className={cn("text-center py-2 font-medium", headerClassName)}>
        {title}
      </div>
      {firstTime && (
        <div className={cn("border-t p-2", contentClassName)}>
          <EditableField
            value={firstTime}
            onChange={onFirstTimeChange || (() => {})}
            isEditing={isEditing}
          />
        </div>
      )}
      {firstValue !== undefined && (
        <div className={cn("border-t p-2", contentClassName)}>
          <EditableField
            value={firstValue}
            onChange={onFirstValueChange || (() => {})}
            isEditing={isEditing}
            type="number"
            step="0.1"
          />
        </div>
      )}
      <div
        className={cn("border-t text-center py-2 font-medium", headerClassName)}
      >
        {subtitle}
      </div>
      {secondTime && (
        <div className={cn("border-t p-2", contentClassName)}>
          <EditableField
            value={secondTime}
            onChange={onSecondTimeChange || (() => {})}
            isEditing={isEditing}
          />
        </div>
      )}
      {secondValue !== undefined && (
        <div className={cn("border-t p-2", contentClassName)}>
          <EditableField
            value={secondValue}
            onChange={onSecondValueChange || (() => {})}
            isEditing={isEditing}
            type="number"
            step="0.1"
          />
        </div>
      )}
      <div
        className={cn("text-center py-2 font-medium border-t", headerClassName)}
      >
        {duration && <div className={cn("font-bold")}>{duration}</div>}
      </div>
    </div>
  );
}
