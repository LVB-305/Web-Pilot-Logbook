"use client";

import { format } from "date-fns";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Suspense } from "react";

interface Flight {
  id: string;
  date: string;
  departure: string;
  arrival: string;
  startTime: string;
  endTime: string;
  registration: string;
  aircraftType: string;
}

interface FlightGrouping {
  month: string;
  flights: Flight[];
}

interface FlightListProps {
  flights: Flight[];
  loading?: boolean;
}

function groupFlightsByMonth(flights: Flight[]): FlightGrouping[] {
  const groups: Record<string, Flight[]> = {};

  flights.forEach((flight) => {
    const date = new Date(flight.date);
    const monthKey = format(date, "MMMM yyyy");

    if (!groups[monthKey]) {
      groups[monthKey] = [];
    }
    groups[monthKey].push(flight);
  });

  return Object.entries(groups).map(([month, flights]) => ({
    month,
    flights: flights.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  }));
}

// Calculate flight duration in hours and minutes
function calculateFlightDuration(startTime: string, endTime: string): string {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  let durationMinutes =
    endHours * 60 + endMinutes - (startHours * 60 + startMinutes);

  // Handle flights that cross midnight
  if (durationMinutes < 0) {
    durationMinutes += 24 * 60;
  }

  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return `${hours}h ${minutes}m`;
}

export function FlightList({ flights, loading = false }: FlightListProps) {
  const router = useRouter();
  const groupedFlights = groupFlightsByMonth(flights);

  return (
    <div className="divide-y divide-gray-100">
      {loading ? (
        Array.from({ length: 2 }).map((_, monthIndex) => (
          <div
            key={`skeleton-month-${monthIndex}`}
            className="space-y-2 space-x-2"
          >
            {/* Month header skeleton */}
            <div className="px-6 pt-5 pb-2">
              <Skeleton className="h-5 w-24" />
            </div>

            <div className="divide-y divide-gray-100">
              {/* Generate 2-3 flight item skeletons per month */}
              {Array.from({ length: monthIndex === 1 ? 2 : 3 }).map(
                (_, flightIndex) => (
                  <div
                    key={`skeleton-flight-${monthIndex}-${flightIndex}`}
                    className="flex px-4 py-3 relative text-left"
                  >
                    {/* Blue vertical line */}
                    <div className="absolute left-0 top-2 bottom-2 w-1.5 rounded-sm bg-blue-600" />

                    <div className="flex justify-between w-full">
                      {/* Left section: Date, Route, Time */}
                      <div className="pl-3 space-y-2">
                        {/* Date */}
                        <Skeleton className="h-4 w-24" />

                        {/* Route */}
                        <Skeleton className="h-6 w-36" />

                        {/* Time */}
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>

                    {/* Duration and registration */}
                    <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-end">
                      <Skeleton className="h-4 w-16 mb-1" />
                      <Skeleton className="h-4 w-28" />
                    </div>

                    {/* Chevron */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ))
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          {groupedFlights.map(({ month, flights }) => (
            <div key={month} className="space-y-2 space-x-2">
              <h2 className="px-6 pt-5 pb-2 text-sm text-gray-500 font-normal">
                {month}
              </h2>
              <div className="divide-y divide-gray-100">
                {flights.map((flight) => (
                  <button
                    key={flight.id}
                    className="w-full group hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    onClick={() => router.push(`/flights/${flight.id}`)}
                  >
                    <div className="flex px-4 py-3 relative text-left">
                      {/* Blue vertical line */}
                      <div className="absolute left-0 top-2 bottom-2 w-1.5 rounded-sm bg-blue-600" />

                      {/* Main content with left alignment */}
                      <div className="flex justify-between w-full">
                        {/* Left section: Date, Route, Time - all aligned to the same left position */}
                        <div className="pl-3">
                          {/* Date */}
                          <div className="text-gray-500 text-sm">
                            {format(new Date(flight.date), "dd MMM yyyy")}
                          </div>

                          {/* Route */}
                          <div className="text-black font-bold text-base mt-1">
                            {flight.departure}{" "}
                            <span className="inline-block transform translate-y-[-1px] font-extrabold">
                              →
                            </span>{" "}
                            {flight.arrival}
                          </div>

                          {/* Time */}
                          <div className="text-sm text-gray-900 mt-1">
                            {flight.startTime}{" "}
                            <span className="inline-block transform translate-y-[-1px]">
                              -
                            </span>{" "}
                            {flight.endTime}
                          </div>
                        </div>
                      </div>

                      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-end">
                        {/* Right section: Flight time and Registration */}
                        <div className="text-sm text-gray-900">
                          {calculateFlightDuration(
                            flight.startTime,
                            flight.endTime
                          )}
                        </div>

                        {/* Registration (moved below flight time) */}
                        <div className="flex items-center text-blue-600 mt-1">
                          <span className="text-sm font-medium">
                            {flight.registration} ({flight.aircraftType})
                          </span>
                          {/* <Plane className="h-3.5 w-3.5 ml-1 transform" /> */}
                        </div>
                      </div>

                      {/* Chevron */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </Suspense>
      )}
    </div>
  );
}
