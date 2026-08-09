export default function KeywordCard({ title, items, tone }) {
  const dot = tone === "good" ? "bg-green-500" : "bg-amber-500";
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5">
      <p className="text-sm font-semibold mb-3">{title}</p>
      <ul className="space-y-2">
        {items?.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${dot}`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
