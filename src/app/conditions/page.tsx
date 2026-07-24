import Link from "next/link";
import { conditions } from "@/data/conditions";

export default function ConditionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">Health A–Z</h1>
      <p className="mt-2 text-subtle">Browse conditions by name.</p>
      <ul className="mt-8 divide-y divide-line rounded-lg border border-line">
        {conditions.map((condition) => (
          <li key={condition.slug}>
            <Link
              href={`/conditions/${condition.slug}`}
              className="block px-5 py-4 transition-colors hover:bg-surface-alt"
            >
              <span className="font-heading font-medium text-ink">{condition.title}</span>
              <p className="mt-1 text-sm text-subtle">{condition.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}