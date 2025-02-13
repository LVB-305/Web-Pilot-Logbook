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
  takeoffDay: z.number(),
  takeoffNight: z.number(),
  landingDay: z.number(),
  landingNight: z.number(),
  approachTypes: z.array(z.string()),
  remarks: z.string(),
  endorsement: z.string(),
  isSigned: z.boolean(),
  function: z.enum(["PIC", "Co-Pilot", "Dual", "Instructor"]),
  flightNumber: z.string(), // remove this
});

export type flightSchema = z.infer<typeof flightSchema>;
