import en from "./en";
import es from "./es";
import type { Content } from "./types";

export const content: Record<"en" | "es", Content> = { en, es };
export type Lang = keyof typeof content;
export const isLang = (v: unknown): v is Lang => v === "en" || v === "es";
export type { Content };
