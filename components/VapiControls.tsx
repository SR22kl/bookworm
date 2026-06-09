"use client";

import { useVapi } from "@/hooks/useVapi";
import { IBook } from "@/types";
import { PlanLimits } from "@/lib/subscription-constants";
import { MicOff, Mic } from "lucide-react";
import Image from "next/image";
import Transcript from "./Transcript";
import { DEFAULT_VOICE } from "@/lib/constants";

const VapiControls = ({
  book,
  initialLimits,
}: {
  book: IBook;
  initialLimits?: PlanLimits;
}) => {
  const {
    status,
    isActive,
    messages,
    currentMessage,
    currentUserMessage,
    duration,
    maxDurationSeconds,
    limitError,
    start,
    stop,
    clearError,
  } = useVapi(book, initialLimits);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusDisplay = () => {
    switch (status) {
      case "connecting":
        return { label: "Connecting...", color: "vapi-status-dot-connecting" };
      case "starting":
        return { label: "Starting...", color: "vapi-status-dot-starting" };
      case "listening":
        return { label: "Listening", color: "vapi-status-dot-listening" };
      case "thinking":
        return { label: "Thinking...", color: "vapi-status-dot-thinking" };
      case "speaking":
        return { label: "Speaking", color: "vapi-status-dot-speaking" };
      default:
        return { label: "Ready", color: "vapi-status-dot-ready" };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <>
      {/* Header Card */}
      <div className="vapi-header-card rounded-xl p-8 bg-[#f3e4c7] shadow-(--shadow-soft-lg)">
        <div className="flex gap-8">
          {/* Book Cover Section */}
          <div className="relative shrink-0">
            {/* Book Cover Image */}
            {book.coverURL ? (
              <Image
                src={book.coverURL}
                alt={`${book.title} cover`}
                width={120}
                height={180}
                className="rounded-lg shadow-(--shadow-soft-lg) object-cover"
              />
            ) : (
              <div className="w-30 h-45 rounded-lg shadow-(--shadow-soft-lg) bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Cover</span>
              </div>
            )}

            {/* Mic Button - Overlapping */}
            <button
              onClick={isActive ? stop : start}
              disabled={status === "connecting"}
              className={`vapi-mic-btn absolute bottom-12 left-16 w-16 h-16 rounded-full bg-white shadow-(--shadow-soft-lg) flex items-center justify-center hover:shadow-(--shadow-soft-lg) transition-all border-4 border-[#f3e4c7]
                ${isActive ? "vapi-mic-btn-active" : "vapi-mic-btn-inactive"}`}
            >
              {isActive ? (
                <Mic className="w-8 h-8 text-(--text-primary)" />
              ) : (
                <MicOff className="w-8 h-8 text-(--text-primary)" />
              )}
            </button>
          </div>

          {/* Book Info Section */}
          <div className="flex-1 flex flex-col justify-center">
            {/* Title */}
            <h1 className="text-3xl font-bold font-serif text-(--text-primary) mb-2">
              {book.title}
            </h1>

            {/* Author */}
            <p className="text-lg text-(--text-secondary) mb-6">
              by {book.author}
            </p>

            {/* Status Badges */}
            <div className="flex gap-3 flex-wrap">
              {/* Status Badge */}
              <div className="vapi-status-indicator shadow-(--shadow-soft)">
                <span className={`vapi-status-dot ${statusDisplay.color}`} />
                <span className="vapi-status-text">{statusDisplay.label}</span>
              </div>

              {/* Voice Badge */}
              <div className="vapi-status-indicator shadow-(--shadow-soft)">
                <span className="vapi-status-text">
                  Voice: {book.persona || DEFAULT_VOICE}
                </span>
              </div>

              {/* Timer Badge */}
              <div className="vapi-status-indicator">
                <span className="vapi-status-text">
                  {formatDuration(duration)}/
                  {formatDuration(maxDurationSeconds)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {limitError && (
        <div className="vapi-error-banner rounded-xl p-4 bg-red-50 border border-red-200 text-red-800 flex items-center justify-between">
          <p>{limitError}</p>
          <button
            onClick={clearError}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Transcript Area */}
      <div className="vapi-transcript-wrapper rounded-xl min-h-100 bg-white shadow-(--shadow-soft-lg) flex flex-col items-center justify-center">
         <div className="transcript-container min-h-100">
          <Transcript
            messages={messages}
            currentMessage={currentMessage}
            currentUserMessage={currentUserMessage}
          />
        </div>
      </div>
    </>
  );
};

export default VapiControls;
