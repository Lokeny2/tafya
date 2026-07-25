import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-alt">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-heading font-semibold text-ink">Tafya</p>
            <p className="mt-2 max-w-sm text-sm text-subtle">
              A student portfolio project built to practice full-stack
              development. Does not provide real medical advice.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-subtle">
              <li>
                <Link href="/conditions" className="hover:text-ink">
                  Health A–Z
                </Link>
              </li>
              <li>
                <Link href="/healthy-living" className="hover:text-ink">
                  Healthy Living
                </Link>
              </li>
              <li>
                <Link href="/symptom-checker" className="hover:text-ink">
                  Symptom Checker
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 border-t border-line pt-6 text-xs text-subtle">
          <p>
            &copy; {year} Tafya. Built for learning purposes only. Not real
            medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}