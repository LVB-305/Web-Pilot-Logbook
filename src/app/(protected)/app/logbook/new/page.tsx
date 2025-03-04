import FlightForm from "@/components/flight-form/flight-form";

export default function NewFlightPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* <PageHeader title="New Flight" /> */}
      <div className="py-4">
        <FlightForm mode="new" />
      </div>
    </main>
  );
}
