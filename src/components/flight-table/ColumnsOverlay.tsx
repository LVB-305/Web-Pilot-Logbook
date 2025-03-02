"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GripVertical, ChevronLeft } from "lucide-react";
import { IOSButton } from "./ios-button";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import Cookies from "js-cookie";

import { FlightLog } from "@/schemas/flight";

interface ColumnsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  visibleColumns: (keyof FlightLog)[];
  toggleColumn: (columnKey: keyof FlightLog) => void;
  updateColumnOrder: (newOrder: (keyof FlightLog)[]) => void;
}

const columnLabels: Record<string, string> = {
  date: "Date",
  flightNumber: "Flight Number",
  departure: "Departure",
  destination: "Destination",
  registration: "Aircraft",
  offBlock: "Off Block Time",
  onBlock: "On Block Time",
  totalBlock: "Total Block Time",
  offTime: "Take Off Time",
  onTime: "Landing Time",
  totalAir: "Flight Time",
  night: "Night Time",
  ifr: "IFR Time",
  pic: "PIC",
  coPilot: "Co-Pilot",
  dual: "Dual",
  fi: "FI",
  solo: "Solo",
  spic: "SPIC",
  picus: "PICUS",
};

export function ColumnsOverlay({
  isOpen,
  onClose,
  visibleColumns,
  toggleColumn,
  updateColumnOrder,
}: ColumnsOverlayProps) {
  const [columnOrder, setColumnOrder] = useState<(keyof FlightLog)[]>(
    Object.keys(columnLabels) as (keyof FlightLog)[]
  );

  useEffect(() => {
    const savedOrder = Cookies.get("columnOrder");
    if (savedOrder) {
      setColumnOrder(JSON.parse(savedOrder));
    }
  }, []);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newOrder = Array.from(columnOrder);
    const [reorderedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, reorderedItem);

    setColumnOrder(newOrder);
    updateColumnOrder(newOrder);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-0 gap-0 bg-[#f5f5f5] dark:bg-zinc-900 [&>button]:hidden">
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="columns">
            {(provided: DroppableProvided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="divide-y max-h-[80vh] overflow-y-auto"
              >
                {columnOrder.map((key: string, index: number) => (
                  <Draggable key={key} draggableId={key} index={index}>
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot
                    ) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center justify-between p-4 bg-white dark:bg-zinc-950 ${
                          snapshot.isDragging ? "shadow-lg" : ""
                        }`}
                      >
                        <div className="flex items-center flex-1">
                          <div {...provided.dragHandleProps} className="mr-3">
                            <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                          </div>
                          <Label
                            htmlFor={`column-${key}`}
                            className="font-medium cursor-pointer flex-1"
                          >
                            {columnLabels[key]}
                          </Label>
                        </div>
                        <Switch
                          id={`column-${key}`}
                          checked={visibleColumns.includes(
                            key as keyof FlightLog
                          )}
                          onCheckedChange={() =>
                            toggleColumn(key as keyof FlightLog)
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </DialogContent>
    </Dialog>
  );
}
