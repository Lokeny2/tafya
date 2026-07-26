import { notFound } from "next/navigation";
import Link from "next/link";
import type { Condition } from "@/types/condition";

async function getCondition(slug: string): Promise<Condition | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/conditions/${slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json.data;
}

async function getAllConditions(): Promise<Condition[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/conditions`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export default async function ConditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = await getCondition(slug);

  if (!condition) notFound();

  const allConditions = await getAllConditions();
  const related = allConditions.filter((c) =>
    condition.relatedConditions.includes(c.slug)
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/conditions" className="text-sm font-medium text-brand-800 hover:underline">
            <span aria-hidden="true">←</span> Back to Health A–Z
      </Link>
      <span className="mt-4 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800">
        {condition.category}
      </span>
      <h1 className="mt-3 font-heading text-3xl font-semibold text-ink sm:text-4xl">
        {condition.title}
      </h1>
      <p className="mt-3 text-lg text-subtle">{condition.summary}</p>

      <section className="mt-8">
        <h2 className="font-heading text-lg font-semibold text-ink">Common symptoms</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-subtle">
          {condition.symptoms.map((symptom) => (
            <li key={symptom}>{symptom}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="font-heading text-lg font-semibold text-ink">Causes</h2>
        <p className="mt-2 text-subtle">{condition.causes}</p>
      </section>

      <section className="mt-8 rounded-lg border border-line bg-surface-alt p-6">
        <h2 className="font-heading text-lg font-semibold text-ink">Self-care</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-subtle">
          {condition.selfCare.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-lg border border-urgent/30 bg-urgent/5 p-6">
        <h2 className="font-heading text-lg font-semibold text-urgent">When to seek help</h2>
        <p className="mt-2 text-ink">{condition.whenToSeekHelp}</p>
      </section>

      {related.length > 0 && (
        <section className="mt-8">
          <h2 className="font-heading text-lg font-semibold text-ink">Related conditions</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/conditions/${r.slug}`}
                  className="inline-block rounded-full border border-line px-3 py-1 text-sm text-ink transition-colors hover:bg-surface-alt"
                >
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}