"use client";

import { useEffect, useRef, KeyboardEvent } from "react";
import { Mic } from "lucide-react";
import { Messages } from "@/types";

interface TranscriptProps {
  messages: Messages[];
  currentMessage: string;
  currentUserMessage: string;
}

const Transcript = ({
  messages,
  currentMessage,
  currentUserMessage,
}: TranscriptProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const amount = 120;

    let handled = true;

    switch (e.key) {
      case "ArrowDown":
        el.scrollBy({ top: amount, behavior: "smooth" });
        break;
      case "ArrowUp":
        el.scrollBy({ top: -amount, behavior: "smooth" });
        break;
      case "PageDown":
        el.scrollBy({ top: el.clientHeight, behavior: "smooth" });
        break;
      case "PageUp":
        el.scrollBy({ top: -el.clientHeight, behavior: "smooth" });
        break;
      case "Home":
        el.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "End":
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        break;
      default:
        handled = false;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, currentMessage, currentUserMessage]);

  const isEmpty =
    messages.length === 0 && !currentMessage && !currentUserMessage;

  if (isEmpty) {
    return (
      <div className="transcript-empty">
        <Mic className="size-12 text-[#212a3b] mb-4" />
        <h2 className="transcript-empty-text">
          <b>No conversation yet</b>
        </h2>
        <p className="transcript-empty-hint">
          Click the mic button above to start talking
        </p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Transcript messages"
      className="transcript-messages overflow-y-auto pr-2 flex-1 max-h-[60vh] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
    >
      {messages.map((message, index) => (
        <div
          key={index}
          className={`transcript-message ${
            message.role === "user"
              ? "transcript-message-user"
              : "transcript-message-assistant"
          }`}
        >
          <div
            className={`transcript-bubble ${
              message.role === "user"
                ? "transcript-bubble-user"
                : "transcript-bubble-assistant"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}

      {/* User Streaming Message */}
      {currentUserMessage && (
        <div className="transcript-message transcript-message-user">
          <div className="transcript-bubble transcript-bubble-user">
            {currentUserMessage}
            <span className="transcript-cursor" />
          </div>
        </div>
      )}

      {/* Assistant Streaming Message */}
      {currentMessage && (
        <div className="transcript-message transcript-message-assistant">
          <div className="transcript-bubble transcript-bubble-assistant">
            {currentMessage}
            <span className="transcript-cursor" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Transcript;
