import { notFound } from "next/navigation";
import Link from "next/link";
import { conditions } from "@/data/conditions";

export function generateStaticParams() {
  return conditions.map((condition) => ({ slug: condition.slug }));
}

export default async function ConditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const condition = conditions.find((c) => c.slug === slug);

  if (!condition) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Link href="/conditions" className="text-sm font-medium text-brand-600 hover:underline">
        ← Back to Health A–Z
      </Link>
      <h1 className="mt-4 font-heading text-3xl font-semibold text-ink sm:text-4xl">
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

      <section className="mt-8 rounded-lg border border-line bg-surface-alt p-6">
        <h2 className="font-heading text-lg font-semibold text-ink">Self-care</h2>
        <p className="mt-2 text-subtle">{condition.selfCare}</p>
      </section>
    </div>
  );
}