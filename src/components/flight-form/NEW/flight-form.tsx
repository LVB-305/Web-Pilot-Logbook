"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SelectionDialog } from "./selection-dialog";
import { ApproachDialog } from "../approach-dialog";
import { ApproachEditDialog } from "../approach-edit-dialog";
import { SignatureDialog } from "../signature-dialog";
import { PageHeader } from "../../page-header";
import { flightFormConfig } from "@/lib/form-config";
import { defaultFlightData, FlightData } from "@/schemas/NEW/flights";
import { FormSectionRenderer } from "./form-section-renderer";

// MOCK DATA
const mockRegistrations = [
  { value: "N12345", label: "N12345 - Boeing 737-800" },
  { value: "N54321", label: "N54321 - Airbus A320" },
  { value: "G-ABCD", label: "G-ABCD - Boeing 777-300ER" },
  { value: "D-AIJK", label: "D-AIJK - Airbus A350-900" },
];

const mockAirports = [
  { value: "KJFK", label: "New York JFK (KJFK)" },
  { value: "KLAX", label: "Los Angeles (KLAX)" },
  { value: "EGLL", label: "London Heathrow (EGLL)" },
  { value: "EDDF", label: "Frankfurt (EDDF)" },
  { value: "RJTT", label: "Tokyo Haneda (RJTT)" },
];

const mockApproaches = [
  { id: "ils", label: "ILS Approach" },
  { id: "vor", label: "VOR Approach" },
  { id: "ndb", label: "NDB Approach" },
  { id: "rnav", label: "RNAV Approach" },
  { id: "visual", label: "Visual Approach" },
];

const mockCrewMembers = [
  { value: "cm1", label: "Crew Member 1" },
  { value: "cm2", label: "Crew Member 2" },
  { value: "cm3", label: "Crew Member 3" },
];

interface FlightFormProps {
  mode: "new" | "edit";
  flightId?: string;
  initialData?: FlightData;
}

export default function FlightForm({
  mode,
  flightId,
  initialData = defaultFlightData,
}: FlightFormProps) {
  const router = useRouter();

  // State for flight data
  const [flightData, setFlightData] = useState<FlightData>(initialData);

  // Dialog states
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [departureDialogOpen, setDepartureDialogOpen] = useState(false);
  const [destinationDialogOpen, setDestinationDialogOpen] = useState(false);
  const [picDialogOpen, setPicDialogOpen] = useState(false);
  const [approachDialogOpen, setApproachDialogOpen] = useState(false);
  const [editingApproach, setEditingApproach] = useState<
    (typeof flightData.approaches)[0] | null
  >(null);
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false);

  // Helper function to update nested flight data
  const updateFlightData = (path: string, value: any) => {
    setFlightData((prev) => {
      const newData = { ...prev };
      const parts = path.split(".");

      if (parts.length === 1) {
        // Direct property update
        (newData as any)[path] = value; // Type assertion to bypass strict typing
      } else {
        // Nested property update
        let current: any = newData;
        for (let i = 0; i < parts.length - 1; i++) {
          current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
      }

      return newData;
    });
  };

  // Handle dialog opening
  const openDialog = (dialogType: string, data?: any) => {
    switch (dialogType) {
      case "registration":
        setRegistrationDialogOpen(true);
        break;
      case "departure":
        setDepartureDialogOpen(true);
        break;
      case "destination":
        setDestinationDialogOpen(true);
        break;
      case "pic":
        setPicDialogOpen(true);
        break;
      case "approaches":
        setApproachDialogOpen(true);
        break;
      case "editApproach":
        setEditingApproach(data);
        break;
      case "signature":
        setSignatureDialogOpen(true);
        break;
      default:
        console.warn(`Unknown dialog type: ${dialogType}`);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    console.log("Submitting flight data:", flightData);

    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Flight data submitted successfully");
      router.push("/app/logbook");
    } catch (error) {
      console.error("Error submitting flight data:", error);
    }
  };

  // Mock data for the form
  const mockData = {
    registrations: mockRegistrations,
    airports: mockAirports,
    crewMembers: mockCrewMembers,
    approaches: mockApproaches,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <PageHeader
        title={mode === "new" ? "[DEV] New Flight" : "Edit Flight"}
        backHref="/app/logbook"
        showBackButton={true}
        actionButton={
          <Button
            variant="ghost"
            className="text-blue-600 font-medium"
            onClick={handleSubmit}
          >
            Save
          </Button>
        }
      />

      <div className="flex-1 overflow-auto py-4 px-4">
        {flightFormConfig.map((section) => (
          <FormSectionRenderer
            key={section.id}
            section={section}
            flightData={flightData}
            updateFlightData={updateFlightData}
            openDialog={openDialog}
            mockData={mockData} //TEMPORARY
          />
        ))}
      </div>

      {/* Selection Dialogs */}
      <SelectionDialog
        isOpen={registrationDialogOpen}
        onClose={() => setRegistrationDialogOpen(false)}
        title="Select Aircraft"
        searchPlaceholder="Search aircraft"
        items={mockRegistrations}
        value={flightData.registration}
        onValueChange={(value) => updateFlightData("registration", value)}
        emptyMessage="No aircraft found."
      />

      <SelectionDialog
        isOpen={departureDialogOpen}
        onClose={() => setDepartureDialogOpen(false)}
        title="Select Departure Airport"
        searchPlaceholder="Search airports"
        items={mockAirports}
        value={flightData.departure}
        onValueChange={(value) => updateFlightData("departure", value)}
        emptyMessage="No airports found."
      />

      <SelectionDialog
        isOpen={destinationDialogOpen}
        onClose={() => setDestinationDialogOpen(false)}
        title="Select Destination Airport"
        searchPlaceholder="Search airports"
        items={mockAirports}
        value={flightData.destination}
        onValueChange={(value) => updateFlightData("destination", value)}
        emptyMessage="No airports found."
      />

      <SelectionDialog
        isOpen={picDialogOpen}
        onClose={() => setPicDialogOpen(false)}
        title="Select PIC"
        searchPlaceholder="Search crew members"
        items={mockCrewMembers}
        value={flightData.pic}
        onValueChange={(value) => updateFlightData("pic", value)}
        emptyMessage="No crew members found."
      />

      <ApproachDialog
        open={approachDialogOpen}
        onOpenChange={setApproachDialogOpen}
        selectedApproaches={flightData.approaches.map((a) => a.id)}
        onSelect={(selected) => {
          const existingApproaches = flightData.approaches.filter((a) =>
            selected.includes(a.id)
          );
          const newApproaches = selected
            .filter((id) => !flightData.approaches.find((a) => a.id === id))
            .map((id) => ({ id, count: 1 }));
          updateFlightData("approaches", [
            ...existingApproaches,
            ...newApproaches,
          ]);
        }}
      />

      {editingApproach && (
        <ApproachEditDialog
          open={!!editingApproach}
          onOpenChange={(open) => !open && setEditingApproach(null)}
          approachLabel={
            mockApproaches.find((a) => a.id === editingApproach.id)?.label || ""
          }
          count={editingApproach.count}
          onUpdate={(count) => {
            const newApproaches = flightData.approaches.map((a) =>
              a.id === editingApproach.id ? { ...a, count } : a
            );
            updateFlightData("approaches", newApproaches);
            setEditingApproach(null);
          }}
          onDelete={() => {
            const newApproaches = flightData.approaches.filter(
              (a) => a.id !== editingApproach.id
            );
            updateFlightData("approaches", newApproaches);
            setEditingApproach(null);
          }}
        />
      )}

      <SignatureDialog
        open={signatureDialogOpen}
        onOpenChange={setSignatureDialogOpen}
        onSave={(data) => updateFlightData("signature", data)}
        initialData={
          flightData.signature
            ? {
                name: flightData.signature.name,
                licenseNumber: flightData.signature.licenseNumber,
              }
            : undefined
        }
      />
    </div>
  );
}
