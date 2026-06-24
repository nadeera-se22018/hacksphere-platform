from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from config.database import Base

class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    team_id = Column(String, index=True, nullable=False) 
    event_id = Column(String, index=True, nullable=False)
    
    github_link = Column(String, nullable=True)
    live_url = Column(String, nullable=True)
    status = Column(String, default="pending") 
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    evaluations = relationship("Evaluation", back_populates="submission", cascade="all, delete-orphan")