import { useState } from "react";
import {
  CheckCircle2, LayoutGrid, Briefcase, FileText, Target,
  TrendingUp, ArrowRight, Copy, Check
} from "lucide-react";
import { FIX_URL } from "../constants";
import ScoreCard from "./ScoreCard";
import KeywordCard from "./KeywordCard";

export default function Results({ result, onReset }) {
  const { candidate_name, ats_score, quality_score, strengths, missing_keywords, improvements, resume_text, job_description } = result;
  const [fixing, setFixing] = useState(false);
  const [latexCode, setLatexCode] = useState(null);
  const [fixError, setFixError] = useState(null);
  const [copied, setCopied] = useState(false);

  const needsWork = ats_score < 75;

  const handleAutoFix = async () => {
    setFixing(true);
    setFixError(null);
    try {
      const res = await fetch(FIX_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume_text, job_description, improvements }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setLatexCode(data.latex_code);
    } catch (err) {
      setFixError(err.message);
    } finally {
      setFixing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(latexCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setFixError("Couldn't copy automatically — please select and copy the code manually.");
    }
  };

  const categoryStyle = {
    Formatting: { icon: LayoutGrid, bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20", iconBg: "bg-blue-100 dark:bg-blue-500/20", text: "text-blue-600 dark:text-blue-400" },
    Experience: { icon: Briefcase, bg: "bg-purple-50 dark:bg-purple-500/10", border: "border-purple-100 dark:border-purple-500/20", iconBg: "bg-purple-100 dark:bg-purple-500/20", text: "text-purple-600 dark:text-purple-400" },
    Content: { icon: FileText, bg: "bg-pink-50 dark:bg-pink-500/10", border: "border-pink-100 dark:border-pink-500/20", iconBg: "bg-pink-100 dark:bg-pink-500/20", text: "text-pink-600 dark:text-pink-400" },
    Skills: { icon: Target, bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20", iconBg: "bg-amber-100 dark:bg-amber-500/20", text: "text-amber-600 dark:text-amber-400" },
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16 animate-fade-up">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Analysis Complete</h2>
        {candidate_name && <p className="text-gray-500 dark:text-gray-400 mt-1">for {candidate_name}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-8">
        <ScoreCard label="ATS Match Score" score={ats_score} color="brand" />
        <ScoreCard label="Resume Quality" score={quality_score} color="green" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mb-10">
        <KeywordCard title="Strengths" items={strengths} tone="good" />
        <KeywordCard title="Missing Keywords" items={missing_keywords} tone="warn" />
      </div>

      <h3 className="font-bold text-lg mb-4">Recommended Improvements</h3>
      <div className="space-y-4">
        {improvements?.map((imp, i) => {
          const style = categoryStyle[imp.category] || categoryStyle.Content;
          const Icon = style.icon;
          return (
            <div key={i} className={`border ${style.border} ${style.bg} rounded-xl p-5`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg ${style.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${style.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h4 className="font-semibold text-sm">{imp.title}</h4>
                    <span className={`text-xs font-medium shrink-0 ${style.text}`}>{imp.category}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1.5">{imp.description}</p>
                  <p className="text-sm text-green-700 dark:text-green-400 mt-2 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> {imp.impact}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {!latexCode ? (
        <div className={`mt-8 rounded-xl border p-5 ${
          needsWork
            ? "border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10"
            : "border-gray-200 dark:border-gray-800"
        }`}>
          <h4 className={`font-semibold text-sm ${needsWork ? "text-amber-800 dark:text-amber-300" : "text-gray-800 dark:text-gray-100"}`}>
            {needsWork ? "Your resume could use some work for this role" : "Want an even sharper version?"}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            AI can rewrite your resume as ready-to-compile LaTeX — fixing
            formatting, working in the missing keywords, and tailoring it
            to the job description you provided — without inventing
            anything that isn't already true.
          </p>
          {fixError && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{fixError}</p>}
          <button
            onClick={handleAutoFix}
            disabled={fixing}
            className="mt-3 w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-500 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-600 transition disabled:opacity-60"
          >
            {fixing ? "Rewriting your resume…" : <>Auto-Fix My Resume with AI <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-green-200 dark:border-green-500/30 bg-green-50 dark:bg-green-500/10 p-5">
          <h4 className="font-semibold text-sm text-green-800 dark:text-green-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Your improved resume (LaTeX) is ready
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Copy this code and paste it into{" "}
            <a href="https://overleaf.com" target="_blank" rel="noopener noreferrer" className="underline text-brand-500">Overleaf</a>
            {" "}(or your local LaTeX setup), then compile to get the PDF.
          </p>
          <div className="mt-3 max-h-72 overflow-y-auto bg-gray-900 dark:bg-black border border-gray-800 rounded-lg p-4 text-xs whitespace-pre-wrap font-mono text-gray-200">
            {latexCode}
          </div>
          {fixError && <p className="text-red-600 dark:text-red-400 text-sm mt-2">{fixError}</p>}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-brand-500 text-white font-semibold py-2.5 rounded-lg hover:bg-brand-600 transition"
            >
              {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy LaTeX Code</>}
            </button>
            <button
              onClick={() => setLatexCode(null)}
              className="w-full border border-gray-200 dark:border-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full mt-4 border border-gray-200 dark:border-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        Analyze another resume
      </button>
    </section>
  );
}
