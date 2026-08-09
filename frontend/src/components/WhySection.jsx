import { Shield, Zap, Target } from "lucide-react";

export default function WhySection() {
  const items = [
    { icon: Shield, title: "Your Data is Safe", body: "Your resume is processed in memory and never saved to a server or database." },
    { icon: Zap, title: "Instant Resume Score", body: "Powered by AI for real-time, honest resume feedback in seconds." },
    { icon: Target, title: "ATS Keyword Matching", body: "See exactly which keywords from the job description your resume is missing." },
  ];
  return (
    <section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Why Use This ATS Score Checker?</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand-500" />
              </div>
              <h3 className="font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
