"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
  value: string | number;
  onChange: (value: string) => void;
  isEditing: boolean;
  className?: string;
  type?: "text" | "number" | "time";
  step?: string;
  placeholder?: string;
}

export function EditableField({
  value,
  onChange,
  isEditing,
  className,
  type = "text",
  step,
  placeholder,
}: EditableFieldProps) {
  if (isEditing) {
    return (
      <div className="flex justify-center">
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn("h-10 w-full text-center ", className)}
          step={step}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <span className={cn("text-center", className)}>{value || "—"}</span>
    </div>
  );
}
