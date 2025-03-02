"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ChevronRight } from "lucide-react";
import { IOSButton } from "@/components/flight-table/ios-button";
import { ColumnsOverlay } from "@/components/flight-table/ColumnsOverlay";

import { FlightLog } from "@/schemas/flight";

interface ViewOptionsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  visibleColumns: (keyof FlightLog)[];
  toggleColumn: (columnKey: keyof FlightLog) => void;
  updateColumnOrder: (newOrder: (keyof FlightLog)[]) => void;
}

export function ViewOptionsOverlay({
  isOpen,
  onClose,
  visibleColumns,
  toggleColumn,
  updateColumnOrder,
}: ViewOptionsOverlayProps) {
  const [showColumns, setShowColumns] = useState(false);
  const [showRunwayDesignator, setShowRunwayDesignator] = useState(false);
  const [sortLatest, setSortLatest] = useState(true);

  const handleDone = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showColumns} onOpenChange={onClose}>
        <DialogContent className="w-full h-full sm:w-auto sm:h-auto sm:max-w-[450px] sm:min-h-[500px] md:max-w-[40vw] md:min-h-[60vh] p-0 gap-0 bg-[#f5f5f5] dark:bg-zinc-900 [&>button]:hidden flex flex-col">
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
                <div className="font-medium">Show Runway Designator</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Show runway designator with departure and destination
                  aerodromes
                </div>
              </div>
              <Switch
                checked={showRunwayDesignator}
                onCheckedChange={setShowRunwayDesignator}
              />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="pr-5">
                <div className="font-medium">Lastest Flight First</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Sort your latest flight first
                </div>
              </div>
              <Switch checked={sortLatest} onCheckedChange={setShowColumns} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ColumnsOverlay
        isOpen={isOpen && showColumns}
        onClose={() => setShowColumns(false)}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        updateColumnOrder={updateColumnOrder}
      />
    </>
  );
}
