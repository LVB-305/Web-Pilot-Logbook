"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";
import { IOSButton } from "@/components/flight-logs/overlays/ios-button";
import { ColumnsOverlay } from "@/components/flight-logs/overlays/ColumnsOverlay";
import { FlightLog } from "@/schemas/flight";

interface ViewOptionsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  visibleColumns: (keyof FlightLog)[];
  toggleColumn: (columnKey: keyof FlightLog) => void;
  sortLatest: boolean;
  onSortLatestChange: (value: boolean) => void;
}

export function ViewOptionsOverlay({
  isOpen,
  onClose,
  visibleColumns,
  toggleColumn,
  sortLatest,
  onSortLatestChange,
}: ViewOptionsOverlayProps) {
  const [showColumns, setShowColumns] = useState(false);

  const handleDone = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showColumns} onOpenChange={onClose}>
        <DialogContent
          className="w-full h-full max-w-full sm:min-h-[500px] md:max-w-[40vw] md:max-h-[60vh] p-0 gap-0 bg-[#f5f5f5] dark:bg-zinc-900 [&>button]:hidden flex flex-col"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="w-[60px]" /> {/* Spacer for alignment */}
            <DialogTitle>
              <span className="text-lg font-medium">View Options</span>
            </DialogTitle>
            <IOSButton onClick={handleDone}>Done</IOSButton>
          </div>
          <div className="divide-y">
            <button
              onClick={() => setShowColumns(true)}
              className="flex items-center justify-between w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-zinc-800"
            >
              <div className="pr-5">
                <div className="font-medium">Columns</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Select the desired table columns
                </div>
              </div>
              <div className="flex items-center text-gray-400">
                <span className="mr-2">{visibleColumns.length}</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
            <div className="flex items-center justify-between p-4">
              <div className="pr-5">
                <div className="font-medium">Latest Flight First</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Sort your flights by latest date first
                </div>
              </div>
              <Switch
                checked={sortLatest}
                onCheckedChange={onSortLatestChange}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ColumnsOverlay
        isOpen={isOpen && showColumns}
        onClose={() => setShowColumns(false)}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
      />
    </>
  );
}
