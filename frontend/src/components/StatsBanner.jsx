export default function StatsBanner() {
  const facts = [
    { label: "2609+", detail: "Resumes Analyzed" },
    { label: "85%", detail: "Avg Score Improvement" },
    { label: "4.9/5", detail: "User Rating" },
  ];
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16">
      <div className="grid sm:grid-cols-3 gap-6 bg-brand-50 dark:bg-brand-500/10 rounded-xl px-6 py-8">
        {facts.map((f) => (
          <div key={f.label} className="text-center">
            <p className="text-lg md:text-xl font-extrabold text-brand-500">{f.label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{f.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
