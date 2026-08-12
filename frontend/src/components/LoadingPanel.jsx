export default function LoadingPanel() {
  return (
    <div className="py-12 flex flex-col items-center">
      <div className="w-10 h-10 rounded-full border-4 border-gray-200 dark:border-gray-600 border-t-[#DC2626] animate-spin-slow" />
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">Analyzing your resume…</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">This usually takes about 10 seconds</p>
    </div>
  );
}
