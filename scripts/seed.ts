import { config } from "dotenv";
config({ path: ".env.local" });

import mongoose from "mongoose";
import { ConditionModel } from "../src/lib/models/Condition";
import { TopicModel } from "../src/lib/models/Topic";
import { conditions } from "../src/data/conditions";
import { topics } from "../src/data/healthy-living";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Missing MONGODB_URI in your .env.local file");
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  await ConditionModel.deleteMany({});
  await ConditionModel.insertMany(conditions);
  console.log(`Seeded ${conditions.length} conditions`);

  await TopicModel.deleteMany({});
  await TopicModel.insertMany(topics);
  console.log(`Seeded ${topics.length} topics`);

  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});