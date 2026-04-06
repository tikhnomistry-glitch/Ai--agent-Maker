from langchain_openai import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from ..core.config import settings
import json

MASTER_SYSTEM_PROMPT = """
You are the MASTER AI ARCHITECT — an elite AI agent designer with deep expertise in prompt engineering, AI system design, and user psychology.

Your sole mission is to analyze a user's requirement and generate a COMPLETE, PROFESSIONAL AI Agent specification.

## YOUR ANALYSIS PROCESS:
1. UNDERSTAND the user's core need (what problem they want to solve)
2. IDENTIFY the agent type (assistant, analyst, creative, technical, customer service, etc.)
3. DESIGN the perfect system prompt for that agent
4. DETERMINE what tools and capabilities the agent needs
5. SET the right parameters (temperature, model, etc.)

## OUTPUT FORMAT:
You MUST respond with a valid JSON object in this EXACT format:

{
  "name": "Agent Name (creative, professional name)",
  "description": "One clear sentence describing what this agent does",
  "agent_type": "one of: conversational | analytical | creative | technical | customer_service | educational | research",
  "category": "one of: general | business | education | health | finance | technology | marketing | legal | science | entertainment",
  "system_prompt": "The complete, detailed system prompt for this agent (minimum 300 words, professional quality)",
  "temperature": 0.7,
  "max_tokens": 2048,
  "has_memory": true,
  "has_web_search": false,
  "has_code_execution": false,
  "tools": ["list", "of", "tools", "needed"],
  "suggested_first_message": "The first message this agent should say to users",
  "capabilities": ["list", "of", "key", "capabilities"],
  "use_cases": ["example use case 1", "example use case 2", "example use case 3"]
}

## SYSTEM PROMPT DESIGN RULES:
- Give the agent a clear identity and personality
- Define exact scope of expertise
- Include specific instructions for how to handle requests
- Add safety guidelines and boundaries
- Include output format preferences
- Make it professional, detailed, and effective
- Minimum 300 words for the system prompt

## AGENT TYPE GUIDELINES:
- conversational: General assistant, warm and helpful
- analytical: Data-driven, precise, structured responses
- creative: Imaginative, expressive, idea-generating
- technical: Code, systems, technical documentation
- customer_service: Empathetic, solution-focused, professional
- educational: Patient, clear explanations, step-by-step
- research: Thorough, cited, comprehensive analysis

IMPORTANT: Always respond with ONLY the JSON object. No extra text before or after.
"""

async def generate_agent_from_requirement(user_requirement: str) -> dict:
    """
    Master AI analyzes user requirement and generates complete agent specification
    """
    try:
        llm = ChatOpenAI(
            api_key=settings.OPENAI_API_KEY,
            model=settings.OPENAI_MODEL,
            temperature=0.3,  # Low temperature for consistent JSON output
        )
        
        messages = [
            SystemMessage(content=MASTER_SYSTEM_PROMPT),
            HumanMessage(content=f"""
User Requirement: {user_requirement}

Analyze this requirement carefully and generate the complete AI Agent specification as a JSON object.
Make the system prompt extremely detailed and professional (minimum 300 words).
The agent should be perfectly tailored to solve the user's specific need.
""")
        ]
        
        response = await llm.ainvoke(messages)
        response_text = response.content.strip()
        
        # Clean JSON response
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
        
        agent_spec = json.loads(response_text.strip())
        return {"success": True, "agent": agent_spec}
        
    except json.JSONDecodeError as e:
        return {"success": False, "error": f"JSON parsing error: {str(e)}"}
    except Exception as e:
        return {"success": False, "error": str(e)}


async def chat_with_agent(
    system_prompt: str,
    conversation_history: list,
    user_message: str,
    model: str = "gpt-4-turbo-preview",
    temperature: float = 0.7,
    max_tokens: int = 2048
) -> str:
    """
    Chat with a created agent using its system prompt
    """
    try:
        llm = ChatOpenAI(
            api_key=settings.OPENAI_API_KEY,
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        
        messages = [SystemMessage(content=system_prompt)]
        
        # Add conversation history
        for msg in conversation_history[-10:]:  # Last 10 messages for context
            if msg["role"] == "user":
                messages.append(HumanMessage(content=msg["content"]))
            elif msg["role"] == "assistant":
                from langchain.schema import AIMessage
                messages.append(AIMessage(content=msg["content"]))
        
        # Add current user message
        messages.append(HumanMessage(content=user_message))
        
        response = await llm.ainvoke(messages)
        return response.content
        
    except Exception as e:
        return f"Error: {str(e)}"