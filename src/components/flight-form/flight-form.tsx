"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  ChevronDown,
  Clock,
  PenTool,
  Plane,
  PlaneLanding,
  PlaneTakeoff,
  Plus,
  Trash2,
  User,
  Wand,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormSection } from "./form-section";
import { FormField } from "./form-field";
import { Input } from "@/components/ui/input";
import { ToggleSwitch } from "@/components/toggle-switch";
import { NumberInput } from "./number-input";
import { TimeInput } from "./time-input";
import { SelectionDialog } from "./selection-dialog";
import { ApproachDialog } from "./approach-dialog";
import { ApproachEditDialog } from "./approach-edit-dialog";
import { SectionFieldToggler } from "./section-field-toggler";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SignatureDialog } from "./signature-dialog";
import { DecimalNumberInput } from "./decimal-number-input";
import { PageHeader } from "../page-header";

// TEMPORARY DATA MOCK
const mockCrewMembers = [
  { value: "cm1", label: "Crew Member 1" },
  { value: "cm2", label: "Crew Member 2" },
  { value: "cm3", label: "Crew Member 3" },
];

const mockRegistrations = [
  { value: "reg1", label: "Registration 1" },
  { value: "reg2", label: "Registration 2" },
  { value: "reg3", label: "Registration 3" },
];

const mockAirports = [
  { value: "apt1", label: "Airport 1" },
  { value: "apt2", label: "Airport 2" },
  { value: "apt3", label: "Airport 3" },
];

const mockApproaches = [
  { id: "ils", label: "ILS" },
  { id: "vor", label: "VOR" },
  { id: "gps", label: "GPS" },
];

// MOVE THIS TO /schemes/flight.ts
interface TimeRange {
  start: string;
  end: string;
}

interface NumberRange {
  start: number;
  end: number;
}

interface FlightData {
  date: string;
  dutyType: string;
  flightNumber: string;
  registration: string;
  departure: string;
  arrival: string;
  isPilotFlying: boolean;
  dayTakeoffs: number;
  nightTakeoffs: number;
  dayLandings: number;
  nightLandings: number;
  // autolands: number;
  // goArounds: number;
  // isOutOfBase: boolean;
  pic: string;
  approaches: Array<{ id: string; count: number }>;
  times: {
    scheduled: TimeRange;
    duty: TimeRange;
    block: TimeRange;
    flight: TimeRange;
    hobbs: NumberRange;
  };
  durations: {
    totalTime: string;
    totalAirTime: string;
    multiPilotTime: string;
    nightTime: string;
    ifr: string;
    crossCountryTime: string;
    picTime: string;
    dualTime: string;
    copilotTime: string;
    instructorTime: string;
  };
  // otherItems: {
  //   dailyAllowance: string;
  //   flightPay: string;
  //   fuel: string;
  // };
  remarks: {
    remark: string;
    training: string;
  };
  signature: {
    date: string;
    name: string;
    licenseNumber: string;
    data?: string;
  } | null;
}

interface FlightFormProps {
  mode: "new" | "edit";
  flightId?: string;
  initialData?: FlightData;
}

const defaultFlightData: FlightData = {
  date: new Date().toISOString().split("T")[0],
  dutyType: "Flight",
  flightNumber: "",
  registration: "",
  departure: "",
  arrival: "",
  isPilotFlying: false,
  dayTakeoffs: 0,
  nightTakeoffs: 0,
  dayLandings: 0,
  nightLandings: 0,
  // autolands: 0,
  // goArounds: 0,
  // isOutOfBase: false,
  pic: "",
  approaches: [],
  times: {
    scheduled: { start: "", end: "" },
    duty: { start: "", end: "" },
    block: { start: "", end: "" },
    flight: { start: "", end: "" },
    hobbs: { start: 0, end: 0 },
  },
  durations: {
    totalTime: "",
    totalAirTime: "",
    multiPilotTime: "",
    nightTime: "",
    ifr: "",
    crossCountryTime: "",
    picTime: "",
    dualTime: "",
    copilotTime: "",
    instructorTime: "",
  },
  // otherItems: {
  //   dailyAllowance: "",
  //   flightPay: "",
  //   fuel: "",
  // },
  remarks: {
    remark: "",
    training: "",
  },
  signature: null,
};

export default function FlightForm({
  mode,
  flightId,
  initialData = defaultFlightData,
}: FlightFormProps) {
  const router = useRouter();

  // State initialization with initial data
  const [registration, setRegistration] = useState(initialData.registration);
  const [departure, setDeparture] = useState(initialData.departure);
  const [arrival, setArrival] = useState(initialData.arrival);
  const [flightNumber, setFlightNumber] = useState(initialData.flightNumber);

  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [departureDialogOpen, setDepartureDialogOpen] = useState(false);
  const [arrivalDialogOpen, setArrivalDialogOpen] = useState(false);

  const [isPilotFlying, setIsPilotFlying] = useState(initialData.isPilotFlying);
  const [dayTakeoffs, setDayTakeoffs] = useState(initialData.dayTakeoffs);
  const [nightTakeoffs, setNightTakeoffs] = useState(initialData.nightTakeoffs);
  const [dayLandings, setDayLandings] = useState(initialData.dayLandings);
  const [nightLandings, setNightLandings] = useState(initialData.nightLandings);
  // const [autolands, setAutolands] = useState(initialData.autolands);
  // const [goArounds, setGoArounds] = useState(initialData.goArounds);
  // const [isOutOfBase, setIsOutOfBase] = useState(initialData.isOutOfBase);
  const [picDialogOpen, setPicDialogOpen] = useState(false);
  const [selectedPic, setSelectedPic] = useState(initialData.pic);

  const [editingSection, setEditingSection] = useState<string | null>(null);

  const [approaches, setApproaches] = useState(initialData.approaches);
  const [approachDialogOpen, setApproachDialogOpen] = useState(false);
  const [editingApproach, setEditingApproach] = useState<
    (typeof approaches)[0] | null
  >(null);

  const [times, setTimes] = useState(initialData.times);
  const [durations, setDurations] = useState(initialData.durations);
  // const [otherItems, setOtherItems] = useState(initialData.otherItems);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialData.date ? new Date(initialData.date) : undefined
  );

  const [remarks, setRemarks] = useState(initialData.remarks);
  const [signature, setSignature] = useState(initialData.signature);
  const [signatureDialogOpen, setSignatureDialogOpen] = useState(false);

  // Keep the same visibleFields state and helper functions
  const [visibleFields, setVisibleFields] = useState({
    flightData: [
      "date",
      "dutyType",
      "flightNumber",
      "registration",
      "departure",
      "arrival",
    ],
    takeoffsLandings: [
      "pilotFlying",
      "dayTakeoffs",
      "nightTakeoffs",
      "dayLandings",
      "nightLandings",
    ],
    crewMembers: ["pic"],
    approaches: ["addApproach"],
    // otherItems: [
    //   "autolands",
    //   "dailyAllowance",
    //   "flightPay",
    //   "fuel",
    //   "goArounds",
    //   "outOfBase",
    // ],
    times: ["scheduled", "duty", "block", "flight"],
    timeDurations: [
      "totalTime",
      "totalAirTime",
      "multiPilotTime",
      "nightTime",
      "ifr",
      "crossCountryTime",
      "picTime",
      "dualTime",
      "copilotTime",
      "instructorTime",
    ],
    remarks: ["remark", "training"],
    signature: ["signature"],
  });

  // Field definitions remain the same
  const sectionFields = {
    flightData: [
      { id: "date", label: "Date" },
      { id: "dutyType", label: "Duty Type" },
      { id: "flightNumber", label: "Flight Number" },
      { id: "registration", label: "Registration" },
      { id: "departure", label: "Departure" },
      { id: "arrival", label: "Arrival" },
    ],
    takeoffsLandings: [
      { id: "pilotFlying", label: "Pilot Flying" },
      { id: "dayTakeoffs", label: "Day Takeoffs" },
      { id: "nightTakeoffs", label: "Night Takeoffs" },
      { id: "dayLandings", label: "Day Landings" },
      { id: "nightLandings", label: "Night Landings" },
    ],
    crewMembers: [{ id: "pic", label: "PIC" }],
    approaches: [{ id: "addApproach", label: "Add Approach" }],
    // otherItems: [
    //   { id: "autolands", label: "Autolands" },
    //   { id: "dailyAllowance", label: "Daily Allowance" },
    //   { id: "flightPay", label: "Flight Pay" },
    //   { id: "fuel", label: "Fuel" },
    //   { id: "goArounds", label: "Go Arounds" },
    //   { id: "outOfBase", label: "Out of Base" },
    // ],
    times: [
      { id: "scheduled", label: "Scheduled" },
      { id: "duty", label: "Duty" },
      { id: "block", label: "Block" },
      { id: "flight", label: "Flight" },
      { id: "hobbs", label: "Hobbs" },
    ],
    timeDurations: [
      { id: "totalTime", label: "Total Time" },
      { id: "totalAirTime", label: "Total Air Time" },
      { id: "multiPilotTime", label: "Multi-Pilot Time" },
      { id: "nightTime", label: "Night" },
      { id: "ifr", label: "IFR" },
      { id: "crossCountryTime", label: "Cross Country Time" },
      { id: "picTime", label: "PIC" },
      { id: "dualTime", label: "Dual" },
      { id: "copilotTime", label: "Co-pilot" },
      { id: "instructorTime", label: "Instructor" },
    ],
    remarks: [
      { id: "remark", label: "Remarks" },
      { id: "training", label: "Training Comments" },
    ],
    signature: [{ id: "signature", label: "Signature" }],
  };

  const updateVisibleFields = (section: string, fields: string[]) => {
    setVisibleFields((prev) => ({
      ...prev,
      [section]: fields,
    }));
  };

  const isFieldVisible = (section: string, fieldId: string) => {
    return visibleFields[section as keyof typeof visibleFields]?.includes(
      fieldId
    );
  };

  const getDisplayText = (
    items: Array<{ value: string; label: string }>,
    value?: string
  ) => {
    return value
      ? items.find((item) => item.value === value)?.label
      : undefined;
  };

  const handleTimeChange = (
    section: keyof typeof times,
    field: "start" | "end",
    value: string | number
  ) => {
    setTimes((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleDurationChange = (
    field: keyof typeof durations,
    value: string
  ) => {
    setDurations((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Helper to get current form data
  const getCurrentFormData = (): FlightData => ({
    date: selectedDate?.toISOString().split("T")[0] || "",
    dutyType: initialData.dutyType,
    flightNumber,
    registration,
    departure,
    arrival,
    isPilotFlying,
    dayTakeoffs,
    nightTakeoffs,
    dayLandings,
    nightLandings,
    // autolands,
    // goArounds,
    // isOutOfBase,
    pic: selectedPic,
    approaches,
    times,
    durations,
    // otherItems,
    remarks,
    signature,
  });

  const handleSubmit = async () => {
    const formData = {
      flightId,
      mode,
      ...getCurrentFormData(),
      visibleFields,
    };

    console.log("Submitting flight data:", formData);

    try {
      // TODO: Implement actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      console.log("Flight data submitted successfully");
      router.push("/app/logbook");
    } catch (error) {
      console.error("Error submitting flight data:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <PageHeader
        title={mode === "new" ? "New Flight" : "Edit Flight"}
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

      <div className="flex-1 overflow-auto pb-6">
        <FormSection title="Flight data" collapsible={false} defaultOpen={true}>
          {isFieldVisible("flightData", "date") && (
            <FormField
              label="Date"
              inputField={
                <DatePicker
                  date={selectedDate}
                  onDateChange={setSelectedDate}
                />
              }
            />
          )}

          {isFieldVisible("flightData", "dutyType") && (
            <FormField
              label="Duty type"
              value={initialData.dutyType}
              icon={<ChevronDown className="h-5 w-5 text-blue-600" />}
            />
          )}

          {isFieldVisible("flightData", "flightNumber") && (
            <FormField
              label="Flight Number"
              value={flightNumber}
              inputField={
                <Input
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0 py-0 h-7"
                />
              }
            />
          )}

          {isFieldVisible("flightData", "registration") && (
            <FormField
              label="Registration"
              value={
                getDisplayText(mockRegistrations, registration) ??
                "Select registration"
              }
              icon={<Plane className="h-5 w-5 text-blue-600" />}
              onClick={() => setRegistrationDialogOpen(true)}
              className="cursor-pointer"
            />
          )}

          {isFieldVisible("flightData", "departure") && (
            <FormField
              label="Departure"
              value={getDisplayText(mockAirports, departure) ?? "Add departure"}
              icon={<PlaneTakeoff className="h-5 w-5 text-blue-600" />}
              onClick={() => setDepartureDialogOpen(true)}
              className="cursor-pointer"
            />
          )}

          {isFieldVisible("flightData", "arrival") && (
            <FormField
              label="Arrival"
              value={getDisplayText(mockAirports, arrival) ?? "Add arrival"}
              icon={<PlaneLanding className="h-5 w-5 text-blue-600" />}
              onClick={() => setArrivalDialogOpen(true)}
              className="cursor-pointer"
            />
          )}
        </FormSection>

        {/* Crew Members Section */}
        <FormSection
          title="Crew members"
          collapsible={true}
          defaultOpen={true}
          //  ADD + to add crew
        >
          {isFieldVisible("crewMembers", "pic") && (
            <FormField
              label="PIC"
              value={
                selectedPic
                  ? mockCrewMembers.find((cm) => cm.value === selectedPic)
                      ?.label
                  : "Select PIC"
              }
              icon={<User className="h-5 w-5 text-blue-600" />}
              onClick={() => setPicDialogOpen(true)}
              className="cursor-pointer"
            />
          )}
        </FormSection>

        {/* Takeoffs / Landings Section */}
        <FormSection
          title="Takeoffs / Landings"
          collapsible={true}
          defaultOpen={true}
          onEditFields={() => setEditingSection("takeoffsLandings")}
        >
          {isFieldVisible("takeoffsLandings", "pilotFlying") && (
            <div className="px-4 py-3 flex justify-end">
              <ToggleSwitch
                checked={isPilotFlying}
                onCheckedChange={setIsPilotFlying}
                label="Pilot Flying"
              />
            </div>
          )}

          <div className="px-4 py-2 space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div />
              <div className="text-center text-sm text-gray-500">Day</div>
              <div className="text-center text-sm text-gray-500">Night</div>
            </div>

            {isFieldVisible("takeoffsLandings", "dayTakeoffs") &&
              isFieldVisible("takeoffsLandings", "nightTakeoffs") && (
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-gray-700">Takeoffs</div>
                  <div className="flex justify-center">
                    <NumberInput
                      value={dayTakeoffs}
                      onChange={setDayTakeoffs}
                    />
                  </div>
                  <div className="flex justify-center">
                    <NumberInput
                      value={nightTakeoffs}
                      onChange={setNightTakeoffs}
                    />
                  </div>
                </div>
              )}

            {isFieldVisible("takeoffsLandings", "dayLandings") &&
              isFieldVisible("takeoffsLandings", "nightLandings") && (
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-gray-700">Landings</div>
                  <div className="flex justify-center">
                    <NumberInput
                      value={dayLandings}
                      onChange={setDayLandings}
                    />
                  </div>
                  <div className="flex justify-center">
                    <NumberInput
                      value={nightLandings}
                      onChange={setNightLandings}
                    />
                  </div>
                </div>
              )}
          </div>
        </FormSection>

        {/* Approaches Section */}
        <FormSection title="Approaches" collapsible={true} defaultOpen={true}>
          <div className="divide-y">
            {approaches.map((approach) => (
              <div
                key={approach.id}
                className="px-4 py-3 flex items-center justify-between hover:bg-gray-50"
              >
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => setEditingApproach(approach)}
                >
                  <span className="text-gray-700">
                    {mockApproaches.find((a) => a.id === approach.id)?.label}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    ({approach.count})
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    setApproaches(
                      approaches.filter((a) => a.id !== approach.id)
                    );
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="px-4 py-3">
              <Button
                variant="ghost"
                className="text-blue-600"
                onClick={() => setApproachDialogOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add approach
              </Button>
            </div>
          </div>
        </FormSection>

        {/* Other Items Section */}
        {/* <FormSection
          title="Other Items"
          collapsible={true}
          defaultOpen={true}
          showEditFields
          onEditFields={() => setEditingSection("otherItems")}
        >
          <div className="space-y-4 p-4">
            {isFieldVisible("otherItems", "autolands") && (
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Autolands</span>
                <NumberInput value={autolands} onChange={setAutolands} />
              </div>
            )}

            {isFieldVisible("otherItems", "dailyAllowance") && (
              <div className="space-y-1">
                <span className="text-gray-700">Daily Allowance</span>
                <Input
                  value={otherItems.dailyAllowance}
                  onChange={(e) =>
                    setOtherItems((prev) => ({
                      ...prev,
                      dailyAllowance: e.target.value,
                    }))
                  }
                  placeholder="Enter amount"
                  className="border-none rounded-none focus-visible:ring-0 px-0"
                />
                <Separator />
              </div>
            )}

            {isFieldVisible("otherItems", "flightPay") && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Flight Pay</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Settings className="h-4 w-4 text-orange-300" />
                  </Button>
                </div>
                <Input
                  value={otherItems.flightPay}
                  onChange={(e) =>
                    setOtherItems((prev) => ({
                      ...prev,
                      flightPay: e.target.value,
                    }))
                  }
                  placeholder="Enter amount"
                  className="border-none rounded-none focus-visible:ring-0 px-0"
                />
                <Separator />
              </div>
            )}

            {isFieldVisible("otherItems", "fuel") && (
              <div className="space-y-1">
                <span className="text-gray-700">Fuel</span>
                <Input
                  value={otherItems.fuel}
                  onChange={(e) =>
                    setOtherItems((prev) => ({ ...prev, fuel: e.target.value }))
                  }
                  placeholder="Enter amount"
                  className="border-none rounded-none focus-visible:ring-0 px-0"
                />
                <Separator />
              </div>
            )}

            {isFieldVisible("otherItems", "goArounds") && (
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Go Arounds</span>
                  <NumberInput value={goArounds} onChange={setGoArounds} />
                </div>
                <Separator />
              </div>
            )}

            {isFieldVisible("otherItems", "outOfBase") && (
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Out of Base</span>
                <ToggleSwitch
                  checked={isOutOfBase}
                  onCheckedChange={setIsOutOfBase}
                />
              </div>
            )}
          </div>
        </FormSection> */}

        {/* Times Section */}
        <FormSection title="Times" collapsible={true} defaultOpen={true}>
          <div className="space-y-6 px-4 py-2">
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
            {Object.entries(times).map(([key, value]) => {
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
                          handleTimeChange(
                            key as keyof typeof times,
                            "start",
                            newValue
                          )
                        }
                        className="w-16"
                        placeholder="0.0"
                      />
                      <DecimalNumberInput
                        value={numericValue.end}
                        onChange={(newValue) =>
                          handleTimeChange(
                            key as keyof typeof times,
                            "end",
                            newValue
                          )
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
              return (
                <div key={key} className="flex items-center gap-4">
                  <div className="w-24 text-gray-700">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </div>
                  <div className="flex items-center gap-4">
                    <TimeInput
                      value={
                        typeof value.start === "number"
                          ? value.start.toString()
                          : value.start
                      }
                      onChange={(newValue) =>
                        handleTimeChange(
                          key as keyof typeof times,
                          "start",
                          newValue
                        )
                      }
                      className="w-16"
                    />
                    <TimeInput
                      value={
                        typeof value.end === "number"
                          ? value.end.toString()
                          : value.end
                      }
                      onChange={(newValue) =>
                        handleTimeChange(
                          key as keyof typeof times,
                          "end",
                          newValue
                        )
                      }
                      className="w-16"
                    />
                    <div className="w-16 text-center text-gray-600">
                      {/* {Number(value.end) - Number(value.start)} */}
                      ##:##
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FormSection>

        {/* Time Durations Section */}
        <FormSection
          title="Time Durations"
          collapsible={true}
          defaultOpen={true}
          showEditFields
          onEditFields={() => setEditingSection("timeDurations")}
        >
          <div className="space-y-6 px-4 py-2">
            {Object.entries(durations).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <div className="text-gray-700 min-w-32">
                  {key.split(/(?=[A-Z])/).join(" ")}
                </div>
                <div className="flex-1">
                  <TimeInput
                    value={value}
                    onChange={() =>
                      handleDurationChange(
                        key as keyof typeof durations,
                        value
                        // FIX DURATIONS AS TIME
                      )
                    }
                    className="border-b border-t-0 border-l-0 border-r-0 rounded-none focus-visible:ring-0 px-0 w-full"
                  />
                </div>
                <div className="ml-2">
                  {key === "totalTime" ? (
                    <Clock className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Wand className="h-5 w-5 text-orange-300" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </FormSection>

        <FormSection
          title="Remarks"
          collapsible={true}
          defaultOpen={true}
          showEditFields
          onEditFields={() => setEditingSection("remarks")}
        >
          <div className="space-y-4 p-4">
            {isFieldVisible("remarks", "remark") && (
              <div className="space-y-2">
                <Label htmlFor="general-remarks">Remarks</Label>
                <Textarea
                  id="general-remarks"
                  value={remarks.remark}
                  onChange={(e) =>
                    setRemarks((prev) => ({ ...prev, remark: e.target.value }))
                  }
                  placeholder="Enter remarks"
                  className="min-h-[100px] resize-none"
                />
              </div>
            )}
            {isFieldVisible("remarks", "training") && (
              <div className="space-y-2">
                <Label htmlFor="training-comments">Training Comments</Label>
                <Textarea
                  id="training-comments"
                  value={remarks.training}
                  onChange={(e) =>
                    setRemarks((prev) => ({
                      ...prev,
                      training: e.target.value,
                    }))
                  }
                  placeholder="Enter training comments, mission numbers, etc."
                  className="min-h-[100px] resize-none"
                />
              </div>
            )}
          </div>
        </FormSection>

        <FormSection
          title="Signature"
          collapsible={true}
          defaultOpen={true}
          showEditFields
          onEditFields={() => setEditingSection("signature")}
        >
          <div className="p-4">
            {isFieldVisible("signature", "signature") && (
              <div className="space-y-4">
                {signature ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{signature.name}</p>
                        <p className="text-sm text-gray-500">
                          License: {signature.licenseNumber}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setSignatureDialogOpen(true)}
                      >
                        Change
                      </Button>
                      <div className="border rounded-md p-2">
                        <Image
                          src={signature.data || "/placeholder.svg"}
                          alt="Signature"
                          width={200}
                          height={80}
                          className="h-20 w-auto mx-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setSignatureDialogOpen(true)}
                  >
                    <PenTool className="mr-2 h-4 w-4" />
                    Add Signature
                  </Button>
                )}
              </div>
            )}
          </div>
        </FormSection>

        {/* Selection Dialogs */}
        <SelectionDialog
          open={registrationDialogOpen}
          onOpenChange={setRegistrationDialogOpen}
          title="Select Aircraft"
          searchPlaceholder="Search registrations..."
          items={mockRegistrations}
          value={registration}
          onValueChange={setRegistration}
          emptyMessage="No aircraft found."
        />

        <SelectionDialog
          open={departureDialogOpen}
          onOpenChange={setDepartureDialogOpen}
          title="Select Departure Airport"
          searchPlaceholder="Search airports..."
          items={mockAirports}
          value={departure}
          onValueChange={setDeparture}
          emptyMessage="No airports found."
        />

        <SelectionDialog
          open={arrivalDialogOpen}
          onOpenChange={setArrivalDialogOpen}
          title="Select Arrival Airport"
          searchPlaceholder="Search airports..."
          items={mockAirports}
          value={arrival}
          onValueChange={setArrival}
          emptyMessage="No airports found."
        />

        <SelectionDialog
          open={picDialogOpen}
          onOpenChange={setPicDialogOpen}
          title="Select PIC"
          searchPlaceholder="Search crew members..."
          items={mockCrewMembers}
          value={selectedPic}
          onValueChange={setSelectedPic}
          emptyMessage="No crew members found."
        />

        <ApproachDialog
          open={approachDialogOpen}
          onOpenChange={setApproachDialogOpen}
          selectedApproaches={approaches.map((a) => a.id)}
          onSelect={(selected) => {
            const existingApproaches = approaches.filter((a) =>
              selected.includes(a.id)
            );
            const newApproaches = selected
              .filter((id) => !approaches.find((a) => a.id === id))
              .map((id) => ({ id, count: 1 }));
            setApproaches([...existingApproaches, ...newApproaches]);
          }}
        />

        {editingApproach && (
          <ApproachEditDialog
            open={!!editingApproach}
            onOpenChange={(open) => !open && setEditingApproach(null)}
            approachLabel={
              mockApproaches.find((a) => a.id === editingApproach.id)?.label ||
              ""
            }
            count={editingApproach.count}
            onUpdate={(count) => {
              setApproaches(
                approaches.map((a) =>
                  a.id === editingApproach.id ? { ...a, count } : a
                )
              );
              setEditingApproach(null);
            }}
            onDelete={() => {
              setApproaches(
                approaches.filter((a) => a.id !== editingApproach.id)
              );
              setEditingApproach(null);
            }}
          />
        )}

        {/* Section Field Togglers */}
        {Object.entries(sectionFields).map(([section, fields]) => (
          <SectionFieldToggler
            key={section}
            open={editingSection === section}
            onOpenChange={(open) => setEditingSection(open ? section : null)}
            title={section
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            fields={fields}
            visibleFields={visibleFields[section as keyof typeof visibleFields]}
            onVisibleFieldsChange={(fields) =>
              updateVisibleFields(section, fields)
            }
          />
        ))}

        <SignatureDialog
          open={signatureDialogOpen}
          onOpenChange={setSignatureDialogOpen}
          onSave={(data) =>
            setSignature({
              ...data,
              date: new Date().toISOString().split("T")[0],
            })
          }
          initialData={
            signature
              ? {
                  name: signature.name,
                  licenseNumber: signature.licenseNumber,
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
