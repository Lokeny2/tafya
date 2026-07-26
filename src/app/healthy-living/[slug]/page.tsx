import { notFound } from "next/navigation";
import Link from "next/link";
import type { Topic } from "@/types/topic";

async function getTopic(slug: string): Promise<Topic | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/healthy-living/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = await getTopic(slug);

  if (!topic) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/healthy-living" className="text-sm font-medium text-brand-600 hover:underline">
  <span aria-hidden="true">←</span> Back to Healthy Living
</Link>
      <span className="mt-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">
        {topic.category}
      </span>
      <h1 className="mt-3 font-heading text-3xl font-semibold text-ink sm:text-4xl">
        {topic.title}
      </h1>
      <p className="mt-3 text-lg text-subtle">{topic.summary}</p>
      <p className="mt-6 text-subtle">{topic.body}</p>

      <section className="mt-8 rounded-lg border border-line bg-surface-alt p-6">
        <h2 className="font-heading text-lg font-semibold text-ink">Quick tips</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-subtle">
          {topic.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}