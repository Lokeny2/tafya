import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-heading text-4xl font-semibold text-ink sm:text-5xl">
          Health information you can trust.
        </h1>
        <p className="mt-4 text-lg text-subtle">
          Tafya helps you understand symptoms, conditions, and how to look
          after your health — clearly explained, in one place.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/conditions"
            className="rounded-md bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
          >
            Browse Health A-Z
          </Link>
          <Link
            href="/healthy-living"
            className="rounded-md border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-alt"
          >
            Explore Healthy Living
          </Link>
        </div>
      </div>
    </div>
  );
}