from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class EvaluationBase(BaseModel):
    evaluator_id: str
    score: int
    feedback: Optional[str] = None

class EvaluationCreate(EvaluationBase):
    pass

class EvaluationResponse(EvaluationBase):
    id: int
    submission_id: int
    created_at: datetime

    class Config:
        from_attributes = True