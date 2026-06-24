from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import submission as models
from schemas import submission as schemas
from config.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.SubmissionResponse, status_code=201)
def create_submission(submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    
    db_submission = models.Submission(
        team_id=submission.team_id,
        event_id=submission.event_id,
        github_link=submission.github_link,
        live_url=submission.live_url
    )
    
    db.add(db_submission)
    db.commit()
    
    db.refresh(db_submission)
    
    return db_submission

router.get("/event/{event_id}", response_model=list[schemas.SubmissionResponse])
def get_submissions_by_event(event_id: str, db: Session = Depends(get_db)):
    
    submissions = db.query(models.Submission).filter(models.Submission.event_id == event_id).all()
    
    return submissions