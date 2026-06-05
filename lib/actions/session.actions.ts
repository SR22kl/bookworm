"use server";

import { connectToDatabase } from "@/database/mongoose";
import { StartSessionResult, EndSessionResult } from "@/types";
import VoiceSession from "@/database/models/voiceSessionModel";

import { getCurrentBillingPeriodStart } from "@/lib/subscription-constants";

export const startVoiceSession = async (
  clerkId: string,
  bookId: string,
): Promise<StartSessionResult> => {
  try {
    await connectToDatabase();

    // Limits/Plan to see whether a session can be started
    const session = await VoiceSession.create({
      clerkId,
      bookId,
      startedAt: new Date(),
      billingPeriodStart: getCurrentBillingPeriodStart(),
      durationSeconds: 0,
    });

    return {
      success: true,
      sessionId: session._id.toString(),
      //   maxDurationMinutes: check.maxDurationMinutes,
    };
  } catch (e) {
    console.error("Database connection error:", e);
    return {
      success: false,
      error: "Database connection failed",
    };
  }
};

export const endVoiceSession = async (
  sessionId: string,
  durationSeconds: number,
): Promise<EndSessionResult> => {
  try {
    await connectToDatabase();

    const result = await VoiceSession.findByIdAndUpdate(sessionId, {
      endedAt: new Date(),
      durationSeconds,
    });

    if (!result) {
      return {
        success: false,
        error: "Voice session not found",
      };
    }

    return {
      success: true,
    };
  } catch (e) {
    console.error("Error ending session:", e);
    return {
      success: false,
      error: "Failed to end voice session",
    };
  }
};
