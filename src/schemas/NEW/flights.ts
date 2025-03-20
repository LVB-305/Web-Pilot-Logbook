export interface TimeRange {
  start: string;
  end: string;
}

export interface FlightData {
  date: string;
  dutyType: string;
  registration: string;
  simulatorType: string;
  departure: string;
  destination: string;
  dayTakeoffs: number;
  nightTakeoffs: number;
  dayLandings: number;
  nightLandings: number;
  pic: string;
  approaches: Array<{ id: string; count: number }>;
  times: {
    block: TimeRange;
    flight: TimeRange;
    hobbs: {
      start: number;
      end: number;
    };
    // tach: {
    //   start: number;
    //   end: number;
    // };
  };
  durations: {
    totalBlockTime: string;
    ifrTime: string;
    nightTime: string;
    xcTime: string;
    picTime: string;
    copilotTime: string;
    dualTime: string;
    instructorTime: string;
    sessionTime: string;
  };
  otherItems: {
    passengers: number;
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
  registration: "",
  simulatorType: "",
  departure: "",
  destination: "",
  // isPilotFlying: false,
  dayTakeoffs: 0,
  nightTakeoffs: 0,
  dayLandings: 0,
  nightLandings: 0,
  pic: "",
  approaches: [],
  times: {
    block: { start: "", end: "" },
    flight: { start: "", end: "" },
    hobbs: { start: 0, end: 0 },
    // tach: { start: 0, end: 0 },
  },
  durations: {
    totalBlockTime: "",
    ifrTime: "",
    nightTime: "",
    xcTime: "",
    picTime: "",
    copilotTime: "",
    dualTime: "",
    instructorTime: "",
    sessionTime: "",
  },
  otherItems: {
    passengers: 0,
  },
  remarks: {
    general: "",
    training: "",
  },
  signature: null,
};
