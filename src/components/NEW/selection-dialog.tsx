"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SearchCommand } from "@/components/NEW/search-command";

interface SelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  searchPlaceholder: string;
  items: Array<{ value: string; label: string }>;
  value?: string;
  onValueChange: (value: string) => void;
  emptyMessage?: string;
}

export function SelectionDialog({
  open,
  onOpenChange,
  title,
  searchPlaceholder,
  items,
  value,
  onValueChange,
  emptyMessage,
}: SelectionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <SearchCommand
            items={items}
            placeholder={searchPlaceholder}
            value={value}
            onValueChange={(newValue) => {
              onValueChange(newValue);
              onOpenChange(false);
            }}
            emptyMessage={emptyMessage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
