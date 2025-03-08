import FlightForm from "@/components/flight-form/flight-form";

// Mock data for demonstration
const mockFlight = {
  date: "2025-03-01",
  dutyType: "Flight",
  flightNumber: "FL123",
  registration: "N12345",
  departure: "KJFK",
  arrival: "KLAX",
  isPilotFlying: true,
  dayTakeoffs: 1,
  nightTakeoffs: 0,
  dayLandings: 1,
  nightLandings: 0,
  autolands: 0,
  goArounds: 0,
  isOutOfBase: false,
  pic: "cm1",
  approaches: [
    { id: "ils", count: 1 },
    { id: "rnav", count: 2 },
  ],
  times: {
    scheduled: { start: "09:00", end: "15:00" },
    duty: { start: "08:00", end: "16:00" },
    block: { start: "09:15", end: "14:45" },
    flight: { start: "09:30", end: "14:30" },
  },
  durations: {
    totalTime: "05:00",
    totalAirTime: "01:30",
    multiPilotTime: "00:00",
    nightTime: "00:00",
    ifr: "00:00",
    crossCountryTime: "00:00",
    picTime: "00:00",
    dualTime: "00:00",
    copilotTime: "00:00",
    instructorTime: "00:00",
  },
  remarks: {
    remark: {},
    training: {},
  },
  signature: null,
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function FlightDetailsPage({ params }: PageProps) {
  return (
    <main className="min-h-screen bg-white">
      <FlightForm mode="edit" flightId={params.id} initialData={mockFlight} />
    </main>
  );
}
