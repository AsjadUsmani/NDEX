# python-ai/main.py
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import re
import os

app = FastAPI(title="AI Code Generator (placeholder)")

# Basic request schema
class GenRequest(BaseModel):
    prompt: str
    language: str = "python"
    options: dict = {}

# Simple denylist patterns (expand this later)
PROHIBITED_PATTERNS = [
    r"\b(make a virus|create malware|rm -rf|-rf /|format c:)\b",
    r"\b(ddos|fork bomb)\b",
]

def contains_prohibited(text: str) -> bool:
    lower = text.lower()
    for p in PROHIBITED_PATTERNS:
        if re.search(p, lower):
            return True
    return False

@app.get("/")
async def root():
    return {"ok": True, "service": "python-ai"}

@app.post("/generate")
async def generate(req: GenRequest):
    # Basic safety check
    if contains_prohibited(req.prompt):
        raise HTTPException(status_code=400, detail="Request contains disallowed instructions")

    # Placeholder behavior for Day 4: return a simple templated response
    language = req.language or "python"
    code = f"// Placeholder code for language: {language}\n// Prompt: {req.prompt}\n\nprint('This is a placeholder. Replace with real LLM output.')\n"
    explanation = "This is a placeholder explanation. Replace with a real LLM call in production."

    # Example usage object (no real tokens yet)
    usage = {"total_tokens": 0}

    return {"code": code, "explanation": explanation, "model": "placeholder-model", "usage": usage}
