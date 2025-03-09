"use server";
import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import { flightSchema } from "@/schemas/flight";

export default async function submitFlight(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const auth = await google.auth.getClient({
      //   projectId: process.env.GOOGLE_PROJECT_ID,
      credentials: {
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        token_url: process.env.GOOGLE_TOKEN_URL,
        universe_domain: "googleapis.com",
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });

    const body = req.body as flightSchema;

    console.log(body);

    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Logbook!A3:AP",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.id,
            body.date,
            body.flightNumber,
            body.departure,
            body.destination,
            body.aircraftRegistration,
            body.aircraftType,
            body.departureTime,
            body.arrivalTime,
            body.blockTime,
            body.timeTakeOff,
            body.timeLanding,
            body.totalAirTime,
            body.nightTime,
            body.ifrTime,
            body.function,
            body.isSolo,
            body.isSpic,
            body.isPicus,
            body.picName,
            // body.picId,
            body.takeoffDay,
            body.takeoffNight,
            body.landingDay,
            body.landingNight,
            body.approachTypes.join(" | "),
            body.remarks,
            body.endorsement,
            body.isSigned,
          ],
        ],
      },
    });

    return res.status(200).json({
      body: {
        data: response.data,
      },
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: (e as Error).message ?? "Something went wrong" });
  }
}
