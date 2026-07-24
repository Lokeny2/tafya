import { notFound } from "next/navigation";
import Link from "next/link";
import { topics } from "@/data/healthy-living";

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export default async function TopicDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const topic = topics.find((t) => t.slug === slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/healthy-living" className="text-sm font-medium text-brand-600 hover:underline">
        ← Back to Healthy Living
      </Link>
      <h1 className="mt-4 font-heading text-3xl font-semibold text-ink sm:text-4xl">
        {topic.title}
      </h1>
      <p className="mt-3 text-lg text-subtle">{topic.summary}</p>
      <p className="mt-6 text-subtle">{topic.body}</p>
    </div>
  );
}