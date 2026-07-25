import { Schema, models, model } from "mongoose";
import type { Topic } from "../../types/topic";

const TopicSchema = new Schema<Topic>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  summary: { type: String, required: true },
  body: { type: String, required: true },
  tips: { type: [String], required: true },
});

export const TopicModel = models.Topic ?? model<Topic>("Topic", TopicSchema);