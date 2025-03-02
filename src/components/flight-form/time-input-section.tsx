import { cn } from "@/lib/utils";
import { EditableField } from "./editable-field";

interface TimeInputSectionProps {
  title: string;
  subtitle: string;
  firstTime?: string;
  secondTime?: string;
  duration?: string;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  isEditing?: boolean;
  onFirstTimeChange?: (value: string) => void;
  onSecondTimeChange?: (value: string) => void;
}

export function TimeInputSection({
  title,
  subtitle,
  firstTime,
  secondTime,
  duration,
  className,
  headerClassName,
  contentClassName = "bg-white",
  isEditing = false,
  onFirstTimeChange,
  onSecondTimeChange,
}: TimeInputSectionProps) {
  return (
    <div className={cn("border rounded-md overflow-hidden", className)}>
      <div className={cn("text-center py-2 font-medium", headerClassName)}>
        {title}
      </div>
      <div className={cn("border-t", contentClassName)}>
        <EditableField
          value={firstTime || ""}
          onChange={onFirstTimeChange || (() => {})}
          isEditing={isEditing}
          type="time"
          placeholder="HH:MM"
          className="justify-center border-none focus-visible:ring-offset-0 focus-visible:ring-0"
        />
      </div>
      <div
        className={cn("border-t text-center py-2 font-medium", headerClassName)}
      >
        {subtitle}
      </div>
      <div className={cn("border-t", contentClassName)}>
        <EditableField
          value={secondTime || ""}
          onChange={onSecondTimeChange || (() => {})}
          isEditing={isEditing}
          type="time"
          placeholder="HH:MM"
          className="justify-center border-none focus-visible:ring-offset-0 focus-visible:ring-0"
        />
      </div>
      <div
        className={cn("text-center py-2 font-medium border-t", headerClassName)}
      >
        <div className={cn("font-bold")}>{duration || "00:00"}</div>
      </div>
    </div>
  );
}
