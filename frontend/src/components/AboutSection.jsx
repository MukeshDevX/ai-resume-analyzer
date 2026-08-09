import { Github, Linkedin, Mail } from "lucide-react";

export default function AboutSection() {
  const links = [
    { icon: Github, label: "GitHub", href: "https://github.com/mukeshdevx" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/mukeshdevx" },
    { icon: Mail, label: "Email", href: "mailto:mukesh.pydev@gmail.com" },
  ];

  return (
    <section className="bg-[#0F1424] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-5">
            <span className="text-xl font-bold text-gray-200">T</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase leading-[1.05] text-brand-500">
            Built by<br />Taki.
          </h2>
          <p className="text-brand-400 font-medium mt-3">
            Frontend Developer <span className="text-gray-500 mx-1">|</span> AI Integrator
          </p>
        </div>

        <div>
          <p className="text-gray-300 leading-relaxed">
            Frontend developer exploring AI integrations. Built this as a
            personal project to practice React, Flask, and LLM APIs — and to
            fix my own resume along the way.
          </p>
          <div className="flex items-center gap-3 mt-5 flex-wrap">
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-2 border border-brand-500/60 rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-brand-500/10 transition-colors"
              >
                <Icon className="w-4 h-4 text-brand-500" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
