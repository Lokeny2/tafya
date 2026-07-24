import Link from "next/link";
import { topics } from "@/data/healthy-living";

export default function HealthyLivingPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">Healthy Living</h1>
      <p className="mt-2 text-subtle">Everyday guidance for staying well.</p>
      <ul className="mt-8 divide-y divide-line rounded-lg border border-line">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/healthy-living/${topic.slug}`}
              className="block px-5 py-4 transition-colors hover:bg-surface-alt"
            >
              <span className="font-heading font-medium text-ink">{topic.title}</span>
              <p className="mt-1 text-sm text-subtle">{topic.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}