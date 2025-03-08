import { columns, FlightLog } from "@/schemas/flight";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { Suspense, useCallback, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type SortDirection = "asc" | "desc" | null;

interface FlightTableProps {
  flights: FlightLog[];
  visibleColumns?: string[];
  loading?: boolean;
}

export function FlightTable({
  flights,
  visibleColumns = [],
  loading = false,
}: FlightTableProps) {
  // const [error, setError] = useState<string | null>(null);
  const [sorting, setSorting] = useState<{
    column: keyof FlightLog | null;
    direction: SortDirection;
  }>({
    column: null,
    direction: null,
  });

  const activeColumns =
    visibleColumns.length > 0
      ? columns.filter((col) => visibleColumns.includes(col.key))
      : columns;

  const sortData = (column: keyof FlightLog, direction: SortDirection) => {
    setSorting({ column, direction });
  };

  const sortedFlights = useMemo(() => {
    if (!sorting.column || sorting.direction === null) {
      return [...flights];
    }

    return [...flights].sort((a, b) => {
      const columnDef = columns.find((col) => col.key === sorting.column);
      if (!columnDef) return 0;

      const valueA = a[sorting.column as keyof FlightLog];
      const valueB = b[sorting.column as keyof FlightLog];

      if (valueA === undefined || valueB === undefined) return 0;

      switch (columnDef.sortType) {
        case "string":
          return sorting.direction === "asc"
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA));
        case "number":
          return sorting.direction === "asc"
            ? Number(valueA) - Number(valueB)
            : Number(valueB) - Number(valueA);
        case "date":
          const parseDate = (dateStr: string) => {
            const [day, month, year] = dateStr.split("/").map(Number);
            return new Date(year, month - 1, day).getTime();
          };
          return sorting.direction === "asc"
            ? parseDate(String(valueA)) - parseDate(String(valueB))
            : parseDate(String(valueB)) - parseDate(String(valueA));
        case "time":
          const timeToMinutes = (time: string) => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
          };
          return sorting.direction === "asc"
            ? timeToMinutes(String(valueA)) - timeToMinutes(String(valueB))
            : timeToMinutes(String(valueB)) - timeToMinutes(String(valueA));
        case "boolean":
          return sorting.direction === "asc"
            ? Number(valueA) - Number(valueB)
            : Number(valueB) - Number(valueA);
        default:
          return 0;
      }
    });
  }, [flights, sorting.column, sorting.direction]);

  const formatLocation = useCallback((location: string, runway?: string) => {
    // Handle missing airport with runway
    if (!location && runway) {
      return `-/${runway}`;
    }
    // Only add the runway with separator if runway is provided
    return runway && runway.trim() ? `${location}/${runway}` : location || "-";
  }, []);

  const formatAircraft = useCallback((registration?: string, type?: string) => {
    if (registration && !type) {
      return (
        <span className="text-center truncate font-medium">{registration}</span>
      );
    }

    if (!registration && !type) {
      return <span>-</span>;
    }

    // Both registration and type are available
    return (
      <div>
        <span className="text-center truncate font-medium">{registration}</span>
        <Badge variant="outline" className="rounded ml-1">
          {type}
        </Badge>
      </div>
    );
  }, []);

  return (
    <div className="max-w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {activeColumns.map((column) => (
              <TableHead
                key={column.key}
                className={`${
                  column.sortable ? "cursor-pointer select-none" : ""
                } whitespace-nowrap`}
                style={{ minWidth: column.width, width: column.width }}
                onClick={() => {
                  if (!column.sortable) return;
                  let newDirection: SortDirection = "asc";
                  if (sorting.column === column.key) {
                    if (sorting.direction === "asc") newDirection = "desc";
                    else if (sorting.direction === "desc") newDirection = null;
                  }
                  sortData(column.key, newDirection);
                }}
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && (
                    <span className="ml-2">
                      {sorting.column === column.key ? (
                        sorting.direction === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : sorting.direction === "desc" ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronsUpDown className="h-4 w-4 opacity-50" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            // Display skeletons while loading
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {visibleColumns.map((columnKey) => (
                  <TableCell key={`${index}-${columnKey}`}>
                    <Skeleton className="h-6 w-[100px]" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <Suspense fallback={<div>Loading...</div>}>
              {sortedFlights.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={activeColumns.length}
                    className="h-24 text-center"
                  >
                    <span>No flights found.</span>
                  </TableCell>
                </TableRow>
              ) : (
                sortedFlights.map((flight) => (
                  <TableRow
                    key={flight.id}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() =>
                      (window.location.href = `/app/logbook/${flight.id}`)
                    }
                  >
                    {activeColumns.map((column) => (
                      <TableCell
                        key={`${flight.id}-${column.key}`}
                        className="whitespace-nowrap"
                        style={{ minWidth: column.width, width: column.width }}
                      >
                        {column.key === "departure"
                          ? formatLocation(
                              flight.departure,
                              flight.departure_runway
                            )
                          : column.key === "destination"
                          ? formatLocation(
                              flight.destination,
                              flight.destination_runway
                            )
                          : column.key === "aircraftRegistration"
                          ? formatAircraft(
                              flight.aircraftRegistration,
                              flight.aircraftType
                            )
                          : typeof flight[column.key] === "boolean"
                          ? flight[column.key]
                            ? "Yes"
                            : "No"
                          : flight[column.key] || "-"}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </Suspense>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
