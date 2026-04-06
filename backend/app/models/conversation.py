from sqlalchemy import Column, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
import uuid
from ..core.database import Base

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    agent_id = Column(String, ForeignKey("agents.id"), nullable=False)
    session_id = Column(String(255), nullable=False)
    
    # Messages stored as JSON array
    messages = Column(JSON, default=list)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    def to_dict(self):
        return {
            "id": self.id,
            "agent_id": self.agent_id,
            "session_id": self.session_id,
            "messages": self.messages,
            "created_at": str(self.created_at) if self.created_at else None,
        }