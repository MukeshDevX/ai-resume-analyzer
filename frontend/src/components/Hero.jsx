import { useState } from "react";
import { Zap, CheckCircle2, Star, Shield, Target, ChevronDown, ArrowRight } from "lucide-react";
import { API_URL } from "../constants";
import Stepper from "./Stepper";
import Dropzone from "./Dropzone";
import FileCard from "./FileCard";
import LoadingPanel from "./LoadingPanel";

export default function Hero({ result, setResult }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showJD, setShowJD] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const step = !file ? 1 : loading ? 3 : result ? 3 : 2;

  const handleFileSelect = (selected) => {
    if (!selected) return;
    if (selected.type !== "application/pdf") {
      setError("Only PDF files are supported right now.");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError("File is too large. Max size is 5MB.");
      return;
    }
    setError(null);
    setFile(selected);
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);
    if (jobDescription.trim()) formData.append("job_description", jobDescription);

    try {
      const res = await fetch(API_URL, { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult({ ...data, job_description: jobDescription.trim() || null });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setJobDescription("");
  };

  if (result) return null; // results view takes over instead

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-10 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
        Is Your Resume Getting<br />
        <span className="text-brand-500">Skipped by ATS Bots?</span>
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
        Find out in 30 seconds. Get your free ATS score, see what's missing,
        and fix it before recruiters skip you.
      </p>

      <div className="flex items-center justify-center gap-x-3 sm:gap-x-6 gap-y-2 mt-5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-wrap">
        <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-brand-500 shrink-0" /> Takes 30 seconds</span>
        <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" /> 100% Free</span>
        <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-brand-500 fill-brand-500 shrink-0" /> Built by a fellow fresher</span>
      </div>

      {/* Tool card */}
      <div className="mt-8 sm:mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-4 sm:p-6 text-left">
        <Stepper step={step} />

        {step !== 3 || !loading ? (
          <>
            {!file ? (
              <Dropzone
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                onDrop={handleDrop}
                onSelect={handleFileSelect}
              />
            ) : (
              <FileCard file={file} onRemove={reset} />
            )}

            {file && (
              <>
                <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Processed instantly</span>
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Never stored</span>
                </div>

                <button
                  onClick={() => setShowJD(!showJD)}
                  className="w-full flex items-center justify-between gap-2 mt-1 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <Target className="w-4 h-4 text-brand-500 shrink-0" />
                    <span className="truncate">
                      Add Job Description <span className="text-gray-400 dark:text-gray-500 hidden sm:inline">(optional — improves accuracy)</span>
                    </span>
                  </span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${showJD ? "rotate-180" : ""}`} />
                </button>
                {showJD && (
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here for a more accurate, role-specific score…"
                    rows={4}
                    className="w-full mt-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  />
                )}

                {error && <p className="text-red-600 dark:text-red-400 text-sm mt-3">{error}</p>}

                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="w-full mt-5 bg-gradient-to-r from-brand-500 to-red-400 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? "Analyzing…" : <>Get My Free Score <ArrowRight className="w-4 h-4" /></>}
                </button>
                <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">
                  Your resume is processed in memory only and never saved.
                </p>
              </>
            )}
            {!file && error && <p className="text-red-600 dark:text-red-400 text-sm mt-3 text-center">{error}</p>}
          </>
        ) : (
          <LoadingPanel />
        )}
      </div>
    </section>
  );
}
