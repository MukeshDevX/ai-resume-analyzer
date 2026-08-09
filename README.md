# AI Resume Analyzer

A full-stack project: upload a resume PDF, AI analyzes it against a target
role, and returns a score + strengths + missing skills + suggestions —
shown in a clean React dashboard.

**Stack:** React (Vite) + Tailwind CSS on the frontend, Flask + API
(Llama 3.3) on the backend.

---

## How it works (in plain terms)

1. You drag-drop a resume PDF into the React app.
2. React sends the file to a Flask API endpoint (`/api/analyze`).
3. Flask extracts the text from the PDF (using PyPDF2).
4. Flask sends that text to an LLM (Groq's free Llama 3.3 API) with a
   prompt asking it to act like a recruiter and return structured JSON.
5. Flask sends that JSON back to React, which renders it as a dashboard.

---

## Design

The UI follows a red/white "ATS score checker" landing page pattern:
hero with trust stats → upload stepper (Upload → Details → Analyze) →
results dashboard with score cards and categorized improvement cards →
feature highlights → FAQ. Icons are from `lucide-react`.

The testimonials are clearly labeled "Sample feedback" / "Demo" —
these are illustrative placeholders, not real user submissions.

## Recently added

- **Dark mode** — toggle in the header, preference saved to
  `localStorage`, respects system preference on first visit.
- **PDF report download** — on the results screen, "Download Report
  (PDF)" exports the score and recommendations via `jsPDF`, entirely
  client-side (no server round-trip).
- **About section** — before you deploy this, open `App.jsx`, find
  `AboutSection`, and replace the placeholder GitHub/LinkedIn URLs
  (`https://github.com/mukeshdevx`, `https://linkedin.com/in/mukeshdevx`)
  with your real profile links.
- **Honest stats banner** — replaced fake usage numbers ("10,000+
  resumes analyzed") with actual, truthful facts about the project
  (personal project, open source, which AI model it uses). Don't put
  fabricated user/traffic numbers on a portfolio project — it's an easy
  thing for an interviewer to notice and it undermines trust in
  everything else you say about it.

## Setup — Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  
pip install -r requirements.txt
```

1. Get a **free** Groq API key: https://console.groq.com → API Keys
2. Copy `.env.example` to `.env` and paste your key:
   ```bash
   cp .env.example .env
   ```
   ```
   GROQ_API_KEY=your_actual_key_here
   ```
3. Run the server:
   ```bash
   python app.py
   ```
   Backend runs at `http://localhost:5000`

---

## Setup — Frontend

```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`

Open that URL, upload a PDF resume, pick a target role, and click
**Analyze resume**.

---

## Project structure

```
ai-resume-analyzer/
├── backend/
│   ├── app.py                    # Flask entry point — creates app, registers routes
│   ├── config.py                 # env loading + Groq client setup
│   ├── requirements.txt
│   ├── .env.example
│   ├── services/
│   │   ├── pdf_service.py        # PDF text extraction
│   │   ├── prompts.py            # All AI prompt-building logic
│   │   └── ai_service.py         # Wraps the Groq API calls
│   └── routes/
│       └── resume_routes.py      # /api/analyze, /api/fix-resume, /api/health
└── frontend/
    ├── src/
    │   ├── App.jsx               # Composes all components together
    │   ├── constants.js          # API URLs
    │   ├── main.jsx
    │   ├── index.css
    │   └── components/
    │       ├── Header.jsx
    │       ├── Hero.jsx
    │       ├── Stepper.jsx
    │       ├── Dropzone.jsx
    │       ├── FileCard.jsx
    │       ├── LoadingPanel.jsx
    │       ├── Results.jsx
    │       ├── ScoreCard.jsx
    │       ├── KeywordCard.jsx
    │       ├── WhySection.jsx
    │       ├── StatsBanner.jsx
    │       ├── AboutSection.jsx
    │       └── Footer.jsx
    ├── public/
    │   └── favicon.svg
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── tailwind.config.js
```

---

## Why this project is worth putting on your resume

- **Frontend-heavy**: drag-and-drop upload, loading states, conditional
  rendering, a real dashboard UI — not just a form.
- **Real AI integration**: PDF text extraction + LLM API call with a
  structured JSON response (a genuinely useful pattern, not a toy demo).
- **Clean separation**: React only talks to your own API — it never
  touches the AI key directly, which is how it should be done in
  production too.
