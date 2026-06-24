from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import submission as submission_models, evaluation as evaluation_models
from schemas import evaluation as schemas
from config.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.EvaluationResponse, status_code=201)
def create_evaluation(evaluation: schemas.EvaluationCreate, submission_id: int, db: Session = Depends(get_db)):
    
    submission = db.query(submission_models.Submission).filter(submission_models.Submission.id == submission_id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
        
    db_evaluation = evaluation_models.Evaluation(
        submission_id=submission_id,
        evaluator_id=evaluation.evaluator_id,
        score=evaluation.score,
        feedback=evaluation.feedback
    )
    
    db.add(db_evaluation)
    
    submission.status = "evaluated"
    
    db.commit()
    db.refresh(db_evaluation)
    
    return db_evaluation

@router.get("/submission/{submission_id}", response_model=list[schemas.EvaluationResponse])
def get_evaluations_by_submission(submission_id: int, db: Session = Depends(get_db)):
    evaluations = db.query(evaluation_models.Evaluation).filter(evaluation_models.Evaluation.submission_id == submission_id).all()
    return evaluations