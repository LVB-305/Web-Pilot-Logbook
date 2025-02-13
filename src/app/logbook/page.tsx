"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from "lucide-react";
import { ViewSwitcher } from "./ViewSwitcher";
import { Badge } from "@/components/ui/badge";

interface FlightLog {
  id: string;
  date: string;
  departure: string;
  departure_runway: string;
  timeOffBlock: string;
  timeTakeOff: string; // Time available?
  destination: string;
  destination_runway: string;
  timeLanding: string;
  timeOnBlock: string;
  aircraftType: string;
  aircraftRegistration: string;
  hobbsOut: number;
  hobbsIn: number;
  timeSingleEngine: string;
  timeMultiEngine: string;
  timeMultiPilot: string;
  totalBlockTime: string;
  totalAirTime: string;
  picName: string;
  takeoffDay: number;
  takeoffNight: number;
  landingDay: number;
  landingNight: number;
  timeNight: string;
  timeIfr: string;
  timeXc: string;
  isSolo: boolean;
  isSpic: boolean;
  isPicus: boolean;
  timePic: string;
  timeCopilot: string;
  timeDual: string;
  timeInstructor: string;
  simulatorDate: string;
  simulatorType: string;
  timeSimulator: string;
  approachType: string;
  operationType: string;
  passengerCount: number;
  trainingDescription: string;
  remarksEndorsements: string;
  signature: string;
}

type SortDirection = "asc" | "desc" | null;

interface Column {
  key: keyof FlightLog;
  label: string;
  defaultHidden?: boolean;
  sortable?: boolean;
  sortType?: "string" | "number" | "date" | "time" | "boolean";
}

const columns: Column[] = [
  { key: "date", label: "Date", sortable: true, sortType: "date" },
  { key: "departure", label: "Departure" },
  { key: "destination", label: "Destination" },
  { key: "timeOffBlock", label: "Off Block" },
  { key: "timeOnBlock", label: "On Block" },
  { key: "timeTakeOff", label: "Take-Off Time", defaultHidden: true },
  { key: "timeLanding", label: "Landing Time", defaultHidden: true },
  { key: "picName", label: "PIC Name", sortable: true, sortType: "string" },
  { key: "aircraftRegistration", label: "Aircraft" },
  // { key: "flightNumber", label: "Flight Number", defaultHidden: true },
  {
    key: "takeoffDay",
    label: "Day Take-Off",
    sortable: true,
    sortType: "number",
  },
  {
    key: "takeoffNight",
    label: "Night Take-Off",
    sortable: true,
    sortType: "number",
  },
  {
    key: "landingDay",
    label: "Day Landing",
    sortable: true,
    sortType: "number",
  },
  {
    key: "landingNight",
    label: "Night Landing",
    sortable: true,
    sortType: "number",
  },
  {
    key: "totalBlockTime",
    label: "Total Block",
    sortable: true,
    sortType: "time",
  },
  {
    key: "totalAirTime",
    label: "Total Air",
    defaultHidden: true,
    sortable: true,
    sortType: "time",
  },
  { key: "timeNight", label: "Night", sortable: true, sortType: "time" },
  { key: "timeIfr", label: "IFR", sortable: true, sortType: "time" },
  { key: "timePic", label: "PIC", sortable: true, sortType: "time" },
  {
    key: "timeCopilot",
    label: "Co-Pilot",
    defaultHidden: true,
    sortable: true,
    sortType: "time",
  },
  { key: "timeDual", label: "Dual", sortable: true, sortType: "time" },
  {
    key: "timeInstructor",
    label: "Instructor",
    defaultHidden: true,
    sortable: true,
    sortType: "time",
  },
  { key: "isSolo", label: "Solo", sortable: true, sortType: "boolean" },
  {
    key: "isSpic",
    label: "SPIC",
    defaultHidden: true,
    sortable: true,
    sortType: "boolean",
  },
  {
    key: "isPicus",
    label: "PICUS",
    defaultHidden: true,
    sortable: true,
    sortType: "boolean",
  },
  { key: "trainingDescription", label: "Training" },
  { key: "remarksEndorsements", label: "Remark" },
];

export default function FlightLogTable() {
  const [flightLogs, setFlightLogs] = useState<FlightLog[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<(keyof FlightLog)[]>(
    columns.filter((col) => !col.defaultHidden).map((col) => col.key)
  );
  const [columnOrder, setColumnOrder] = useState<(keyof FlightLog)[]>(
    columns.map((col) => col.key)
  );
  const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<{
    column: keyof FlightLog | null;
    direction: SortDirection;
  }>({
    column: null,
    direction: null,
  });
  const [showRunwayDesignator, setShowRunwayDesignator] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchFlightLogs();
      // const savedOrder = Cookies.get('columnOrder')
      // if (savedOrder) {
      //   setColumnOrder(JSON.parse(savedOrder))
      // }
    }
  }, []);

  async function fetchFlightLogs() {
    // const { data, error } = await supabase
    //   .from('flight_logs')
    //   .select('*')

    const result = await fetch(
      "https://script.google.com/macros/s/AKfycbxP5EJZQdoKwIRYWFVTzrOIb3PnegIRH80Oqu-DDTv0ON2nAof6LatuOp5xZzKBKWE/exec"
    );

    const data = await result.json();

    console.log(data);

    // if (error) {
    //   console.error('Error fetching flight logs:', error)
    //   setError(error.message)
    // } else {
    setFlightLogs(data.data);
    setError(null);
    // }
  }

  const toggleColumn = (columnKey: string) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey as keyof FlightLog)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey as keyof FlightLog]
    );
  };

  // const updateColumnOrder = (newOrder: (keyof FlightLog)[]) => {
  //   setColumnOrder(newOrder);
  //   Cookies.set("columnOrder", JSON.stringify(newOrder), { expires: 365 });
  // };

  const sortData = (column: keyof FlightLog, direction: SortDirection) => {
    setSorting({ column, direction });

    const sortedData = [...flightLogs].sort((a, b) => {
      const columnDef = columns.find((col) => col.key === column);
      if (!columnDef) return 0;

      const valueA = a[column];
      const valueB = b[column];

      switch (columnDef.sortType) {
        case "string":
          return direction === "asc"
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA));
        case "number":
          return direction === "asc"
            ? Number(valueA) - Number(valueB)
            : Number(valueB) - Number(valueA);
        case "date":
          return direction === "asc"
            ? Date.parse(valueA) - Date.parse(valueB)
            : Date.parse(valueB) - Date.parse(valueA);
        case "time":
          const timeToMinutes = (time: string) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
          };
          return direction === "asc"
            ? timeToMinutes(valueA) - timeToMinutes(valueB)
            : timeToMinutes(valueB) - timeToMinutes(valueA);
        case "boolean":
          return direction === "asc"
            ? Number(valueA) - Number(valueB)
            : Number(valueB) - Number(valueA);
        default:
          return 0;
      }
    });

    setFlightLogs(sortedData);
  };

  const formatLocation = useCallback((location: string, runway: string) => {
    return `${location}/${runway}`;
  }, []);

  const formatAircraft = useCallback((registration: string, type: string) => {
    return (
      <div>
        <span className="text-center truncate font-medium">{registration}</span>
        <Badge variant="outline" className="rounded">
          {type}
        </Badge>
      </div>
    );
  }, []);

  const filteredLogs = useMemo(() => {
    if (!searchTerm) return flightLogs;

    return flightLogs.filter((log) => {
      const searchTermLower = searchTerm.toLowerCase();
      const year = new Date(log.date).getFullYear().toString();
      const departureWithRunway = formatLocation(
        log.departure,
        log.departure_runway
      ).toLowerCase();
      const destinationWithRunway = formatLocation(
        log.destination,
        log.destination_runway
      ).toLowerCase();
      const aircraft = formatLocation(
        log.aircraftRegistration,
        log.aircraftType
      ).toLowerCase();

      return (
        log.date.toLowerCase().includes(searchTermLower) ||
        year.includes(searchTermLower) ||
        departureWithRunway.includes(searchTermLower) ||
        destinationWithRunway.includes(searchTermLower) ||
        log.picName.toLowerCase().includes(searchTermLower) ||
        aircraft.includes(searchTermLower) ||
        // log.flightNumber.toLowerCase().includes(searchTermLower) ||
        (searchTermLower === "solo" && log.isSolo) ||
        (searchTermLower === "spic" && log.isSpic) ||
        (searchTermLower === "picus" && log.isPicus)
      );
    });
  }, [flightLogs, searchTerm, formatLocation]);

  return (
    <div className="container mx-auto p-2 w-full">
      <div className="mb-4 flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        {/* <ViewSwitcher
          visibleColumns={visibleColumns}
          toggleColumn={toggleColumn}
          sortColumn={sortData}
          currentSort={sorting}
          updateColumnOrder={updateColumnOrder}
        /> */}
      </div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {columnOrder
              .filter((col) => visibleColumns.includes(col))
              .map((columnKey) => {
                const column = columns.find((c) => c.key === columnKey);
                if (!column) return null;
                return (
                  <TableHead
                    key={column.key}
                    className={
                      column.sortable ? "cursor-pointer select-none" : ""
                    }
                    onClick={() =>
                      column.sortable &&
                      sortData(
                        column.key,
                        sorting.column === column.key &&
                          sorting.direction === "asc"
                          ? "desc"
                          : "asc"
                      )
                    }
                  >
                    <div className="flex items-center">
                      {column.label}
                      {column.sortable && (
                        <span className="ml-2">
                          {sorting.column === column.key ? (
                            sorting.direction === "asc" ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-4 w-4 opacity-50" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                );
              })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length}
                className="h-24 text-center"
              >
                {searchTerm ? (
                  <span>`No results found for ${searchTerm}`</span>
                ) : (
                  <span>No flights found.</span>
                )}
              </TableCell>
            </TableRow>
          ) : (
            filteredLogs.map((log) => (
              <TableRow key={log.id}>
                {columnOrder
                  .filter((col) => visibleColumns.includes(col))
                  .map((columnKey) => (
                    <TableCell key={`${log.id}-${columnKey}`}>
                      {columnKey === "departure"
                        ? formatLocation(log.departure, log.departure_runway)
                        : columnKey === "destination"
                        ? formatLocation(
                            log.destination,
                            log.destination_runway
                          )
                        : columnKey === "aircraftRegistration"
                        ? formatAircraft(
                            log.aircraftRegistration,
                            log.aircraftType
                          )
                        : typeof log[columnKey] === "boolean"
                        ? log[columnKey]
                          ? "Yes"
                          : "No"
                        : log[columnKey]}
                    </TableCell>
                  ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
