import { CheckCircle2 } from "lucide-react";

export default function Stepper({ step }) {
  const steps = ["Upload", "Details", "Analyze"];
  return (
    <div className="flex items-center justify-center gap-1.5 sm:gap-3 mb-6 flex-wrap">
      {steps.map((label, i) => {
        const n = i + 1;
        const done = n < step;
        const active = n === step;
        return (
          <div key={label} className="flex items-center gap-1.5 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-semibold shrink-0 ${
                done ? "bg-green-500 text-white" : active ? "bg-brand-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
              }`}>
                {done ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : n}
              </div>
              <span className={`text-xs sm:text-sm ${active ? "text-gray-900 dark:text-gray-100 font-medium" : "text-gray-400 dark:text-gray-500"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className="w-4 sm:w-8 h-px bg-gray-200 dark:bg-gray-700" />}
          </div>
        );
      })}
    </div>
  );
}
