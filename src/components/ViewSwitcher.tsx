"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, List, ArrowDown, ArrowUp } from "lucide-react";
import { ViewOptionsOverlay } from "@/components/ViewOptionsOverlay";

import { FlightLog } from "@/schemas/flight";

interface ViewSwitcherProps {
  visibleColumns: (keyof FlightLog)[];
  toggleColumn: (column: keyof FlightLog) => void;
  sortColumn: (column: keyof FlightLog, direction: "asc" | "desc") => void;
  currentSort: {
    column: keyof FlightLog | null;
    direction: "asc" | "desc" | null;
  };
  updateColumnOrder: (newOrder: (keyof FlightLog)[]) => void;
}

export function ViewSwitcher({
  visibleColumns,
  toggleColumn,
  sortColumn,
  currentSort,
  updateColumnOrder,
}: ViewSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "table">("table");
  const [showViewOptions, setShowViewOptions] = useState(false);

  const handleSort = (column: keyof FlightLog) => {
    const newDirection =
      currentSort.column === column && currentSort.direction === "asc"
        ? "desc"
        : "asc";
    sortColumn(column, newDirection);
  };

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <List className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <div className="flex flex-col space-y-2 p-2">
            <div className="flex flex-col rounded-md shadow-sm" role="group">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                className="justify-between"
                onClick={() => setViewMode("list")}
              >
                List {viewMode === "list" && <Check className="h-4 w-4" />}
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                className="justify-between"
                onClick={() => setViewMode("table")}
              >
                Table {viewMode === "table" && <Check className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex flex-col rounded-md shadow-sm" role="group">
              <Button
                variant="outline"
                className="justify-between"
                onClick={() => handleSort("date")}
              >
                Date
                {currentSort.column === "date" &&
                  (currentSort.direction === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  ))}
              </Button>
              <Button
                variant="outline"
                className="justify-between"
                onClick={() => handleSort("totalBlock")}
              >
                Flight Time
                {currentSort.column === "totalBlock" &&
                  (currentSort.direction === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  ))}
              </Button>
              <Button
                variant="outline"
                className="justify-between"
                onClick={() => handleSort("dayLanding")}
              >
                Landings
                {currentSort.column === "dayLanding" &&
                  (currentSort.direction === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  ))}
              </Button>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setShowViewOptions(true);
                setIsOpen(false);
              }}
            >
              View Options
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <ViewOptionsOverlay
        isOpen={showViewOptions}
        onClose={() => setShowViewOptions(false)}
        visibleColumns={visibleColumns}
        toggleColumn={toggleColumn}
        updateColumnOrder={updateColumnOrder}
      />
    </>
  );
}
