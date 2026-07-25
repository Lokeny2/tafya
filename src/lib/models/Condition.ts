import { Schema, models, model } from "mongoose";
import type { Condition } from "../../types/condition";

const ConditionSchema = new Schema<Condition>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  summary: { type: String, required: true },
  symptoms: { type: [String], required: true },
  causes: { type: String, required: true },
  selfCare: { type: [String], required: true },
  whenToSeekHelp: { type: String, required: true },
  relatedConditions: { type: [String], default: [] },
});

// Same hot-reload issue as the connection above — without this check,
// Next.js dev mode would try to redefine the model on every file save
// and throw an "OverwriteModelError."
export const ConditionModel = models.Condition ?? model<Condition>("Condition", ConditionSchema);