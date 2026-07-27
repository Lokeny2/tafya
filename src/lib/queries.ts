import { sanityClient } from "./sanity";
import type { Condition } from "@/types/condition";
import type { Topic } from "@/types/topic";

// Helper that normalises Sanity's slug object { current: "..." }
// into a plain string, matching your existing Condition type
function normaliseCondition(raw: any): Condition {
  return { ...raw, slug: raw.slug?.current ?? raw.slug };
}

function normaliseTopic(raw: any): Topic {
  return { ...raw, slug: raw.slug?.current ?? raw.slug };
}

export async function getAllConditions(category?: string): Promise<Condition[]> {
  const filter = category
    ? `_type == "condition" && category == $category`
    : `_type == "condition"`;
  const raw = await sanityClient.fetch(
    `*[${filter}] | order(title asc)`,
    category ? { category } : {}
  );
  return raw.map(normaliseCondition);
}

export async function getConditionBySlug(slug: string): Promise<Condition | null> {
  const raw = await sanityClient.fetch(
    `*[_type == "condition" && slug.current == $slug][0]`,
    { slug }
  );
  return raw ? normaliseCondition(raw) : null;
}

export async function getAllTopics(category?: string): Promise<Topic[]> {
  const filter = category
    ? `_type == "topic" && category == $category`
    : `_type == "topic"`;
  const raw = await sanityClient.fetch(
    `*[${filter}] | order(title asc)`,
    category ? { category } : {}
  );
  return raw.map(normaliseTopic);
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  const raw = await sanityClient.fetch(
    `*[_type == "topic" && slug.current == $slug][0]`,
    { slug }
  );
  return raw ? normaliseTopic(raw) : null;
}

export async function searchContent(query: string) {
  const raw = await sanityClient.fetch(
    `{
      "conditions": *[_type == "condition" && (title match $q || summary match $q)]
        | order(title asc)[0..7]
        { title, slug, summary, category },
      "topics": *[_type == "topic" && (title match $q || summary match $q)]
        | order(title asc)[0..3]
        { title, slug, summary, category }
    }`,
    { q: `${query}*` }
  );
  return {
    conditions: raw.conditions.map(normaliseCondition),
    topics: raw.topics.map(normaliseTopic),
  };
}