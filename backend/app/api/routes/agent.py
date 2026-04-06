from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from pydantic import BaseModel
from typing import Optional, List
import uuid

from ...core.database import get_db
from ...models.agent import Agent
from ...models.conversation import Conversation
from ...services.master_ai import generate_agent_from_requirement, chat_with_agent

router = APIRouter()

# ─── Pydantic Schemas ───────────────────────────────────────────────

class CreateAgentRequest(BaseModel):
    requirement: str

class ChatRequest(BaseModel):
    agent_id: str
    message: str
    session_id: Optional[str] = None

class UpdateAgentRequest(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    system_prompt: Optional[str] = None
    temperature: Optional[str] = None
    max_tokens: Optional[str] = None
    has_memory: Optional[bool] = None
    is_public: Optional[bool] = None

# ─── Routes ─────────────────────────────────────────────────────────

@router.post("/create")
async def create_agent(request: CreateAgentRequest, db: AsyncSession = Depends(get_db)):
    """Master AI analyzes requirement and creates a new agent"""
    
    if not request.requirement or len(request.requirement.strip()) < 10:
        raise HTTPException(status_code=400, detail="Please provide a detailed requirement (min 10 characters)")
    
    # Call Master AI to generate agent specification
    result = await generate_agent_from_requirement(request.requirement)
    
    if not result["success"]:
        raise HTTPException(status_code=500, detail=f"AI generation failed: {result['error']}")
    
    agent_spec = result["agent"]
    
    # Save agent to database
    new_agent = Agent(
        name=agent_spec.get("name", "AI Agent"),
        description=agent_spec.get("description", ""),
        system_prompt=agent_spec.get("system_prompt", ""),
        user_requirement=request.requirement,
        model="gpt-4-turbo-preview",
        temperature=str(agent_spec.get("temperature", 0.7)),
        max_tokens=str(agent_spec.get("max_tokens", 2048)),
        has_memory=agent_spec.get("has_memory", True),
        has_web_search=agent_spec.get("has_web_search", False),
        has_code_execution=agent_spec.get("has_code_execution", False),
        tools=agent_spec.get("tools", []),
        agent_type=agent_spec.get("agent_type", "conversational"),
        category=agent_spec.get("category", "general"),
    )
    
    db.add(new_agent)
    await db.commit()
    await db.refresh(new_agent)
    
    return {
        "success": True,
        "agent": new_agent.to_dict(),
        "suggested_first_message": agent_spec.get("suggested_first_message", "Hello! How can I help you?"),
        "capabilities": agent_spec.get("capabilities", []),
        "use_cases": agent_spec.get("use_cases", []),
    }


@router.get("/list")
async def list_agents(db: AsyncSession = Depends(get_db)):
    """Get all created agents"""
    result = await db.execute(select(Agent).where(Agent.is_active == True).order_by(Agent.created_at.desc()))
    agents = result.scalars().all()
    return {"agents": [a.to_dict() for a in agents]}


@router.get("/{agent_id}")
async def get_agent(agent_id: str, db: AsyncSession = Depends(get_db)):
    """Get a specific agent by ID"""
    result = await db.execute(select(Agent).where(Agent.id == agent_id))
    agent = result.scalar_one_or_none()
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    return {"agent": agent.to_dict()}


@router.post("/chat")
async def chat_with_agent_route(request: ChatRequest, db: AsyncSession = Depends(get_db)):
    """Chat with a specific agent"""
    
    # Get agent
    result = await db.execute(select(Agent).where(Agent.id == request.agent_id))
    agent = result.scalar_one_or_none()
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # Get or create session
    session_id = request.session_id or str(uuid.uuid4())
    
    # Get conversation history
    conv_result = await db.execute(
        select(Conversation).where(
            Conversation.agent_id == request.agent_id,
            Conversation.session_id == session_id
        )
    )
    conversation = conv_result.scalar_one_or_none()
    
    history = conversation.messages if conversation else []
    
    # Get AI response
    response = await chat_with_agent(
        system_prompt=agent.system_prompt,
        conversation_history=history,
        user_message=request.message,
        model=agent.model,
        temperature=float(agent.temperature),
        max_tokens=int(agent.max_tokens),
    )
    
    # Update conversation history
    new_messages = history + [
        {"role": "user", "content": request.message},
        {"role": "assistant", "content": response}
    ]
    
    if conversation:
        conversation.messages = new_messages
    else:
        conversation = Conversation(
            agent_id=request.agent_id,
            session_id=session_id,
            messages=new_messages,
        )
        db.add(conversation)
    
    await db.commit()
    
    return {
        "success": True,
        "response": response,
        "session_id": session_id,
        "agent_name": agent.name,
    }


@router.put("/{agent_id}")
async def update_agent(agent_id: str, request: UpdateAgentRequest, db: AsyncSession = Depends(get_db)):
    """Update an agent"""
    result = await db.execute(select(Agent).where(Agent.id == agent_id))
    agent = result.scalar_one_or_none()
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    if request.name: agent.name = request.name
    if request.description: agent.description = request.description
    if request.system_prompt: agent.system_prompt = request.system_prompt
    if request.temperature: agent.temperature = request.temperature
    if request.max_tokens: agent.max_tokens = request.max_tokens
    if request.has_memory is not None: agent.has_memory = request.has_memory
    if request.is_public is not None: agent.is_public = request.is_public
    
    await db.commit()
    await db.refresh(agent)
    
    return {"success": True, "agent": agent.to_dict()}


@router.delete("/{agent_id}")
async def delete_agent(agent_id: str, db: AsyncSession = Depends(get_db)):
    """Delete an agent"""
    result = await db.execute(select(Agent).where(Agent.id == agent_id))
    agent = result.scalar_one_or_none()
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    agent.is_active = False
    await db.commit()
    
    return {"success": True, "message": "Agent deleted successfully"}