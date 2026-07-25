import Link from "next/link";
import SearchBar from "@/components/ui/SearchBar";

const quickLinks = [
  {
    href: "/conditions?category=Cold+%26+Flu",
    label: "Cold & Flu",
    icon: "🤧",
  },
  {
    href: "/conditions?category=Mental+Wellbeing",
    label: "Mental Wellbeing",
    icon: "🧠",
  },
  {
    href: "/conditions?category=Aches+%26+Pains",
    label: "Aches & Pains",
    icon: "💊",
  },
  {
    href: "/conditions?category=Skin",
    label: "Skin",
    icon: "🩹",
  },
  {
    href: "/healthy-living",
    label: "Healthy Living",
    icon: "🥗",
  },
  {
    href: "/conditions?category=Allergies",
    label: "Allergies",
    icon: "🌿",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-brand-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h1 className="font-heading text-4xl font-semibold text-ink sm:text-5xl">
            Health information you can trust.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-subtle">
            Tafya helps you understand symptoms, conditions, and how to look
            after your health — clearly explained, in one place.
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="font-heading text-xl font-semibold text-ink">
          Browse by category
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg border border-line bg-surface px-4 py-4 text-sm font-medium text-ink transition-colors hover:bg-surface-alt hover:text-brand-700"
            >
              <span className="text-xl" aria-hidden="true">
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Section CTAs */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-surface-alt p-6">
              <h2 className="font-heading text-lg font-semibold text-ink">
                Health A–Z
              </h2>
              <p className="mt-2 text-sm text-subtle">
                Browse our full list of conditions, symptoms, and treatments.
              </p>
              <Link
                href="/conditions"
                className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline"
              >
                Browse conditions →
              </Link>
            </div>
            <div className="rounded-lg border border-line bg-surface-alt p-6">
              <h2 className="font-heading text-lg font-semibold text-ink">
                Healthy Living
              </h2>
              <p className="mt-2 text-sm text-subtle">
                Practical guidance for sleep, activity, nutrition, and more.
              </p>
              <Link
                href="/healthy-living"
                className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline"
              >
                Explore topics →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}