from fastapi import FastAPI
from config.database import engine, Base
from models import submission, evaluation
from routers import submission as submission_router
from routers import evaluation as evaluation_router

app = FastAPI(title="Submission & Evaluation Service")

Base.metadata.create_all(bind=engine)

app.include_router(submission_router.router, prefix="/api/submissions", tags=["Submissions"])
app.include_router(evaluation_router.router, prefix="/api/evaluations", tags=["Evaluations"])

@app.get("/")
def read_root():
    return {"message": "Submission & Evaluation Service is up and running!"}