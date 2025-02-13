import { flightSchema } from "@/schemas/flight";
import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const body = req.body as flightSchema;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "A3:AP",
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
            body.picId,
            body.takeoffDay,
            body.takeoffNight,
            body.landingDay,
            body.landingNight,
            body.approachTypes.join(", "),
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
