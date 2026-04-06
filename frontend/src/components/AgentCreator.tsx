"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, Sparkles, Zap, Brain, CheckCircle,
  Copy, MessageSquare, Trash2, ChevronDown, ChevronUp, Loader2
} from "lucide-react";
import { createAgent, chatWithAgent, getAgents, deleteAgent, Agent } from "@/lib/api";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";

const exampleRequirements = [
  "I need an AI customer support agent for my e-commerce store",
  "Create a math tutor that helps high school students step by step",
  "Build a professional email writer for business communication",
  "I want a coding assistant that helps debug Python code",
  "Make a fitness coach that creates personalized workout plans",
  "Create a legal document summarizer for lawyers",
];

export default function AgentCreator() {
  const [requirement, setRequirement] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createdAgent, setCreatedAgent] = useState<Agent | null>(null);
  const [suggestedMessage, setSuggestedMessage] = useState("");
  const [capabilities, setCapabilities] = useState<string[]>([]);
  const [useCases, setUseCases] = useState<string[]>([]);

  // Chat state
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatting, setIsChatting] = useState(false);
  const [sessionId] = useState(uuidv4());
  const [showPrompt, setShowPrompt] = useState(false);

  // Agents list
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loadingAgents, setLoadingAgents] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    loadAgents();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const loadAgents = async () => {
    setLoadingAgents(true);
    try {
      const data = await getAgents();
      setAgents(data.agents);
    } catch {
      // silent
    } finally {
      setLoadingAgents(false);
    }
  };

  const handleCreateAgent = async () => {
    if (!requirement.trim() || requirement.trim().length < 10) {
      toast.error("Please describe your requirement in more detail (min 10 characters)");
      return;
    }

    setIsCreating(true);
    setChatMessages([]);
    setCreatedAgent(null);

    try {
      toast.loading("Master AI is analyzing your requirement...", { id: "creating" });
      const result = await createAgent(requirement);

      setCreatedAgent(result.agent);
      setSuggestedMessage(result.suggested_first_message);
      setCapabilities(result.capabilities);
      setUseCases(result.use_cases);

      // Auto-start chat with suggested message
      setChatMessages([
        { role: "assistant", content: result.suggested_first_message }
      ]);

      toast.success(`✅ "${result.agent.name}" created successfully!`, { id: "creating" });
      loadAgents();

      // Scroll to chat
      setTimeout(() => {
        document.getElementById("chat-section")?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Failed to create agent";
      toast.error(errMsg, { id: "creating" });
    } finally {
      setIsCreating(false);
    }
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim() || !createdAgent || isChatting) return;

    const userMessage = chatInput.trim();
    setChatInput("");
    setChatMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsChatting(true);

    try {
      const result = await chatWithAgent(createdAgent.id, userMessage, sessionId);
      setChatMessages(prev => [...prev, { role: "assistant", content: result.response }]);
    } catch {
      toast.error("Failed to get response. Please try again.");
      setChatMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsChatting(false);
    }
  };

  const handleSelectAgent = async (agent: Agent) => {
    setCreatedAgent(agent);
    setChatMessages([{ role: "assistant", content: `Hello! I'm ${agent.name}. How can I help you today?` }]);
    setCapabilities([]);
    setUseCases([]);
    document.getElementById("chat-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDeleteAgent = async (agentId: string) => {
    try {
      await deleteAgent(agentId);
      toast.success("Agent deleted");
      loadAgents();
      if (createdAgent?.id === agentId) {
        setCreatedAgent(null);
        setChatMessages([]);
      }
    } catch {
      toast.error("Failed to delete agent");
    }
  };

  const copyPrompt = () => {
    if (createdAgent) {
      navigator.clipboard.writeText(createdAgent.system_prompt);
      toast.success("System prompt copied!");
    }
  };

  const agentTypeColor: Record<string, string> = {
    conversational: "bg-blue-500/20 text-blue-400",
    analytical: "bg-yellow-500/20 text-yellow-400",
    creative: "bg-pink-500/20 text-pink-400",
    technical: "bg-green-500/20 text-green-400",
    customer_service: "bg-purple-500/20 text-purple-400",
    educational: "bg-cyan-500/20 text-cyan-400",
    research: "bg-orange-500/20 text-orange-400",
  };

  return (
    <section id="create" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full glass-card text-sm text-green-400 font-medium mb-4">
            🤖 Create Your Agent
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Tell Us What You Need,
            <br />
            <span className="gradient-text">We Build Your Agent</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Describe your requirement in plain language. Our Master AI will create a professional agent for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Creator Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl"
            >
              <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                <Brain size={16} className="text-blue-400" />
                Describe Your Agent Requirement
              </label>
              <textarea
                ref={textareaRef}
                value={requirement}
                onChange={e => setRequirement(e.target.value)}
                placeholder="Example: I need an AI agent that acts as a professional customer support representative for my SaaS product. It should answer questions about pricing, features, and troubleshoot common issues..."
                className="w-full bg-transparent border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-blue-500/50 text-sm leading-relaxed h-36"
                onKeyDown={e => {
                  if (e.key === "Enter" && e.ctrlKey) handleCreateAgent();
                }}
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-600">{requirement.length} characters • Ctrl+Enter to create</span>
                <button
                  onClick={handleCreateAgent}
                  disabled={isCreating || requirement.trim().length < 10}
                  className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? (
                    <><Loader2 size={18} className="animate-spin" /> Creating Agent...</>
                  ) : (
                    <><Zap size={18} /> Create Agent</>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Example Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-5 rounded-2xl"
            >
              <p className="text-sm text-gray-500 mb-3 font-medium">💡 Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {exampleRequirements.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => setRequirement(ex)}
                    className="text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 hover:border-white/15 transition-all"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Agent Info Card */}
            {createdAgent && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-6 rounded-2xl border border-green-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Bot size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{createdAgent.name}</h3>
                      <p className="text-gray-400 text-sm">{createdAgent.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${agentTypeColor[createdAgent.agent_type] || "bg-gray-500/20 text-gray-400"}`}>
                      {createdAgent.agent_type}
                    </span>
                    <CheckCircle size={20} className="text-green-400" />
                  </div>
                </div>

                {/* Capabilities */}
                {capabilities.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-medium">CAPABILITIES</p>
                    <div className="flex flex-wrap gap-2">
                      {capabilities.map((cap, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20">
                          ✓ {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Use Cases */}
                {useCases.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-medium">USE CASES</p>
                    <div className="flex flex-wrap gap-2">
                      {useCases.map((uc, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          📌 {uc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* System Prompt Toggle */}
                <button
                  onClick={() => setShowPrompt(!showPrompt)}
                  className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors mt-2"
                >
                  {showPrompt ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {showPrompt ? "Hide" : "View"} System Prompt
                </button>

                {showPrompt && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-3 relative"
                  >
                    <div className="bg-black/30 rounded-xl p-4 text-xs text-gray-400 font-mono leading-relaxed max-h-48 overflow-y-auto">
                      {createdAgent.system_prompt}
                    </div>
                    <button
                      onClick={copyPrompt}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Copy size={12} className="text-gray-400" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Chat Section */}
            {createdAgent && (
              <motion.div
                id="chat-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl overflow-hidden border border-blue-500/20"
              >
                {/* Chat Header */}
                <div className="flex items-center gap-3 p-4 border-b border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{createdAgent.name}</p>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-gray-500">Active</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setCreatedAgent(null); setChatMessages([]); }}
                    className="ml-auto p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                          <Bot size={14} className="text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                          msg.role === "user" ? "chat-bubble-user text-white" : "chat-bubble-ai text-gray-200"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <ReactMarkdown className="prose prose-invert prose-sm max-w-none">
                            {msg.content}
                          </ReactMarkdown>
                        ) : (
                          msg.content
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isChatting && (
                    <div className="flex justify-start">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-2 mt-1">
                        <Bot size={14} className="text-white" />
                      </div>
                      <div className="chat-bubble-ai px-4 py-3">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-white/5">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSendMessage()}
                      placeholder={`Message ${createdAgent.name}...`}
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50"
                      disabled={isChatting}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isChatting || !chatInput.trim()}
                      className="btn-primary w-12 h-12 rounded-xl flex items-center justify-center text-white disabled:opacity-50"
                    >
                      {isChatting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Agents List */}
          <div className="space-y-4">
            <div className="glass-card p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-yellow-400" />
                  Your Agents
                </h3>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                  {agents.length} created
                </span>
              </div>

              {loadingAgents ? (
                <div className="text-center py-8">
                  <Loader2 size={24} className="animate-spin text-blue-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Loading agents...</p>
                </div>
              ) : agents.length === 0 ? (
                <div className="text-center py-8">
                  <Bot size={32} className="text-gray-700 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">No agents yet.</p>
                  <p className="text-xs text-gray-700 mt-1">Create your first agent above!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {agents.map((agent) => (
                    <motion.div
                      key={agent.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        createdAgent?.id === agent.id
                          ? "border-blue-500/50 bg-blue-500/10"
                          : "border-white/5 bg-white/3 hover:bg-white/5"
                      }`}
                      onClick={() => handleSelectAgent(agent)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                            <Bot size={14} className="text-white" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-white truncate">{agent.name}</p>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${agentTypeColor[agent.agent_type] || "bg-gray-500/20 text-gray-400"}`}>
                              {agent.agent_type}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={e => { e.stopPropagation(); handleSelectAgent(agent); }}
                            className="p-1.5 rounded-lg hover:bg-blue-500/20 text-gray-500 hover:text-blue-400 transition-colors"
                          >
                            <MessageSquare size={12} />
                          </button>
                          <button
                            onClick={e => { e.stopPropagation(); handleDeleteAgent(agent.id); }}
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats Card */}
            <div className="glass-card p-5 rounded-2xl">
              <h3 className="font-bold text-white mb-4 text-sm">📊 Platform Stats</h3>
              <div className="space-y-3">
                {[
                  { label: "Agents Created", value: agents.length.toString(), color: "text-blue-400" },
                  { label: "AI Model", value: "GPT-4", color: "text-purple-400" },
                  { label: "Avg Creation Time", value: "~15s", color: "text-green-400" },
                  { label: "Success Rate", value: "99.9%", color: "text-yellow-400" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{stat.label}</span>
                    <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}