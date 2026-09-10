import { useCallback, useRef, useState } from "react";

import type { SpeechRecognition } from "../types";

export function useSpeechRecognition() {
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = useCallback(() => {
    if (isListening) {
      return;
    }
    setTranscript("");
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognitionAPI();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognition.lang = "en-IN";
    recognitionRef.current = recognition;
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);

      if (recognitionRef.current === recognition) {
        recognitionRef.current = null;
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];

        console.log(`Speech result ${i}:`);

        for (let j = 0; j < result.length; j++) {
          console.log(
            `Alternative ${j + 1}:`,
            result[j].transcript,
            "Confidence:",
            result[j].confidence
          );
        }

        const text = result[0].transcript;

        if (result.isFinal) {
          finalTranscript += text;
        } else {
          interimTranscript += text;
        }
      }

      setTranscript(finalTranscript + interimTranscript);
    };
    recognition.start();
  }, [isListening]);
  const stopListening = useCallback(() => {
    const recognition = recognitionRef.current;

    console.log("stopListening recognition:", recognition);

    if (!recognition) {
      console.log("No recognition instance found");
      return;
    }

    try {
      console.log("Calling recognition.stop()");
      recognition.stop();
      console.log("recognition.stop() called successfully");
    } catch (error) {
      console.error("recognition.stop() failed:", error);
    }
  }, []);
  const clearTranscript = useCallback(() => {
    recognitionRef.current?.abort();
    recognitionRef.current = null;

    setIsListening(false);
    setTranscript("");
  }, []);
  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    clearTranscript,
  };
}
