import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Agent {
  id: string;
  name: string;
  description: string;
  system_prompt: string;
  user_requirement: string;
  model: string;
  temperature: string;
  max_tokens: string;
  has_memory: boolean;
  has_web_search: boolean;
  has_code_execution: boolean;
  tools: string[];
  agent_type: string;
  category: string;
  is_active: boolean;
  created_at: string;
  total_conversations: string;
}

export interface CreateAgentResponse {
  success: boolean;
  agent: Agent;
  suggested_first_message: string;
  capabilities: string[];
  use_cases: string[];
}

export interface ChatResponse {
  success: boolean;
  response: string;
  session_id: string;
  agent_name: string;
}

// Create a new agent from requirement
export const createAgent = async (requirement: string): Promise<CreateAgentResponse> => {
  const response = await api.post("/api/agents/create", { requirement });
  return response.data;
};

// Get all agents
export const getAgents = async (): Promise<{ agents: Agent[] }> => {
  const response = await api.get("/api/agents/list");
  return response.data;
};

// Get single agent
export const getAgent = async (agentId: string): Promise<{ agent: Agent }> => {
  const response = await api.get(`/api/agents/${agentId}`);
  return response.data;
};

// Chat with agent
export const chatWithAgent = async (
  agentId: string,
  message: string,
  sessionId?: string
): Promise<ChatResponse> => {
  const response = await api.post("/api/agents/chat", {
    agent_id: agentId,
    message,
    session_id: sessionId,
  });
  return response.data;
};

// Delete agent
export const deleteAgent = async (agentId: string) => {
  const response = await api.delete(`/api/agents/${agentId}`);
  return response.data;
};

export default api;