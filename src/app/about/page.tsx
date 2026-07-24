export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-heading text-3xl font-semibold text-ink sm:text-4xl">About Tafya</h1>
      <div className="mt-6 space-y-6 text-subtle">
        <p>
          Tafya is a student project built to demonstrate full-stack web development skills:
          React and Next.js on the front end, Tailwind CSS for styling, and a Node.js API on the
          back end. It&apos;s modeled on the structure of public health information services, as a
          real-world-scale exercise in building a content-driven platform.
        </p>
        <div className="rounded-lg border border-line bg-surface-alt p-6">
          <h2 className="font-heading text-lg font-semibold text-ink">Important</h2>
          <p className="mt-2">
            Tafya does not provide real medical advice, diagnosis, or treatment. All content on
            this site is illustrative, written for demonstration purposes, and should not be used
            to make decisions about your health. If you have a health concern, please contact a
            qualified healthcare professional or your local health service.
          </p>
        </div>
      </div>
    </div>
  );
}