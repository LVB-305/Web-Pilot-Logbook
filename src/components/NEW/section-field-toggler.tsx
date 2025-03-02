"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Field {
  id: string;
  label: string;
}

interface SectionFieldTogglerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: Field[];
  visibleFields: string[];
  onVisibleFieldsChange: (fields: string[]) => void;
}

export function SectionFieldToggler({
  open,
  onOpenChange,
  title,
  fields,
  visibleFields,
  onVisibleFieldsChange,
}: SectionFieldTogglerProps) {
  const toggleField = (fieldId: string) => {
    if (visibleFields.includes(fieldId)) {
      onVisibleFieldsChange(visibleFields.filter((id) => id !== fieldId));
    } else {
      onVisibleFieldsChange([...visibleFields, fieldId]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {title} Fields</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.id} className="flex items-center justify-between">
                <span className="text-sm">{field.label}</span>
                <Switch
                  checked={visibleFields.includes(field.id)}
                  onCheckedChange={() => toggleField(field.id)}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
