export default function LoadingPanel() {
  return (
    <div className="py-12 flex flex-col items-center">
      <svg className="w-10 h-10 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#D1D5DB" strokeWidth="3" />
        <path d="M22 12a10 10 0 0 0-10-10" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Analyzing your resume…</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">This usually takes about 10 seconds</p>
    </div>
  );
}
