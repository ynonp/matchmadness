import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function say(sentence: string) {
  const synth =  window.speechSynthesis;
  const voice = synth.getVoices().find(v => v.lang === "en-US" && v.name === "Samantha")!;

  const text = new SpeechSynthesisUtterance(sentence);
  text.voice = voice;
  synth.speak(text);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


