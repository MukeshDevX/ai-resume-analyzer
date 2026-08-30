# AI Resume Analyzer

I built a tool that lets users upload their resume and get instant AI
feedback. On the frontend I handled file uploads with drag-and-drop,
loading and error states, and a results dashboard. On the backend, I
used Flask to extract text from the PDF and pass it to an LLM with a
prompt engineered to return structured JSON, which the frontend then
renders.

**Stack:** React (Vite) + Tailwind CSS on the frontend, Flask + an LLM API
(via API) on the backend.

---

## How it works (in plain terms)

1. You drag-drop a resume PDF into the React app.
2. React sends the file to a Flask API endpoint (`/api/analyze`).
3. Flask extracts the text from the PDF (using PyPDF2).
4. Flask sends that text to an LLM (via API) with a
   prompt asking it to act like a recruiter and return structured JSON.
5. Flask sends that JSON back to React, which renders it as a dashboard.

---

## Project structure

```
ai-resume-analyzer/
├── backend/
│   ├── app.py                   
│   ├── config.py                 
│   ├── requirements.txt
│   ├── .env.example
│   ├── services/
│   │   ├── pdf_service.py        
│   │   ├── prompts.py            
│   │   └── ai_service.py         
│   └── routes/
│       └── resume_routes.py      
└── frontend/
    ├── src/
    │   ├── App.jsx             
    │   ├── constants.js          
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
