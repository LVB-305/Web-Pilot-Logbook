import { z } from "zod";

export const flightSchema = z.object({
  id: z.number(),
  date: z.string(),
  departure: z.string(),
  departure_runway: z.string(),
  destination: z.string(),
  destination_runway: z.string(),
  aircraftRegistration: z.string(),
  aircraftType: z.string(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  blockTime: z.string(),
  timeTakeOff: z.string(),
  timeLanding: z.string(),
  totalAirTime: z.string(),
  nightTime: z.string(),
  ifrTime: z.string(),
  isSolo: z.boolean(),
  isSpic: z.boolean(),
  isPicus: z.boolean(),
  picName: z.string(),
  takeoffDay: z.coerce.number(),
  takeoffNight: z.coerce.number(),
  landingDay: z.coerce.number(),
  landingNight: z.coerce.number(),
  approachTypes: z.array(z.string()),
  remarks: z.string(),
  endorsement: z.string(),
  isSigned: z.boolean(),
  function: z.enum(["PIC", "Co-Pilot", "Dual", "Instructor"]),
  flightNumber: z.string(), // remove this
});

export type flightSchema = z.infer<typeof flightSchema>;

export const FlightLog = z.object({
  id: z.string(),
  date: z.string(),
  departure: z.string(),
  departure_runway: z.string(),
  timeOffBlock: z.string(),
  timeTakeOff: z.string(), // Time available?
  destination: z.string(),
  destination_runway: z.string(),
  timeLanding: z.string(),
  timeOnBlock: z.string(),
  aircraftType: z.string(),
  aircraftRegistration: z.string(),
  hobbsOut: z.number(),
  hobbsIn: z.number(),
  timeSingleEngine: z.string(),
  timeMultiEngine: z.string(),
  timeMultiPilot: z.string(),
  totalBlockTime: z.string(),
  totalAirTime: z.string(),
  picName: z.string(),
  takeoffDay: z.number(),
  takeoffNight: z.number(),
  landingDay: z.number(),
  landingNight: z.number(),
  timeNight: z.string(),
  timeIfr: z.string(),
  timeXc: z.string(),
  isSolo: z.boolean(),
  isSpic: z.boolean(),
  isPicus: z.boolean(),
  timePic: z.string(),
  timeCopilot: z.string(),
  timeDual: z.string(),
  timeInstructor: z.string(),
  simulatorDate: z.string(),
  simulatorType: z.string(),
  timeSimulator: z.string(),
  approachType: z.string(),
  operationType: z.string(),
  passengerCount: z.number(),
  trainingDescription: z.string(),
  remarksEndorsements: z.string(),
  signature: z.string(),
});

export type FlightLog = z.infer<typeof FlightLog>;

interface Column {
  key: keyof FlightLog;
  label: string;
  hidden?: boolean;
  sortable?: boolean;
  sortType?: "string" | "number" | "date" | "time" | "boolean";
  width?: string;
}

export const columns: Column[] = [
  {
    key: "date",
    label: "Date",
    sortable: true,
    sortType: "date",
    width: "120px",
  },
  { key: "departure", label: "Departure", width: "120px" },
  { key: "destination", label: "Destination", width: "120px" },
  { key: "offBlock", label: "Off Block", width: "100px" },
  { key: "onBlock", label: "On Block", width: "100px" },
  {
    key: "picName",
    label: "PIC Name",
    sortable: true,
    sortType: "string",
    width: "150px",
  },
  { key: "registration", label: "Registration", width: "120px" },
  {
    key: "dayTakeOff",
    label: "Day Take-Off",
    sortable: true,
    sortType: "number",
    width: "120px",
  },
  {
    key: "nightTakeOff",
    label: "Night Take-Off",
    sortable: true,
    sortType: "number",
    width: "120px",
  },
  {
    key: "dayLanding",
    label: "Day Landing",
    sortable: true,
    sortType: "number",
    width: "120px",
  },
  {
    key: "nightLanding",
    label: "Night Landing",
    sortable: true,
    sortType: "number",
    width: "120px",
  },
  {
    key: "totalBlock",
    label: "Total Block",
    sortable: true,
    sortType: "time",
    width: "120px",
  },
  {
    key: "night",
    label: "Night",
    sortable: true,
    sortType: "time",
    width: "100px",
  },
  {
    key: "ifr",
    label: "IFR",
    sortable: true,
    sortType: "time",
    width: "100px",
  },
  {
    key: "pic",
    label: "PIC",
    sortable: true,
    sortType: "time",
    width: "100px",
  },
  {
    key: "dual",
    label: "Dual",
    sortable: true,
    sortType: "time",
    width: "100px",
  },
  {
    key: "solo",
    label: "Solo",
    sortable: true,
    sortType: "boolean",
    width: "100px",
  },
  { key: "remark", label: "Remark", width: "200px" },
];
