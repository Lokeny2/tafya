import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { conditions } from "../src/data/conditions";
import { topics } from "../src/data/healthy-living";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrate() {
  console.log("Migrating conditions...");
  for (const condition of conditions) {
    await client.createOrReplace({
      _type: "condition",
      _id: `condition-${condition.slug}`,
      title: condition.title,
      slug: { _type: "slug", current: condition.slug },
      category: condition.category,
      summary: condition.summary,
      symptoms: condition.symptoms,
      causes: condition.causes,
      selfCare: condition.selfCare,
      whenToSeekHelp: condition.whenToSeekHelp,
      relatedConditions: condition.relatedConditions,
    });
    console.log(`  ✓ ${condition.title}`);
  }

  console.log("Migrating topics...");
  for (const topic of topics) {
    await client.createOrReplace({
      _type: "topic",
      _id: `topic-${topic.slug}`,
      title: topic.title,
      slug: { _type: "slug", current: topic.slug },
      category: topic.category,
      summary: topic.summary,
      body: topic.body,
      tips: topic.tips,
    });
    console.log(`  ✓ ${topic.title}`);
  }

  console.log("Migration complete.");
}

migrate().catch((err) => {
  console.error(err);
  process.exit(1);
});