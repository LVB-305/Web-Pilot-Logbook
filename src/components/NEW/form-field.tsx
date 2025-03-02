import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  value?: string;
  icon?: ReactNode;
  inputField?: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function FormField({
  label,
  value,
  icon,
  inputField,
  onClick,
  className,
}: FormFieldProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-4",
        onClick && "hover:bg-gray-50",
        className
      )}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="text-gray-700">{label}</div>
      <div className="flex items-center">
        {inputField ? (
          <div className="w-48">{inputField}</div>
        ) : (
          <div className="text-gray-700 mr-2">{value}</div>
        )}
        {icon && <div>{icon}</div>}
      </div>
    </div>
  );
}
