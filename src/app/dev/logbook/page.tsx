"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { List, Plus, Search, Table } from "lucide-react";
import Link from "next/link";
import { FlightList } from "@/components/flight-list/flight-list";
import { Input } from "@/components/ui/input";
import { FlightTable } from "@/components/flight-list/flight-table";
import { columns, FlightLog } from "@/schemas/flight";
import getFlightLogs from "@/hooks/flights";

export default function FlightsPage() {
  const [viewMode, setViewMode] = useState<"blocks" | "table">("blocks");
  const [searchTerm, setSearchTerm] = useState("");
  // const [showViewOptions, setShowViewOptions] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key)
  );

  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<FlightLog[]>([]);

  // TMP
  const sortLatest = true;

  // Apply default date sorting
  const applyDefaultSorting = useCallback(
    (logs: FlightLog[]) => {
      return [...logs].sort((a, b) => {
        const parseDate = (date: string) => {
          const [day, month, year] = date.split("/").map(Number);
          return new Date(year, month - 1, day).getTime();
        };
        if (sortLatest) {
          return parseDate(b.date) - parseDate(a.date);
        } else {
          return parseDate(a.date) - parseDate(b.date);
        }
      });
    },
    [sortLatest]
  );

  // Load data from function
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const flights = (await getFlightLogs()) as FlightLog[];
      setFlights(applyDefaultSorting(flights));
      setLoading(false);
    };

    loadData();
  }, [applyDefaultSorting]);

  const filteredFlights = useMemo(() => {
    if (!searchTerm) return flights; // REPLACE THIS IN THE FUTURE

    return flights.filter((flight) => {
      const searchTermLower = searchTerm.toLowerCase();
      const year = new Date(flight.date).getFullYear().toString();
      return (
        flight.date.toLowerCase().includes(searchTermLower) ||
        year.includes(searchTermLower) ||
        flight.departure.toLowerCase().includes(searchTermLower) ||
        flight.destination.toLowerCase().includes(searchTermLower) ||
        flight.aircraftRegistration.toLowerCase().includes(searchTermLower) ||
        flight.aircraftType.toLowerCase().includes(searchTermLower) ||
        flight.picName.toLowerCase().includes(searchTermLower) ||
        (searchTermLower === "solo" && flight.isSolo) ||
        (searchTermLower === "spic" && flight.isSpic) ||
        (searchTermLower === "picus" && flight.isPicus)
      );
    });
  }, [flights, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageHeader
        title="Dev"
        backHref="/app/logbook"
        showBackButton={true}
        actionButton={
          <Button variant="ghost" className="text-blue-600 font-medium" asChild>
            <Link href="/app/logbook/new">
              <Plus className="h-4 w-4 mr-2" />
            </Link>
          </Button>
        }
      />

      {/* Search button or search bar */}
      <div className="p-4 flex justify-between">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            disabled={loading}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setViewMode(viewMode === "blocks" ? "table" : "blocks")
            }
            className="bg-white"
            disabled={loading}
          >
            {viewMode === "blocks" ? (
              <>
                <List className="h-4 w-4" />
              </>
            ) : (
              <>
                <Table className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white">
        {loading || filteredFlights.length > 0 ? (
          viewMode === "blocks" ? (
            <FlightList
              flights={filteredFlights.map((f) => ({
                id: f.id,
                date: f.date,
                arrival: f.destination,
                departure: f.departure,
                startTime: f.timeOffBlock,
                endTime: f.timeOnBlock,
                registration: f.aircraftRegistration,
                aircraftType: f.aircraftType,
              }))}
              loading={loading}
            />
          ) : (
            <FlightTable
              flights={filteredFlights}
              visibleColumns={visibleColumns}
              loading={loading}
            />
          )
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>
              {searchTerm ? (
                <>
                  No results found for &quot;
                  <span className="font-medium">{searchTerm}</span>&quot;
                </>
              ) : (
                "No flights recorded yet."
              )}
            </p>
            {!searchTerm && (
              <p>
                Add your first flight by clicking the BUTTON NEEDED HERE button.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
