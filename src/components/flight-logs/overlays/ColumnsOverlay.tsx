"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import { IOSButton } from "@/components/flight-logs/overlays/ios-button";
import { FlightLog, columns } from "@/schemas/flight";

interface ColumnsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  visibleColumns: (keyof FlightLog)[];
  toggleColumn: (columnKey: keyof FlightLog) => void;
}

const columnLabels: Record<string, string> = columns.reduce((acc, column) => {
  acc[column.key] = column.label;
  return acc;
}, {} as Record<string, string>);

export function ColumnsOverlay({
  isOpen,
  onClose,
  visibleColumns,
  toggleColumn,
}: ColumnsOverlayProps) {
  const columns = Object.keys(columnLabels) as (keyof FlightLog)[];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full h-full max-w-full sm:min-h-[500px] md:max-w-md md:max-h-[60vh] p-0 gap-0 bg-[#f5f5f5] dark:bg-zinc-900 [&>button]:hidden flex flex-col"
        aria-describedby={undefined}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <IOSButton
            onClick={onClose}
            className="flex items-center gap-1 h-full"
          >
            <ChevronLeft className="h-4 w-4 inline" />
            <span className="inline">Back</span>
          </IOSButton>
          <DialogTitle>
            <span className="text-lg font-medium">Columns</span>
          </DialogTitle>
          <div className="w-[60px]" /> {/* Spacer for alignment */}
        </div>
        <div className="divide-y overflow-y-auto">
          {columns.map((key: string) => (
            <div
              key={key}
              className="flex items-center justify-between p-4 space-x-4 bg-white dark:bg-zinc-950"
            >
              <div className="flex items-center flex-1">
                <Label
                  htmlFor={`column-${key}`}
                  className="font-medium cursor-pointer flex-1"
                >
                  {columnLabels[key]}
                </Label>
              </div>
              <Switch
                id={`column-${key}`}
                checked={visibleColumns.includes(key as keyof FlightLog)}
                onCheckedChange={() => toggleColumn(key as keyof FlightLog)}
              />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
