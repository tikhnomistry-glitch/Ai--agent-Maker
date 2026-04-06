from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # App
    APP_NAME: str = "AI Agent Maker"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # OpenAI
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4-turbo-preview"
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./agentforge.db"
    
    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Pinecone (Optional)
    PINECONE_API_KEY: Optional[str] = None
    PINECONE_ENV: Optional[str] = None
    PINECONE_INDEX: Optional[str] = "agent-memory"
    
    # CORS
    FRONTEND_URL: str = "http://localhost:3000"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()