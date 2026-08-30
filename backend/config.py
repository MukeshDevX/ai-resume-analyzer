import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

AI_API_KEY = os.getenv("AI_API_KEY")
client = OpenAI(api_key=AI_API_KEY, base_url="https://api.groq.com/openai/v1")

MODEL_NAME = "openai/gpt-oss-120b"
