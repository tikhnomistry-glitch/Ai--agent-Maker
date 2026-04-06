from sqlalchemy import Column, String, Text, DateTime, Boolean, JSON
from sqlalchemy.sql import func
import uuid
from ..core.database import Base

class Agent(Base):
    __tablename__ = "agents"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    system_prompt = Column(Text, nullable=False)
    user_requirement = Column(Text, nullable=False)
    
    # Agent Configuration
    model = Column(String(100), default="gpt-4-turbo-preview")
    temperature = Column(String(10), default="0.7")
    max_tokens = Column(String(10), default="2048")
    
    # Features
    has_memory = Column(Boolean, default=True)
    has_web_search = Column(Boolean, default=False)
    has_code_execution = Column(Boolean, default=False)
    tools = Column(JSON, default=list)
    
    # Agent Type
    agent_type = Column(String(100), default="conversational")
    category = Column(String(100), default="general")
    
    # Status
    is_active = Column(Boolean, default=True)
    is_public = Column(Boolean, default=False)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Usage Stats
    total_conversations = Column(String(20), default="0")
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "system_prompt": self.system_prompt,
            "user_requirement": self.user_requirement,
            "model": self.model,
            "temperature": self.temperature,
            "max_tokens": self.max_tokens,
            "has_memory": self.has_memory,
            "has_web_search": self.has_web_search,
            "has_code_execution": self.has_code_execution,
            "tools": self.tools,
            "agent_type": self.agent_type,
            "category": self.category,
            "is_active": self.is_active,
            "is_public": self.is_public,
            "created_at": str(self.created_at) if self.created_at else None,
            "total_conversations": self.total_conversations,
        }