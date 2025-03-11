// Define the possible input types
export type InputType =
  | "text"
  | "date"
  | "select"
  | "toggle"
  | "number"
  | "time"
  | "decimalNumber"
  | "approaches"
  | "takeoffsLandings"
  | "timeRanges"
  | "timeDurations"
  | "textarea"
  | "signature";

// Define the structure for select options
export interface SelectOption {
  value: string;
  label: string;
}

// Define the base field structure
export interface FormField {
  id: string;
  title: string;
  type: InputType;
  placeholder?: string;
  options?: SelectOption[];
  required?: boolean;
}

// Define the structure for a form section
export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
  collapsible?: boolean;
  defaultOpen?: boolean;
}

// Define the flight form configuration
export const flightFormConfig: FormSection[] = [
  {
    id: "flightData",
    title: "Flight data",
    collapsible: true,
    defaultOpen: true,
    fields: [
      {
        id: "date",
        title: "Date",
        type: "date",
        required: true,
      },
      {
        id: "dutyType",
        title: "Duty type",
        type: "select",
        options: [
          { value: "Flight", label: "Flight" },
          { value: "Simulator", label: "Simulator" },
          { value: "Training", label: "Training" },
        ],
        required: true,
      },
      {
        id: "flightNumber",
        title: "Flight #",
        type: "text",
        placeholder: "Enter flight number",
      },
      {
        id: "registration",
        title: "Registration",
        type: "select",
        placeholder: "Select registration",
      },
      {
        id: "departure",
        title: "Departure",
        type: "select",
        placeholder: "Add departure",
      },
      {
        id: "destination",
        title: "Destination",
        type: "select",
        placeholder: "Add destination",
      },
    ],
  },
  {
    id: "takeoffsLandings",
    title: "Takeoffs / Landings",
    collapsible: true,
    defaultOpen: true,
    fields: [
      {
        id: "pilotFlying",
        title: "Pilot Flying",
        type: "toggle",
      },
      {
        id: "takeoffsLandings",
        title: "Takeoffs and Landings",
        type: "takeoffsLandings",
      },
    ],
  },
  {
    id: "crewMembers",
    title: "Crew members",
    collapsible: true,
    defaultOpen: true,
    fields: [
      {
        id: "pic",
        title: "PIC",
        type: "select",
        placeholder: "Select PIC...",
      },
    ],
  },
  {
    id: "approaches",
    title: "Approaches",
    collapsible: true,
    defaultOpen: true,
    fields: [
      {
        id: "approaches",
        title: "Approaches",
        type: "approaches",
      },
    ],
  },
  {
    id: "otherItems",
    title: "Other Items",
    collapsible: true,
    defaultOpen: true,
    fields: [
      {
        id: "autolands",
        title: "Autolands",
        type: "number",
      },
      {
        id: "dailyAllowance",
        title: "Daily Allowance",
        type: "text",
        placeholder: "Enter amount",
      },
      {
        id: "flightPay",
        title: "Flight Pay",
        type: "text",
        placeholder: "Enter amount",
      },
      {
        id: "fuel",
        title: "Fuel",
        type: "text",
        placeholder: "Enter amount",
      },
      {
        id: "goArounds",
        title: "Go Arounds",
        type: "number",
      },
      {
        id: "outOfBase",
        title: "Out of Base",
        type: "toggle",
      },
    ],
  },
  {
    id: "times",
    title: "Times",
    collapsible: true,
    defaultOpen: true,
    fields: [
      {
        id: "timeRanges",
        title: "Time Ranges",
        type: "timeRanges",
      },
    ],
  },
  {
    id: "timeDurations",
    title: "Time Durations",
    collapsible: true,
    defaultOpen: true,
    fields: [
      {
        id: "totalTime",
        title: "Total Time",
        type: "time",
        placeholder: "##:##",
      },
      {
        id: "actualInstrument",
        title: "Actual Instrument",
        type: "time",
        placeholder: "##:##",
      },
      {
        id: "dualGiven",
        title: "Dual Given",
        type: "time",
        placeholder: "##:##",
      },
      {
        id: "dualReceived",
        title: "Dual Received",
        type: "time",
        placeholder: "##:##",
      },
    ],
  },
  {
    id: "remarks",
    title: "Remarks",
    collapsible: true,
    defaultOpen: true,
    fields: [
      {
        id: "general",
        title: "General Remarks",
        type: "textarea",
        placeholder: "Enter general remarks",
      },
      {
        id: "training",
        title: "Training Comments",
        type: "textarea",
        placeholder: "Enter training comments, mission numbers, etc.",
      },
    ],
  },
  {
    id: "signature",
    title: "Signature",
    collapsible: true,
    defaultOpen: true,
    fields: [
      {
        id: "signature",
        title: "Signature",
        type: "signature",
      },
    ],
  },
];
