"use client";

import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { FlightList } from "@/components/flight-list/flight-list";

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
  const [searchVisible, setSearchVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  //   const [activeFilters, setActiveFilters] = useState<FilterOptions>({
  //     dateRange: "all",
  //     aircraftTypes: [],
  //     flightTypes: [],
  //     airports: [],
  //   });

  // Filter flights based on search query and filters
  const filteredFlights = mockFlights.filter((flight) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        flight.departure.toLowerCase().includes(query) ||
        flight.arrival.toLowerCase().includes(query) ||
        flight.registration.toLowerCase().includes(query) ||
        flight.aircraftType.toLowerCase().includes(query)
      );
    }
    return true;
  });

  //   const toggleSearch = () => {
  //     setSearchVisible(!searchVisible);
  //     if (!searchVisible) {
  //       // Reset search query when closing
  //       setSearchQuery("");
  //     }
  //   };

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
      {/* {searchVisible ? (
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => {
            setSearchQuery("");
            setSearchVisible(false);
          }}
        />
      ) : (
        <SearchButton onClick={() => setSearchVisible(true)} isActive={false} />
      )} */}

      <div className="flex-1 bg-white">
        {filteredFlights.length > 0 ? (
          <FlightList flights={filteredFlights} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            <p>No flights found.</p>
            {searchQuery && <p>Try adjusting your search criteria.</p>}
          </div>
        )}
      </div>

      {/* <FilterOverlay
        isOpen={filterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={setActiveFilters}
      /> */}
    </div>
  );
}
