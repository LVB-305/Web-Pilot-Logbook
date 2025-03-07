"use server";
import { google } from "googleapis";

export default async function getFlightLogs() {
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
      range: "Logbook!A3:AP",
    });

    const requests = result.data.values?.map((data, index) => {
      return {
        id: index,
        date: data[0],
        departure: data[1],
        departure_runway: data[2],
        timeOffBlock: data[3],
        timeTakeOff: data[4],
        destination: data[5],
        destination_runway: data[6],
        timeLanding: data[7],
        timeOnBlock: data[8],
        aircraftType: data[9],
        aircraftRegistration: data[10],
        hobbsOut: data[11],
        hobbsIn: data[12],
        timeSingleEngine: data[13],
        timeMultiEngine: data[14],
        timeMultiPilot: data[15],
        totalBlockTime: data[16],
        totalAirTime: data[17],
        picName: data[18],
        takeoffDay: data[19],
        takeoffNight: data[20],
        landingDay: data[21],
        landingNight: data[22],
        timeNight: data[23],
        timeIfr: data[24],
        timeXc: data[25],
        isSolo: data[26],
        isSpic: data[27],
        isPicus: data[28],
        timePic: data[29],
        timeCopilot: data[30],
        timeDual: data[31],
        timeInstructor: data[32],
        simulatorDate: data[33],
        simulatorType: data[34],
        timeSimulator: data[35],
        approachType: data[36],
        operationType: data[37],
        passengerCount: data[38],
        trainingDescription: data[39],
        remarksEndorsements: data[40],
        signature: data[41],
      };
    });

    return requests;
  } catch (error) {
    console.error(error);
    return error;
  }
}
