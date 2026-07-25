import Link from "next/link";
import type { Topic } from "@/types/topic";

async function getTopics(): Promise<Topic[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/healthy-living`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export default async function HealthyLivingPage() {
  const topics = await getTopics();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">Healthy Living</h1>
      <p className="mt-2 text-subtle">Everyday guidance for staying well.</p>
      <ul className="mt-8 divide-y divide-line rounded-lg border border-line">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/healthy-living/${topic.slug}`}
              className="flex items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-alt"
            >
              <div>
                <span className="font-heading font-medium text-ink">{topic.title}</span>
                <p className="mt-1 text-sm text-subtle">{topic.summary}</p>
              </div>
              <span className="shrink-0 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700">
                {topic.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}