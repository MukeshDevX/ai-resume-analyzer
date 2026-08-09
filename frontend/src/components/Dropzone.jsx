import { useRef } from "react";
import { Upload } from "lucide-react";

export default function Dropzone({ isDragging, setIsDragging, onDrop, onSelect }) {
  const inputRef = useRef(null);
  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      className={`group rounded-xl border-2 border-dashed p-6 sm:p-10 text-center transition-colors cursor-pointer hover:border-brand-500 hover:bg-brand-50 dark:hover:bg-brand-500/10 ${
        isDragging ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10" : "border-brand-300 dark:border-brand-500/40 bg-brand-50/40 dark:bg-brand-500/5"
      }`}
    >
      <div className="w-12 h-12 mx-auto rounded-lg bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center mb-3 group-hover:bg-brand-200 dark:group-hover:bg-brand-500/30 transition-colors">
        <Upload className="w-5 h-5 text-brand-600 dark:text-brand-400" />
      </div>
      <p className="text-base font-semibold text-gray-800 dark:text-gray-100">Drop your resume here</p>
      <p className="text-xs text-gray-400 dark:text-gray-500 my-1.5">or</p>
      <span className="text-sm font-semibold text-brand-500 underline underline-offset-2">browse files</span>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onSelect(e.target.files[0])}
      />
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">PDF only, max 5MB</p>
    </div>
  );
}
