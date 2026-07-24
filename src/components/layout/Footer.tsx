export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-alt">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-subtle sm:px-6">
        <p className="max-w-2xl">
          Tafya is a student portfolio project built to practice full-stack
          development. It does not provide real medical advice — for actual
          health concerns, please consult a qualified healthcare professional
          or your local health service.
        </p>
        <p className="mt-4">&copy; {year} Tafya. Built for learning purposes.</p>
      </div>
    </footer>
  );
}