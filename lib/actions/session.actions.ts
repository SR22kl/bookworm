"use server";

import { connectToDatabase } from "@/database/mongoose";
import { StartSessionResult, EndSessionResult } from "@/types";
import VoiceSession from "@/database/models/voiceSessionModel";
import mongoose from "mongoose";

import { getCurrentBillingPeriodStart } from "@/lib/subscription-constants";

export const startVoiceSession = async (
  clerkId: string,
  bookId: string,
): Promise<StartSessionResult> => {
  try {
    // Validate inputs
    if (!clerkId?.trim()) {
      return {
        success: false,
        error: "Invalid user ID",
      };
    }

    if (!bookId?.trim() || !mongoose.Types.ObjectId.isValid(bookId)) {
      return {
        success: false,
        error: "Invalid book ID",
      };
    }

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
    // Validate inputs
    if (!sessionId?.trim() || !mongoose.Types.ObjectId.isValid(sessionId)) {
      return {
        success: false,
        error: "Invalid session ID",
      };
    }

    if (!Number.isFinite(durationSeconds) || durationSeconds < 0) {
      return {
        success: false,
        error: "Invalid duration! Duration cannot be negative",
      };
    }

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
