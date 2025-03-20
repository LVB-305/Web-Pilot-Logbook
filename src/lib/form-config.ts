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
  | "signature"
  | "simulatorSession";

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
  showFor?: string[];
}

// Define the structure for a form section
export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
  collapsible?: boolean;
  defaultOpen?: boolean;
  showFor?: string[];
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
        ],
        required: true,
      },
      // {
      //   id: "flightNumber",
      //   title: "Flight #",
      //   type: "text",
      //   placeholder: "Enter flight number",
      // },
      {
        id: "registration",
        title: "Registration",
        type: "select",
        placeholder: "",
        showFor: ["Flight"],
      },
      {
        id: "simulatorType",
        title: "Simulator Type",
        type: "select",
        placeholder: "",
        showFor: ["Simulator"],
      },
      {
        id: "departure",
        title: "Departure",
        type: "select",
        placeholder: "",
        showFor: ["Flight"],
      },
      {
        id: "destination",
        title: "Destination",
        type: "select",
        placeholder: "",
        showFor: ["Flight"],
      },
    ],
  },
  {
    id: "takeoffsLandings",
    title: "Takeoffs / Landings",
    collapsible: true,
    defaultOpen: true,
    showFor: ["Flight"],
    fields: [
      // {
      //   id: "pilotFlying",
      //   title: "Pilot Flying",
      //   type: "toggle",
      // },
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
        placeholder: "Select Crew",
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
      // {
      //   id: "totalTime",
      //   title: "Total Time",
      //   type: "time",
      //   placeholder: "##:##",
      // },
      {
        id: "ifrTime",
        title: "IFR Time",
        type: "time",
        placeholder: "##:##",
      },
      {
        id: "nightTime",
        title: "Night Time",
        type: "time",
        placeholder: "##:##",
      },
      {
        id: "xcTime",
        title: "Cross-Country Time",
        type: "time",
        placeholder: "##:##",
      },
      {
        id: "picTime",
        title: "PIC Time",
        type: "time",
        placeholder: "##:##",
      },
      {
        id: "copilotTime",
        title: "Co-pilot Time",
        type: "time",
        placeholder: "##:##",
      },
      {
        id: "dualTime",
        title: "Dual Time",
        type: "time",
        placeholder: "##:##",
      },
      {
        id: "instructorTime",
        title: "Instructor Time",
        type: "time",
        placeholder: "##:##",
      },
    ],
  },
  {
    id: "simulatorSession",
    title: "Simulator Session",
    collapsible: true,
    defaultOpen: true,
    showFor: ["Simulator"],
    fields: [
      {
        id: "sessionTime",
        title: "Session Time",
        type: "time",
        placeholder: "##:##",
        required: true,
      },
    ],
  },
  {
    id: "approaches",
    title: "Approaches",
    collapsible: true,
    defaultOpen: true,
    showFor: ["Flight"],
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
    showFor: ["Flight"],
    fields: [
      {
        id: "passengers",
        title: "Passengers",
        type: "number",
      },
    ],
  },
  {
    id: "remarks",
    title: "Remarks",
    collapsible: true,
    defaultOpen: true,
    showFor: ["Flight"],
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
