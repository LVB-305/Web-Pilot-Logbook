"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { List, Plus, Search, Table } from "lucide-react";
import Link from "next/link";
import { FlightList } from "@/components/flight-list/flight-list";
import { Input } from "@/components/ui/input";
import { FlightTable } from "@/components/flight-list/flight-table";
import { columns } from "@/schemas/flight";

// Mock data for demonstration
const mockFlights = [
  {
    id: "1",
    date: "2024-03-29",
    departure: "EGLL",
    arrival: "EGLL",
    startTime: "23:19",
    endTime: "00:26",
    registration: "G-AAAA",
    aircraftType: "B748",
  },
  {
    id: "2",
    date: "2024-03-29",
    departure: "EGLL",
    arrival: "EGLL",
    startTime: "03:00",
    endTime: "04:11",
    registration: "G-AAAA",
    aircraftType: "B748",
  },
  {
    id: "3",
    date: "2024-02-15",
    departure: "KJFK",
    arrival: "EGLL",
    startTime: "21:00",
    endTime: "09:15",
    registration: "G-BBBB",
    aircraftType: "A320",
  },
];

export default function FlightsPage() {
  const [viewMode, setViewMode] = useState<"blocks" | "table">("blocks");
  const [searchTerm, setSearchTerm] = useState("");
  const [showViewOptions, setShowViewOptions] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key)
  );

  const [loading, setLoading] = useState(true);
  const [flights, setFlights] = useState<typeof mockFlights>([]);

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFlights(mockFlights);
      setLoading(false);
    };

    loadData();
  }, []);

  const filteredFlights = useMemo(() => {
    if (!searchTerm) return flights; // REPLACE THIS IN THE FUTURE

    const searchTermLower = searchTerm.toLowerCase();

    return flights.filter((flight) => {
      return (
        flight.date.toLowerCase().includes(searchTermLower) ||
        flight.departure.toLowerCase().includes(searchTermLower) ||
        flight.arrival.toLowerCase().includes(searchTermLower) ||
        flight.registration.toLowerCase().includes(searchTermLower) ||
        flight.aircraftType.toLowerCase().includes(searchTermLower)
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
            <FlightList flights={filteredFlights} loading={loading} />
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
                  No results found for "
                  <span className="font-medium">{searchTerm}</span>"
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
