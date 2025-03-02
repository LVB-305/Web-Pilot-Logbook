import { z } from "zod";

export const aircraftSchema = z.object({
  id: z.number(),
  registration: z.string(),
  type: z.string(),
  manufacturer: z.string(),
  manufacturer_short: z.string(),
  model: z.string(),
  icao_model: z.string(),
  operator: z.string(),
  serial: z.string(),
  delivery: z.date(),
  hexcode: z.string(),
  status: z.enum(["Active", "Stored", "Written Off", "Scrapped"]),
});

export type aircraftSchema = z.infer<typeof aircraftSchema>;

export const aircrafts: aircraftSchema[] = [
  {
    id: 1,
    registration: "OO-SKA",
    type: "DA40 Diamond Star",
    model: "DA40 D",
    icao_model: "DA40",
    manufacturer: "Diamond Aircraft Industries GmbH",
    manufacturer_short: "Diamond",
    operator: "Skywings Flight Training",
    serial: "",
    delivery: new Date("2010-01-01"),
    hexcode: "44D0A4",
    status: "Active",
  },
];
