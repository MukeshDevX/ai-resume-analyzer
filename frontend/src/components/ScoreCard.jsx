export default function ScoreCard({ label, score, color }) {
  const barColor = color === "brand" ? "bg-brand-500" : "bg-green-500";
  const textColor = color === "brand" ? "text-brand-500" : "text-green-600 dark:text-green-400";
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{label}</p>
      <p className={`text-3xl font-extrabold ${textColor}`}>{score}<span className="text-base text-gray-400 dark:text-gray-500">/100</span></p>
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-3 overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
