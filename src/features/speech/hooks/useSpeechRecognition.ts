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
    recognition.lang = "en-IN";
    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
    recognitionRef.current = recognition;
    recognition.onresult = (event) => {
      let finalTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript;
      }

      setTranscript(finalTranscript);
    };
    recognition.start();
  }, [isListening]);
  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
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
