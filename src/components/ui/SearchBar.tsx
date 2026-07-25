"use client";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import type { Condition } from "@/types/condition";
import type { Topic } from "@/types/topic";

type SearchResults = {
  conditions: Pick<Condition, "slug" | "title" | "summary" | "category">[];
  topics: Pick<Topic, "slug" | "title" | "summary" | "category">[];
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery] = useDebounce(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch results whenever the debounced query changes
  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults(null);
      setIsOpen(false);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedQuery)}`
        );
        const json = await res.json();
        setResults(json.data);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  // Close dropdown when clicking outside — like closing a tooltip
  // by clicking anywhere else on the page
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const hasResults =
    results &&
    (results.conditions.length > 0 || results.topics.length > 0);

  const handleResultClick = () => {
    setQuery("");
    setIsOpen(false);
    setResults(null);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          placeholder="Search conditions, symptoms, topics…"
          aria-label="Search Tafya"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          className="w-full rounded-lg border border-line bg-surface py-3 pl-9 pr-4 text-sm text-ink placeholder:text-subtle focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-brand-600" />
          </div>
        )}
      </div>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-50 mt-1 w-full rounded-lg border border-line bg-surface shadow-lg"
        >
          {!hasResults ? (
            <p className="px-4 py-6 text-center text-sm text-subtle">
              No results found for &ldquo;{debouncedQuery}&rdquo;
            </p>
          ) : (
            <div className="max-h-96 overflow-y-auto divide-y divide-line">
              {results.conditions.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-subtle">
                    Conditions
                  </p>
                  <ul>
                    {results.conditions.map((condition) => (
                      <li key={condition.slug} role="option" aria-selected="false">
                        <Link
                          href={`/conditions/${condition.slug}`}
                          onClick={handleResultClick}
                          className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-surface-alt"
                        >
                          <div>
                            <p className="text-sm font-medium text-ink">
                              {condition.title}
                            </p>
                            <p className="text-xs text-subtle line-clamp-1">
                              {condition.summary}
                            </p>
                          </div>
                          <span className="ml-auto shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-xs text-brand-700">
                            {condition.category}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {results.topics.length > 0 && (
                <div>
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-subtle">
                    Healthy Living
                  </p>
                  <ul>
                    {results.topics.map((topic) => (
                      <li key={topic.slug} role="option" aria-selected="false">
                        <Link
                          href={`/healthy-living/${topic.slug}`}
                          onClick={handleResultClick}
                          className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-surface-alt"
                        >
                          <div>
                            <p className="text-sm font-medium text-ink">
                              {topic.title}
                            </p>
                            <p className="text-xs text-subtle line-clamp-1">
                              {topic.summary}
                            </p>
                          </div>
                          <span className="ml-auto shrink-0 rounded-full bg-brand-100 px-2 py-0.5 text-xs text-brand-700">
                            {topic.category}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}