from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def root():
    return {"ok": True, "service": "python-ai"}

@app.post("/generate")
async def generate(payload: dict):
    # placeholder - implement later
    return {"code": "// placeholder", "explanation": "placeholder"}
