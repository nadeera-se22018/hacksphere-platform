from fastapi import FastAPI
from config.database import engine, Base
from models import submission, evaluation

app = FastAPI(title="Submission & Evaluation Service")

Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Submission & Evaluation Service is up and running!"}