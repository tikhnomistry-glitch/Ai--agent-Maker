"use client";
import { motion } from "framer-motion";
import { Brain, Zap, Shield, Globe, Database, Code2, MessageSquare, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Brain size={28} />,
    title: "Master AI Architect",
    description: "Our GPT-4 powered Master AI analyzes your requirement deeply and designs the perfect agent with optimal system prompts.",
    color: "from-blue-500 to-cyan-500",
    glow: "rgba(14, 165, 233, 0.2)",
  },
  {
    icon: <Zap size={28} />,
    title: "Instant Generation",
    description: "Go from idea to working AI agent in under 30 seconds. No configuration, no coding, no complexity.",
    color: "from-yellow-500 to-orange-500",
    glow: "rgba(234, 179, 8, 0.2)",
  },
  {
    icon: <Database size={28} />,
    title: "Persistent Memory",
    description: "Every agent remembers context across conversations. No repetition, seamless experience every time.",
    color: "from-purple-500 to-pink-500",
    glow: "rgba(139, 92, 246, 0.2)",
  },
  {
    icon: <Globe size={28} />,
    title: "Web Integration",
    description: "Embed your agent on any website with a single line of code. Works everywhere — React, WordPress, plain HTML.",
    color: "from-green-500 to-teal-500",
    glow: "rgba(34, 197, 94, 0.2)",
  },
  {
    icon: <Code2 size={28} />,
    title: "API Access",
    description: "Every agent gets its own REST API endpoint. Connect it to your apps, automations, or workflows.",
    color: "from-pink-500 to-rose-500",
    glow: "rgba(236, 72, 153, 0.2)",
  },
  {
    icon: <Shield size={28} />,
    title: "Safety & Control",
    description: "Full control over agent behavior, tone, and boundaries. Edit, update, or delete agents anytime.",
    color: "from-indigo-500 to-blue-500",
    glow: "rgba(99, 102, 241, 0.2)",
  },
  {
    icon: <MessageSquare size={28} />,
    title: "Multi-turn Conversations",
    description: "Agents maintain rich conversation history with intelligent context management for natural dialogue.",
    color: "from-cyan-500 to-blue-500",
    glow: "rgba(6, 182, 212, 0.2)",
  },
  {
    icon: <Sparkles size={28} />,
    title: "Smart Agent Types",
    description: "7 specialized agent types: conversational, analytical, creative, technical, educational, research & customer service.",
    color: "from-amber-500 to-yellow-500",
    glow: "rgba(245, 158, 11, 0.2)",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full glass-card text-sm text-blue-400 font-medium mb-4">
            ✨ Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            Everything You Need to Build
            <br />
            <span className="gradient-text">World-Class AI Agents</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional-grade features that make your agents smarter, faster, and more capable.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl group cursor-pointer"
              style={{ "--glow": feature.glow } as React.CSSProperties}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-white mb-2 text-lg">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}