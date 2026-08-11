def build_analysis_prompt(resume_text, job_description=None):
    """Builds the instruction we send to the LLM for scoring a resume.
    Asking for JSON output makes the response easy to parse and display
    in the React UI."""
    if job_description:
        role_context = (
            f'Job description to match against:\n"""\n{job_description}\n"""\n'
            "Infer the target role from this job description."
        )
    else:
        role_context = (
            "No job description was provided. Infer the most likely target "
            "role from the resume's own content (skills, projects, "
            "experience section) and evaluate against general best "
            "practices for that role."
        )

    return f"""
You are an ATS (Applicant Tracking System) simulator combined with an
experienced technical recruiter, reviewing a candidate's resume.

Resume text:
\"\"\"
{resume_text}
\"\"\"

{role_context}

Your score MUST be computed from specific evidence in THIS resume, not
a generic impression. Two different resumes should almost never land
on the same score unless they are genuinely, specifically similar.
Follow this exact procedure and do not skip steps:

STEP 1 — List 6 to 10 concrete keywords/skills/technologies that the
target role or job description requires.

STEP 2 — For each one, check the resume text and mark it PRESENT or
MISSING. Only mark PRESENT if it is actually stated or clearly implied
by a project/experience described — do not give credit for skills
that aren't mentioned anywhere.

STEP 3 — Compute ats_score:
  base = round(100 * present_count / total_count_from_step_1)
  Then subtract further points if structure would break ATS parsing:
  -10 if there are no clear section headings (Education/Experience/etc.)
  -10 if formatting likely uses tables/columns/graphics that ATS
      parsers commonly fail on
  Floor the result at 0.

STEP 4 — Compute quality_score starting at 100, and subtract:
  -20 if there are zero quantified achievements (no numbers/metrics/
      percentages anywhere in experience or project bullets)
  -15 if most bullets start with weak phrasing ("responsible for",
      "worked on", "helped with") instead of strong action verbs
  -10 if sections/dates are inconsistent or hard to follow
  -10 if bullets are vague/generic rather than specific about what was
      built or achieved
  -5 for each other genuine writing-quality issue you find (list what
      it is in "improvements")
  Do not output a quality_score above 85 unless you found at least 2
  genuinely specific, quantified achievements in the resume.

Do not include this step-by-step work in your output — only the final
JSON. But the numbers in that JSON must be the actual result of doing
these steps, not a rounded-off guess.

Respond with ONLY valid JSON (no markdown, no extra text) in exactly
this shape:

{{
  "candidate_name": "<name extracted from the resume, or empty string>",
  "ats_score": <number 0-100, computed per STEP 3>,
  "quality_score": <number 0-100, computed per STEP 4>,
  "strengths": ["point 1", "point 2", "point 3"],
  "missing_keywords": ["keyword 1", "keyword 2", "keyword 3"],
  "improvements": [
    {{
      "title": "<short improvement title>",
      "category": "<one of: Formatting, Experience, Content, Skills>",
      "description": "<1-2 sentence explanation of what to change>",
      "impact": "<1 sentence on why this helps>"
    }}
  ]
}}

Include 4 to 6 items in "improvements", covering a mix of categories.
"""


# Reference LaTeX resume template (the well-known "Jake's Resume" style.

LATEX_TEMPLATE = r"""
\documentclass[letterpaper,11pt]{article}
\usepackage{latexsym}
\usepackage{graphicx}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{fontawesome5}
\usepackage{multicol}
\usepackage[dvipsnames]{xcolor}
\setlength{\multicolsep}{-3.0pt}
\setlength{\columnsep}{-1pt}
\input{glyphtounicode}
\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}
\addtolength{\oddsidemargin}{-0.6in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1.19in}
\addtolength{\topmargin}{-.7in}
\addtolength{\textheight}{1.4in}
\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}
\titleformat{\section}{
  \vspace{-4pt}\color{BrickRed}\scshape\raggedright\large\bfseries
}{}{0em}{}[\color{BrickRed}\titlerule \vspace{-5pt}]
\pdfgentounicode=1
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}
\newcommand{\classesList}[4]{
    \item\small{
        {#1 #2 #3 #4 \vspace{-2pt}}
  }
}
\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \textbf{\small #2} \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{1.001\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & \textbf{\small #2}\\
    \end{tabular*}\vspace{-7pt}
}
\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}
\renewcommand\labelitemi{$\vcenter{\hbox{\tiny$\bullet$}}$}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}
\begin{document}
\begin{minipage}{1\textwidth}
\begin{center}
    {\Huge \scshape FULL NAME HERE} \\ \vspace{10pt}
    \small \href{tel:+91XXXXXXXXXX}{\raisebox{-0.1\height}\faPhone\ +91 XXXXXXXXXX} ~
    \href{mailto:email@example.com}{\raisebox{-0.2\height}\faEnvelope\  \underline{email@example.com}} ~
    \href{https://linkedin.com/in/username}{\raisebox{-0.2\height}\faLinkedin\ \underline{LinkedIn}}  ~
    \href{https://github.com/username}{\raisebox{-0.2\height}\faGithub\ \underline{GitHub}}
    \vspace{4pt}\\
    \end{center}
\end{minipage}
\vspace{-3pt}
\section{Education}
\resumeSubHeadingListStart
\resumeSubheading{University/College Name}{Years}{Degree}{CGPA/Percentage}
\resumeSubHeadingListEnd
\vspace{-4pt}
\section{Experience}
\resumeSubHeadingListStart
\resumeSubheading{Company Name}{Dates}{Role Title}{}
\resumeItemListStart
\resumeItem{Achievement bullet using strong action verbs.}
\resumeItemListEnd
\resumeSubHeadingListEnd
\vspace{-12pt}
\section{Projects}
\resumeSubHeadingListStart
\resumeProjectHeading{\textbf{Project Name} $|$ \emph{Tech Stack}}{}
\resumeItemListStart
\resumeItem{What the project does and its impact.}
\resumeItemListEnd
\resumeSubHeadingListEnd
\vspace{-12pt}
\section{Technical Skills}
\begin{itemize}[leftmargin=0.15in, label={}]
  \item{
        \textbf{Languages}{: } \\
        \textbf{Frameworks}{: } \\
        \textbf{Tools}{: } \\
        }
\end{itemize}
\end{document}
"""


def build_latex_prompt(resume_text, job_description=None, improvements=None):
    """Instructs the model to reproduce the reference LaTeX template's
    structure/macros exactly, substituting in the real candidate's
    truthful content in place of the placeholder example content."""
    if job_description:
        jd_block = f'Target job description:\n"""\n{job_description}\n"""\n'
    else:
        jd_block = (
            "No specific job description was provided — optimize for "
            "general ATS best practices and the role implied by the "
            "resume's own content.\n"
        )

    issues = "; ".join(
        f"{imp.get('title', '')}: {imp.get('description', '')}"
        for imp in (improvements or [])
        if imp.get("title")
    ) or "General ATS-friendliness and clarity improvements."

    prompt = (
        "You are an expert LaTeX resume writer.\n\n"
        "Reference template — reproduce its exact preamble, packages, "
        "and custom \\newcommand definitions unchanged. It currently "
        "has placeholder/example content that you must replace:\n\n"
        "```latex\n" + LATEX_TEMPLATE + "\n```\n\n"
        "Real candidate's resume content to use instead of the placeholders:\n"
        '"""\n' + resume_text + '\n"""\n\n'
        + jd_block + "\n"
        "Known issues to address:\n" + issues + "\n\n"
        "Strict rules:\n"
        "- Keep the LaTeX preamble (everything before \\begin{document}) "
        "byte-for-byte identical to the reference template.\n"
        "- Replace the placeholder name/phone/email/LinkedIn/GitHub with "
        "the REAL candidate's own contact details, taken exactly from "
        "their resume text — do not invent or alter any of these.\n"
        "- Do NOT invent companies, job titles, dates, degrees, skills, "
        "or metrics that are not present in the real candidate's resume. "
        "Only rephrase, reorganize, and emphasize what is genuinely there.\n"
        "- Only weave in a keyword from the job description if the "
        "candidate's actual background genuinely supports it.\n"
        "- Only include a \\section (Education, Experience, Projects, "
        "Technical Skills, or others like Certifications/Research if "
        "relevant) if the real candidate's resume actually has that kind "
        "of content — omit sections entirely rather than leaving "
        "placeholder/example content in them.\n"
        "- Escape LaTeX special characters (&, %, $, #, _) in the real "
        "candidate's content wherever they appear.\n"
        "- CRITICAL — the output must fill almost exactly ONE page when "
        "compiled: neither overflowing onto a second page NOR leaving "
        "the bottom third of the page visibly empty. This template is "
        "designed as a one-page resume, so balance is essential:\n"
        "  * By default, include ALL genuinely relevant content from the "
        "candidate's real resume — do not strip it down aggressively.\n"
        "  * Only cut or shorten content if including everything would "
        "clearly overflow onto a second page. In that case, trim the "
        "least-relevant items first (extra bullets on older/less "
        "relevant entries, weaker projects) — not everything uniformly.\n"
        "  * If the candidate's real resume content is on the shorter "
        "side, do NOT invent new facts to pad it — instead write each "
        "genuine bullet with a bit more real detail (from what's already "
        "true in the original) so the page is well used, and keep normal "
        "template spacing rather than leaving a large gap at the bottom.\n"
        "  * Bullets per entry should reflect how much real substance "
        "exists for that entry — typically 2 to 5 bullets is reasonable; "
        "there is no fixed cap, use judgment to fill the page evenly.\n"
        "  * Do not alter the template's font sizes or spacing commands "
        "to force a fit — balance the page purely through content "
        "selection and detail level.\n"
        "- Respond with ONLY the complete .tex file, starting from "
        "\\documentclass and ending with \\end{document}. No explanation, "
        "no markdown code fences, nothing else.\n"
    )
    return prompt
