"use client";
import { Switch } from "@/components/ui/switch";

interface ToggleSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
}

export function ToggleSwitch({
  checked,
  onCheckedChange,
  label,
}: ToggleSwitchProps) {
  return (
    <div className="flex items-center">
      {label && <span className="mr-2 text-sm text-gray-700">{label}</span>}
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
