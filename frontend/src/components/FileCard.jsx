import { FileText, CheckCircle2, X } from "lucide-react";

export default function FileCard({ file, onRemove }) {
  return (
    <div className="flex items-center gap-3 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-xl px-4 py-3.5 animate-fade-up">
      <div className="w-9 h-9 rounded-lg bg-green-100 dark:bg-green-500/20 flex items-center justify-center shrink-0">
        <FileText className="w-4 h-4 text-green-600 dark:text-green-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate dark:text-gray-100">{file.name}</p>
        <p className="text-xs text-green-700 dark:text-green-400 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Ready for analysis
        </p>
      </div>
      <button onClick={onRemove} className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
