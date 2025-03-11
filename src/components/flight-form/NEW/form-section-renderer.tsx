"use client";

import { FormSection as FormSectionComponent } from "@/components/flight-form/NEW/form-section";
import { FormFieldRenderer } from "@/components/flight-form/NEW/form-field-renderer";
import type { FormSection } from "@/lib/form-config";
import type { FlightData } from "@/schemas/NEW/flights";

interface FormSectionRendererProps {
  section: FormSection;
  flightData: FlightData;
  updateFlightData: (path: string, value: unknown) => void;
  openDialog: (dialogType: string, data?: Record<string, unknown>) => void;
  mockData?: Record<string, unknown>;
}

export function FormSectionRenderer({
  section,
  flightData,
  updateFlightData,
  openDialog,
  mockData,
}: FormSectionRendererProps) {
  return (
    <FormSectionComponent
      title={section.title}
      collapsible={section.collapsible}
      defaultOpen={section.defaultOpen}
      className="mb-6"
    >
      {section.fields.map((field) => (
        <FormFieldRenderer
          key={field.id}
          field={field}
          flightData={flightData}
          updateFlightData={updateFlightData}
          openDialog={openDialog}
          mockData={mockData}
        />
      ))}
    </FormSectionComponent>
  );
}
