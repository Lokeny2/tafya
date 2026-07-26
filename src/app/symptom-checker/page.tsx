import type { Metadata } from "next";
import SymptomChecker from "./SymptomChecker";

export const metadata: Metadata = {
  title: "Symptom Checker | Tafya",
  description:
    "Answer a few questions to get general guidance on your next step. For illustrative purposes only — not real medical advice.",
};

export default function SymptomCheckerPage() {
  return <SymptomChecker />;
}