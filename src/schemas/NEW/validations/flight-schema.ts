import { z } from "zod";

// Time pattern validation (HH:MM format)
const timePattern = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

// Create a schema for time ranges
const timeRangeSchema = z.object({
  start: z
    .string()
    .regex(timePattern, { message: "Invalid time format (HH:MM)" })
    .or(z.literal("")),
  end: z
    .string()
    .regex(timePattern, { message: "Invalid time format (HH:MM)" })
    .or(z.literal("")),
});

// Create a schema for numeric ranges (hobbs, tach)
const numericRangeSchema = z.object({
  start: z.number().min(0),
  end: z.number().min(0),
});

// Create a schema for approaches
const approachSchema = z.object({
  id: z.string(),
  count: z.number().int().min(1),
});

const baseFlightSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date is required" }),
  pic: z.string().min(1, { message: "PIC is required" }),
  remarks: z.object({
    general: z.string().optional(),
    training: z.string().optional(),
  }),
  signature: z
    .object({
      data: z.string(),
      name: z.string().min(1, { message: "Name is required" }),
      licenseNumber: z
        .string()
        .min(1, { message: "License number is required" }),
    })
    .nullable(),
});

// Create a schema for the flight data
const flightDutySchema = z.object({
  dutyType: z.literal("Flight"),
  ...baseFlightSchema.shape,
  // date: z
  //   .string()
  //   .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date is required" }),
  //   dutyType: z.string().min(1, { message: "Duty type is required" }),
  //   flightNumber: z.string().optional(),
  //   registration: z.string().min(1, { message: "Registration is required" }),

  // AERODROMES
  departure: z.string().min(1, { message: "Departure is required" }),
  departure_runway: z.string().optional(),
  destination: z.string().min(1, { message: "Destination is required" }),
  destination_runway: z.string().optional(),

  dayTakeoffs: z.number().int().min(0),
  nightTakeoffs: z.number().int().min(0),
  dayLandings: z.number().int().min(0),
  nightLandings: z.number().int().min(0),
  approaches: z.array(approachSchema),

  // pic: z.string().min(1, { message: "PIC is required" }),

  // TIMINGS
  times: z.object({
    block: timeRangeSchema,
    flight: timeRangeSchema,
    hobbs: numericRangeSchema,
    // tach: numericRangeSchema,
  }),
  durations: z.object({
    totalBlockTime: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" })
      .or(z.literal("")),
    totalAirTime: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" })
      .or(z.literal("")),
    timePic: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" })
      .or(z.literal("")),
    timeCopilot: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" })
      .or(z.literal("")),
    timeDual: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" })
      .or(z.literal("")),
    timeInstructor: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" })
      .or(z.literal("")),
    timeNight: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" })
      .or(z.literal("")),
    timeIfr: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" })
      .or(z.literal("")),
    timeXc: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" })
      .or(z.literal("")),
  }),
  otherItems: z.object({
    // dailyAllowance: z.string().optional(),
    // flightPay: z.string().optional(),
    passengers: z.string().optional(),
  }),
  // remarks: z.object({
  //   general: z.string().optional(),
  //   training: z.string().optional(),
  // }),
  // signature: z
  //   .object({
  //     data: z.string(),
  //     name: z.string().min(1, { message: "Name is required" }),
  //     licenseNumber: z
  //       .string()
  //       .min(1, { message: "License number is required" }),
  //   })
  //   .nullable()
  //   .optional(),
});

const simulatorDutySchema = z.object({
  dutyType: z.literal("Simulator"),
  ...baseFlightSchema.shape,
  simulatorType: z.string().min(1, { message: "Simulator type is required" }),
  durations: z.object({
    sessionTime: z
      .string()
      .regex(timePattern, { message: "Invalid time format (HH:MM)" }),
  }),
});

// Create a discriminated union schema based on dutyType
// const flightSchema = z.discriminatedUnion("dutyType", [
//   // Flight schema
//   z.object({
//     dutyType: z.literal("Flight"),
//     ...baseFlightSchema.shape,
//     ...flightDutySchema.shape,
//   }),
//   // Simulator schema
//   z.object({
//     dutyType: z.literal("Simulator"),
//     ...baseFlightSchema.shape,
//     ...simulatorDutySchema.shape,
//     // Include optional fields that might be present in the data but not required for Simulator
//     registration: z.string().optional(),
//     departure: z.string().optional(),
//     destination: z.string().optional(),
//     dayTakeoffs: z.number().optional(),
//     nightTakeoffs: z.number().optional(),
//     dayLandings: z.number().optional(),
//     nightLandings: z.number().optional(),
//     approaches: z.array(approachSchema).optional(),
//     times: z
//       .object({
//         block: timeRangeSchema,
//         flight: timeRangeSchema,
//         hobbs: numericRangeSchema,
//         // tach: numericRangeSchema,
//       })
//       .optional(),
//     otherItems: z
//       .object({
//         passsengers: z.string().optional(),
//       })
//       .optional(),
//   }),
// ]);

export const flightSchema = z.discriminatedUnion("dutyType", [
  flightDutySchema,
  simulatorDutySchema,
]);

// Create a type from the schema
export type FlightFormData = z.infer<typeof flightSchema>;

// Function to validate flight data
export function validateFlightData(data: unknown) {
  return flightSchema.safeParse(data);
}
