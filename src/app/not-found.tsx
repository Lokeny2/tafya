import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <p className="font-heading text-6xl font-semibold text-brand-600">404</p>
      <h1 className="mt-4 font-heading text-2xl font-semibold text-ink">
        Page not found
      </h1>
      <p className="mt-3 text-subtle">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-md bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          Go home
        </Link>
        <Link
          href="/conditions"
          className="rounded-md border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-alt"
        >
          Browse Health A–Z
        </Link>
        <Link
          href="/symptom-checker"
          className="rounded-md border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface-alt"
        >
          Symptom Checker
        </Link>
      </div>
    </div>
  );
}