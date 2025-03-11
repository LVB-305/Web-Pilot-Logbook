"use client";

import { useState } from "react";
import { FormField as FormFieldComponent } from "@/components/flight-form/form-field";
import { Input } from "@/components/ui/input";
import { TimeInput } from "@/components/flight-form/time-input";
import { NumberInput } from "@/components/flight-form/number-input";
import { DecimalNumberInput } from "@/components/flight-form/decimal-number-input";
import { ToggleSwitch } from "@/components/toggle-switch";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  PenTool,
  ChevronDown,
  Plane,
  PlaneTakeoff,
  PlaneLanding,
  User,
  Plus,
  Edit,
} from "lucide-react";
import type { FormField, SelectOption } from "@/lib/form-config";
import type { FlightData } from "@/schemas/NEW/flights";

interface FormFieldRendererProps {
  field: FormField;
  flightData: FlightData;
  updateFlightData: (path: string, value: any) => void;
  openDialog: (dialogType: string, data?: any) => void;
  mockData?: {
    registrations?: SelectOption[];
    airports?: SelectOption[];
    crewMembers?: SelectOption[];
    approaches?: Array<{ id: string; label: string }>;
  };
}

export function FormFieldRenderer({
  field,
  flightData,
  updateFlightData,
  openDialog,
  mockData = {},
}: FormFieldRendererProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    flightData.date ? new Date(flightData.date) : undefined
  );

  const getDisplayText = (
    items: Array<{ value: string; label: string }> = [],
    value?: string
  ) => {
    return value
      ? items.find((item) => item.value === value)?.label
      : undefined;
  };

  // Helper function to get nested value from flightData
  const getNestedValue = (path: string) => {
    const parts = path.split(".");
    let value: any = flightData;

    for (const part of parts) {
      if (value === undefined || value === null) return undefined;
      value = value[part];
    }

    return value;
  };

  switch (field.type) {
    case "text":
      return (
        <FormFieldComponent
          label={field.title}
          inputField={
            <Input
              value={getNestedValue(field.id) || ""}
              onChange={(e) => updateFlightData(field.id, e.target.value)}
              placeholder={field.placeholder}
              className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0"
            />
          }
        />
      );

    case "date":
      return (
        <FormFieldComponent
          label={field.title}
          inputField={
            <DatePicker
              date={selectedDate}
              onDateChange={(date) => {
                setSelectedDate(date);
                if (date) {
                  updateFlightData(field.id, date.toISOString().split("T")[0]);
                }
              }}
            />
          }
        />
      );

    case "select":
      let value = "";
      let displayValue = "";
      let icon = <ChevronDown className="h-5 w-5 text-blue-600" />;
      let options: SelectOption[] = [];

      // Determine which select field this is and set appropriate values
      if (field.id === "registration") {
        value = flightData.registration;
        displayValue =
          getDisplayText(mockData.registrations, value) ??
          field.placeholder ??
          "Select...";
        icon = <Plane className="h-5 w-5 text-blue-600" />;
        options = mockData.registrations || [];
      } else if (field.id === "departure") {
        value = flightData.departure;
        displayValue =
          getDisplayText(mockData.airports, value) ??
          field.placeholder ??
          "Select...";
        icon = <PlaneTakeoff className="h-5 w-5 text-blue-600" />;
        options = mockData.airports || [];
      } else if (field.id === "destination") {
        value = flightData.destination;
        displayValue =
          getDisplayText(mockData.airports, value) ??
          field.placeholder ??
          "Select...";
        icon = <PlaneLanding className="h-5 w-5 text-blue-600" />;
        options = mockData.airports || [];
      } else if (field.id === "pic") {
        value = flightData.pic;
        displayValue =
          getDisplayText(mockData.crewMembers, value) ??
          field.placeholder ??
          "Select...";
        icon = <User className="h-5 w-5 text-blue-600" />;
        options = mockData.crewMembers || [];
      } else if (field.id === "dutyType") {
        value = flightData.dutyType;
        displayValue = value || field.placeholder || "Select...";
      }

      return (
        <FormFieldComponent
          label={field.title}
          value={displayValue}
          icon={icon}
          onClick={() => openDialog(field.id, { options })}
          className="cursor-pointer"
        />
      );

    case "toggle":
      let checked = false;

      if (field.id === "pilotFlying") {
        checked = flightData.isPilotFlying;
      } else if (field.id === "outOfBase") {
        checked = flightData.isOutOfBase;
      }

      return (
        <div className="px-4 py-3 flex justify-between items-center">
          <span className="text-gray-700">{field.title}</span>
          <ToggleSwitch
            checked={checked}
            onCheckedChange={(value) => {
              if (field.id === "pilotFlying") {
                updateFlightData("isPilotFlying", value);
              } else if (field.id === "outOfBase") {
                updateFlightData("isOutOfBase", value);
              }
            }}
          />
        </div>
      );

    case "number":
      let numberValue = 0;

      if (field.id === "autolands") {
        numberValue = flightData.autolands;
      } else if (field.id === "goArounds") {
        numberValue = flightData.goArounds;
      }

      return (
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-gray-700">{field.title}</span>
          <NumberInput
            value={numberValue}
            onChange={(value) => updateFlightData(field.id, value)}
          />
        </div>
      );

    case "time":
      return (
        <div className="flex items-center gap-4 px-4 py-3">
          <div className="text-gray-700 min-w-32">{field.title}</div>
          <div className="flex-1">
            <Input
              value={getNestedValue(`durations.${field.id}`) || ""}
              onChange={(e) =>
                updateFlightData(`durations.${field.id}`, e.target.value)
              }
              placeholder={field.placeholder || "##:##"}
              className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0 w-full"
            />
          </div>
          <div className="ml-2">
            {field.id === "totalTime" ? (
              <Edit className="h-5 w-5 text-gray-400" />
            ) : (
              <Edit className="h-5 w-5 text-orange-300" />
            )}
          </div>
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-2 px-4 py-3">
          <label className="text-sm font-medium">{field.title}</label>
          <Textarea
            value={getNestedValue(`remarks.${field.id}`) || ""}
            onChange={(e) =>
              updateFlightData(`remarks.${field.id}`, e.target.value)
            }
            placeholder={field.placeholder}
            className="min-h-[100px] resize-none"
          />
        </div>
      );

    case "signature":
      return (
        <div className="p-4">
          {flightData.signature ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{flightData.signature.name}</p>
                  <p className="text-sm text-gray-500">
                    License: {flightData.signature.licenseNumber}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => openDialog("signature")}
                >
                  Change
                </Button>
              </div>
              <div className="border rounded-md p-2">
                <img
                  src={flightData.signature.data || "/placeholder.svg"}
                  alt="Signature"
                  className="max-h-20 w-auto mx-auto"
                />
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => openDialog("signature")}
            >
              <PenTool className="mr-2 h-4 w-4" />
              Add Signature
            </Button>
          )}
        </div>
      );

    case "approaches":
      return (
        <div className="divide-y">
          {flightData.approaches.map((approach) => (
            <div
              key={approach.id}
              className="px-4 py-3 flex items-center justify-between hover:bg-gray-50"
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() => openDialog("editApproach", approach)}
              >
                <span className="text-gray-700">
                  {mockData.approaches?.find((a) => a.id === approach.id)
                    ?.label || approach.id}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({approach.count})
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-red-500"
                onClick={() => {
                  const newApproaches = flightData.approaches.filter(
                    (a) => a.id !== approach.id
                  );
                  updateFlightData("approaches", newApproaches);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </Button>
            </div>
          ))}
          <div className="px-4 py-3">
            <Button
              variant="ghost"
              className="text-blue-600"
              onClick={() => openDialog("approaches")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add approach
            </Button>
          </div>
        </div>
      );

    case "takeoffsLandings":
      return (
        <div className="px-4 py-2 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div />
            <div className="text-center text-sm text-gray-500">Day</div>
            <div className="text-center text-sm text-gray-500">Night</div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-gray-700">Takeoffs</div>
            <div className="flex justify-center">
              <NumberInput
                value={flightData.dayTakeoffs}
                onChange={(value) => updateFlightData("dayTakeoffs", value)}
              />
            </div>
            <div className="flex justify-center">
              <NumberInput
                value={flightData.nightTakeoffs}
                onChange={(value) => updateFlightData("nightTakeoffs", value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <div className="text-gray-700">Landings</div>
            <div className="flex justify-center">
              <NumberInput
                value={flightData.dayLandings}
                onChange={(value) => updateFlightData("dayLandings", value)}
              />
            </div>
            <div className="flex justify-center">
              <NumberInput
                value={flightData.nightLandings}
                onChange={(value) => updateFlightData("nightLandings", value)}
              />
            </div>
          </div>
        </div>
      );

    case "timeRanges":
      return (
        <div className="px-6 py-4">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-24" /> {/* Spacer for label alignment */}
              <div className="flex items-center gap-4">
                <div className="w-16 text-center text-sm text-gray-500">
                  Start
                </div>
                <div className="w-16 text-center text-sm text-gray-500">
                  End
                </div>
                <div className="w-16 text-center text-sm text-gray-500">
                  Total
                </div>
              </div>
            </div>

            {Object.entries(flightData.times).map(([key, value]) => {
              if (key === "hobbs" || key === "tach") {
                const numericValue = value as { start: number; end: number };
                return (
                  <div key={key} className="flex items-center gap-4">
                    <div className="w-24 text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                    <div className="flex items-center gap-4">
                      <DecimalNumberInput
                        value={numericValue.start}
                        onChange={(newValue) =>
                          updateFlightData(`times.${key}.start`, newValue)
                        }
                        className="w-16"
                        placeholder="0.0"
                      />
                      <DecimalNumberInput
                        value={numericValue.end}
                        onChange={(newValue) =>
                          updateFlightData(`times.${key}.end`, newValue)
                        }
                        className="w-16"
                        placeholder="0.0"
                      />
                      <div className="w-16 text-center text-gray-600">
                        {(numericValue.end - numericValue.start).toFixed(1)}
                      </div>
                    </div>
                  </div>
                );
              }

              const timeValue = value as { start: string; end: string };
              return (
                <div key={key} className="flex items-center gap-4">
                  <div className="w-24 text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div className="flex items-center gap-4">
                    <TimeInput
                      value={timeValue.start}
                      onChange={(newValue) =>
                        updateFlightData(`times.${key}.start`, newValue)
                      }
                      className="w-16"
                    />
                    <TimeInput
                      value={timeValue.end}
                      onChange={(newValue) =>
                        updateFlightData(`times.${key}.end`, newValue)
                      }
                      className="w-16"
                    />
                    <div className="w-16 text-center text-gray-600">##:##</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    default:
      return (
        <div className="px-4 py-3">Unsupported field type: {field.type}</div>
      );
  }
}
