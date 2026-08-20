import os
from flask import Flask, jsonify
from flask_cors import CORS
from routes.resume_routes import resume_bp
from extensions import limiter

app = Flask(__name__)

# Local dev is always allowed. Once the frontend is deployed, set
# FRONTEND_URL in Render's environment variables to its real URL —
# no code change needed.
allowed_origins = ["http://localhost:5173"]
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url.strip().rstrip("/"))
CORS(app, origins=allowed_origins)

# Reject anything above 5MB before it even reaches a route (the frontend
# already checks this, but that check is trivial to bypass by calling
# the API directly, e.g. with curl or Postman)
app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024

# Without this, anyone could script repeated calls to /api/analyze or
# /api/fix-resume and burn through the AI API quota (or run up a bill,
# on a paid plan) — each call costs real money/quota on the AI provider.
limiter.init_app(app)

app.register_blueprint(resume_bp)


@app.errorhandler(413)
def file_too_large(e):
    return jsonify({"error": "File is too large. Max size is 5MB."}), 413


@app.errorhandler(429)
def rate_limited(e):
    return jsonify({"error": "Too many requests. Please wait a bit and try again."}), 429


if __name__ == "__main__":
    app.run(debug=True, port=5000)
