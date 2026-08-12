import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Results from "./components/Results";
import WhySection from "./components/WhySection";
import StatsBanner from "./components/StatsBanner";
import Footer from "./components/Footer";

export default function App() {
  const [result, setResult] = useState(null);
  const [resetKey, setResetKey] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleReset = () => {
    setResult(null);
    setResetKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors">
      <Header isDark={isDark} setIsDark={setIsDark} onLogoClick={handleReset} />
      <Hero key={resetKey} result={result} setResult={setResult} />
      {result && <Results result={result} onReset={handleReset} />}
      {!result && (
        <>
          <WhySection />
          <StatsBanner />
          <Footer />
        </>
      )}
    </div>
  );
}
