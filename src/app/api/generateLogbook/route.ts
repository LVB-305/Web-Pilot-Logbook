import { NextResponse } from "next/server";
import { exportLogbook } from "@/utils/googleSheets";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userData, logbookData } = body;

    if (!userData || !logbookData) {
      return NextResponse.json(
        { success: false, message: "Missing required data" },
        { status: 400 }
      );
    }

    // Add the current date if not provided
    if (!userData.date) {
      const today = new Date();
      userData.date = today.toLocaleDateString("en-GB");
    }

    const result = await exportLogbook(userData, logbookData);

    console.log("test");

    // Generate a download URL (this is temporary and will expire)
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${result.spreadsheetId}`;

    return NextResponse.json({
      success: true,
      message: "Logbook generated successfully",
      fileId: result.spreadsheetId,
      downloadUrl,
    });
  } catch (error) {
    console.error("Error generating logbook:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
