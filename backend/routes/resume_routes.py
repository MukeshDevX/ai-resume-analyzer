import json
from flask import Blueprint, request, jsonify
from services.pdf_service import extract_text_from_pdf
from services.ai_service import analyze_resume_text, generate_latex_resume
from extensions import limiter

resume_bp = Blueprint("resume", __name__, url_prefix="/api")

# Length caps as defense in depth — even though the file itself is capped
# at 5MB, extracted text or a raw pasted job description could still be
# unreasonably long, which just wastes tokens/cost on the AI call.
MAX_RESUME_CHARS = 20000
MAX_JD_CHARS = 5000


@resume_bp.route("/analyze", methods=["POST"])
@limiter.limit("10 per hour")
def analyze_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No resume file uploaded"}), 400

    file = request.files["resume"]
    job_description = request.form.get("job_description", "").strip()[:MAX_JD_CHARS] or None

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    if not file.filename.lower().endswith(".pdf"):
        return jsonify({"error": "Only PDF files are supported"}), 400

    try:
        resume_text = extract_text_from_pdf(file)
    except Exception as e:
        return jsonify({"error": f"Could not read PDF: {str(e)}"}), 400

    if len(resume_text) < 50:
        return jsonify({"error": "Couldn't extract enough text from this PDF"}), 400

    resume_text = resume_text[:MAX_RESUME_CHARS]

    try:
        result = analyze_resume_text(resume_text, job_description)
        return jsonify(result)
    except json.JSONDecodeError:
        return jsonify({"error": "AI response could not be parsed. Please try again."}), 500
    except Exception as e:
        return jsonify({"error": f"AI request failed: {str(e)}"}), 500


@resume_bp.route("/fix-resume", methods=["POST"])
@limiter.limit("10 per hour")
def fix_resume():
    data = request.get_json(silent=True) or {}
    resume_text = (data.get("resume_text") or "").strip()[:MAX_RESUME_CHARS]
    job_description = (data.get("job_description") or "").strip()[:MAX_JD_CHARS] or None
    improvements = data.get("improvements") or []
    missing_keywords = data.get("missing_keywords") or []

    if len(resume_text) < 50:
        return jsonify({"error": "Missing resume text to fix. Please re-analyze your resume first."}), 400

    try:
        latex_code = generate_latex_resume(resume_text, job_description, improvements, missing_keywords)
        return jsonify({"latex_code": latex_code})
    except Exception as e:
        return jsonify({"error": f"AI request failed: {str(e)}"}), 500


@resume_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok"})
