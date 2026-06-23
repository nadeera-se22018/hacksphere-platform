from fastapi import FastAPI

app = FastAPI(title="Submission & Evaluation Service")

@app.get("/")
def read_root():
    return {"message": "Submission & Evaluation Service is up and running!"}