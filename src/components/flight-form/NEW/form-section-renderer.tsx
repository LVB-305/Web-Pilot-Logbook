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
  errors?: Record<string, string>;
}

export function FormSectionRenderer({
  section,
  flightData,
  updateFlightData,
  openDialog,
  mockData,
  errors = {},
}: FormSectionRendererProps) {
  // Check if this section should be shown for the current duty type
  if (section.showFor && !section.showFor.includes(flightData.dutyType)) {
    return null;
  }

  // Check if this section has any errors
  const sectionHasErrors = Object.keys(errors).some((key) => {
    // Check if the error key starts with the section id
    // or if it's a direct field in this section
    return (
      key.startsWith(section.id) ||
      section.fields.some((field) => key === field.id)
    );
  });
  return (
    <FormSectionComponent
      title={section.title}
      collapsible={section.collapsible}
      defaultOpen={section.defaultOpen}
      className="mb-6"
    >
      {section.fields.map((field) => {
        // Skip fields that shouldn't be shown for the current duty type
        if (field.showFor && !field.showFor.includes(flightData.dutyType)) {
          return null;
        }

        return (
          <FormFieldRenderer
            key={field.id}
            field={field}
            flightData={flightData}
            updateFlightData={updateFlightData}
            openDialog={openDialog}
            mockData={mockData}
          />
        );
      })}
    </FormSectionComponent>
  );
}
