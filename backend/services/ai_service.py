import json
from config import client, MODEL_NAME
from services.prompts import build_analysis_prompt, build_latex_prompt


def analyze_resume_text(resume_text, job_description=None):
    prompt = build_analysis_prompt(resume_text, job_description)
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.15,
    )
    raw_output = response.choices[0].message.content.strip()

    # the API sometimes wraps the json in ```json ... ``` anyway
    
    raw_output = raw_output.replace("```json", "").replace("```", "").strip()

    result = json.loads(raw_output)
    result["resume_text"] = resume_text  # needed later for auto-fix
    return result


def generate_latex_resume(resume_text, job_description=None, improvements=None, missing_keywords=None):
    prompt = build_latex_prompt(resume_text, job_description, improvements, missing_keywords)
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )
    latex_code = response.choices[0].message.content.strip()
    latex_code = latex_code.replace("```latex", "").replace("```", "").strip()
    return latex_code
