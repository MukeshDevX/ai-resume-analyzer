import { Target, Instagram, Sun, Moon } from "lucide-react";

export default function Header({ isDark, setIsDark, onLogoClick }) {
  return (
    <header className="border-b border-gray-100 dark:border-gray-800">
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-4 flex items-center justify-between">
        <button onClick={onLogoClick} className="flex items-center gap-2" aria-label="Go to home">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight">AI Resume Analyzer</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          <a
            href="https://instagram.com/taki.asf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:opacity-90 transition-opacity shrink-0"
          >
            <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Connect
          </a>
        </div>
      </div>
    </header>
  );
}

function ThemeToggle({ isDark, setIsDark }) {
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle dark mode"
      className={`relative w-16 h-8 rounded-full p-1 shrink-0 transition-colors duration-300 backdrop-blur-md border ${
        isDark ? "bg-white/10 border-white/20" : "bg-black/5 border-black/15"
      }`}
    >
      <Sun className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
      <Moon className="absolute right-2 top-2 w-4 h-4 text-gray-400" />
      <span
        className={`relative flex items-center justify-center w-6 h-6 rounded-full shadow-md transition-transform duration-300 ease-in-out ${
          isDark ? "translate-x-8 bg-black" : "translate-x-0 bg-white"
        }`}
      >
        {isDark ? <Moon className="w-3.5 h-3.5 text-white" /> : <Sun className="w-3.5 h-3.5 text-black" />}
      </span>
    </button>
  );
}
