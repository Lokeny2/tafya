import Link from "next/link";
import type { Condition } from "@/types/condition";
import type { ConditionCategory } from "@/types/condition";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health A–Z | Tafya",
  description:
    "Browse all health conditions on Tafya, filtered by category. Clear, simple explanations of symptoms, causes, and self-care.",
};

const categories: ConditionCategory[] = [
  "Cold & Flu",
  "Digestive",
  "Skin",
  "Mental Wellbeing",
  "Aches & Pains",
  "Allergies",
  "Eye",
  "Urinary",
  "Respiratory",
  "Heart & Circulatory",
  "Ear, Nose & Throat",
  "Neurological",
  "Infectious Diseases",
  "Bone & Joint",
  "Endocrine & Metabolic",
  "Women's Health",
  "Men's Health",
];

async function getConditions(category?: string): Promise<Condition[]> {
  const url = category
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/conditions?category=${encodeURIComponent(category)}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/conditions`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}

export default async function ConditionsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const conditions = await getConditions(category);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">
        Health A–Z
      </h1>
      <p className="mt-2 text-subtle">Browse conditions by name.</p>

      {/* Category filter pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/conditions"
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            !category
              ? "bg-brand-600 text-white"
              : "border border-line text-ink hover:bg-surface-alt"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/conditions?category=${encodeURIComponent(cat)}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              category === cat
                ? "bg-brand-600 text-white"
                : "border border-line text-ink hover:bg-surface-alt"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {conditions.length === 0 ? (
        <p className="mt-12 text-center text-subtle">No conditions found.</p>
      ) : (
        <ul className="mt-8 divide-y divide-line rounded-lg border border-line">
          {conditions.map((condition) => (
            <li key={condition.slug}>
              <Link
                href={`/conditions/${condition.slug}`}
                className="flex items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-alt"
              >
                <div>
                  <span className="font-heading font-medium text-ink">
                    {condition.title}
                  </span>
                  <p className="mt-1 text-sm text-subtle">{condition.summary}</p>
                </div>
                <span className="shrink-0 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium ">
                  {condition.category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}