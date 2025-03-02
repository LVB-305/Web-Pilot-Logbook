"use server";
import { google } from "googleapis";

export default async function getAircraft() {
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

    const sheets = google.sheets({ version: "v4", auth });
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Aircrafts!A2:W",
    });

    const requests = result.data.values?.map((data, index) => {
      return {
        id: index,
        registration: data[0],
        company: data[1],
        fin: data[2],
        model: data[3],
        varient: data[4],
        manufacturer: data[5],
        type: data[6],
        simulatorType: data[7],
        class: data[8],
        category: data[9],
        power: data[10],
        flights: data[11],
        time: data[12],
        note: data[13],
      };
    });

    return requests;
  } catch (error) {
    console.error(error);
  }
}
