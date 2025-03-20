"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

interface ApproachDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (approaches: string[]) => void;
  selectedApproaches: string[];
}

export function ApproachDialog({
  open,
  onOpenChange,
  onSelect,
  selectedApproaches,
}: ApproachDialogProps) {
  const [selected, setSelected] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (open) {
      setSelected(selectedApproaches);
    }
  }, [open, selectedApproaches]);

  const toggleApproach = (approachId: string) => {
    setSelected((current) =>
      current.includes(approachId)
        ? current.filter((id) => id !== approachId)
        : [...current, approachId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Approaches</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search approaches..." />
            <CommandList>
              <CommandEmpty>No approaches found.</CommandEmpty>
              <CommandGroup>
                <ScrollArea className="h-[200px]">
                  {mockApproaches.map((approach) => (
                    <CommandItem
                      key={approach.id}
                      value={approach.id}
                      onSelect={() => toggleApproach(approach.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{approach.label}</span>
                        {selected.includes(approach.id) && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </ScrollArea>
              </CommandGroup>
            </CommandList>
          </Command>
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                onSelect(selected);
                onOpenChange(false);
              }}
            >
              Add Selected
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const mockApproaches = [
  { id: "ils", label: "ILS Approach" },
  { id: "vor", label: "VOR Approach" },
  { id: "ndb", label: "NDB Approach" },
  { id: "rnav", label: "RNAV Approach" },
  { id: "visual", label: "Visual Approach" },
];
