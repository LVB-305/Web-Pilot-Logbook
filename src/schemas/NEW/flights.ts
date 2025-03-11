export interface TimeRange {
  start: string;
  end: string;
}

export interface FlightData {
  date: string;
  dutyType: string;
  flightNumber: string;
  registration: string;
  departure: string;
  destination: string;
  isPilotFlying: boolean;
  dayTakeoffs: number;
  nightTakeoffs: number;
  dayLandings: number;
  nightLandings: number;
  autolands: number;
  goArounds: number;
  isOutOfBase: boolean;
  pic: string;
  approaches: Array<{ id: string; count: number }>;
  times: {
    scheduled: TimeRange;
    duty: TimeRange;
    block: TimeRange;
    flight: TimeRange;
    hobbs: {
      start: number;
      end: number;
    };
    tach: {
      start: number;
      end: number;
    };
  };
  durations: {
    totalTime: string;
    actualInstrument: string;
    dualGiven: string;
    dualReceived: string;
  };
  otherItems: {
    dailyAllowance: string;
    flightPay: string;
    fuel: string;
  };
  remarks: {
    general: string;
    training: string;
  };
  signature: {
    data: string;
    name: string;
    licenseNumber: string;
  } | null;
}

export const defaultFlightData: FlightData = {
  date: new Date().toISOString().split("T")[0],
  dutyType: "Flight",
  flightNumber: "",
  registration: "",
  departure: "",
  destination: "",
  isPilotFlying: false,
  dayTakeoffs: 0,
  nightTakeoffs: 0,
  dayLandings: 0,
  nightLandings: 0,
  autolands: 0,
  goArounds: 0,
  isOutOfBase: false,
  pic: "",
  approaches: [],
  times: {
    scheduled: { start: "", end: "" },
    duty: { start: "", end: "" },
    block: { start: "", end: "" },
    flight: { start: "", end: "" },
    hobbs: { start: 0, end: 0 },
    tach: { start: 0, end: 0 },
  },
  durations: {
    totalTime: "",
    actualInstrument: "",
    dualGiven: "",
    dualReceived: "",
  },
  otherItems: {
    dailyAllowance: "",
    flightPay: "",
    fuel: "",
  },
  remarks: {
    general: "",
    training: "",
  },
  signature: null,
};
