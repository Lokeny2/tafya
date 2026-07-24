import type { Condition } from "@/types/condition";

// Temporary stub data — Day 4 expands this into the full content model.
export const conditions: Condition[] = [
  {
    slug: "common-cold",
    title: "Common Cold",
    summary: "A mild viral infection of the nose and throat.",
    symptoms: ["Runny or blocked nose", "Sore throat", "Mild cough", "Tiredness"],
    selfCare: "Rest, stay hydrated, and consider over-the-counter remedies for symptom relief.",
  },
  {
    slug: "seasonal-allergies",
    title: "Seasonal Allergies",
    summary: "An immune reaction to pollen and other airborne triggers.",
    symptoms: ["Sneezing", "Itchy or watery eyes", "Nasal congestion"],
    selfCare: "Limit outdoor exposure on high-pollen days and keep windows closed.",
  },
  {
    slug: "tension-headache",
    title: "Tension Headache",
    summary: "The most common type of headache, often linked to stress.",
    symptoms: ["Dull, aching head pain", "Tightness across the forehead", "Tender scalp or neck"],
    selfCare: "Rest in a quiet space, stay hydrated, and manage stress where possible.",
  },
];