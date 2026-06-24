from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class SubmissionBase(BaseModel):
    team_id: str
    event_id: str
    github_link: Optional[str] = None
    live_url: Optional[str] = None

class SubmissionCreate(SubmissionBase):
    pass

class SubmissionResponse(SubmissionBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True