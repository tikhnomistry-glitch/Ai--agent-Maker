"use client";
import { motion } from "framer-motion";
import { MessageSquare, Brain, Bot, Rocket } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: <MessageSquare size={32} />,
    title: "Describe Your Need",
    description: "Simply type what kind of AI agent you need in plain language. No technical jargon required.",
    example: '"I need an AI agent that helps students learn mathematics step by step"',
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: "02",
    icon: <Brain size={32} />,
    title: "Master AI Analyzes",
    description: "Our GPT-4 powered Master AI deeply analyzes your requirement and designs the perfect agent architecture.",
    example: "Analyzing: agent type, capabilities, system prompt, tools needed...",
    color: "from-purple-500 to-pink-500",
  },
  {
    step: "03",
    icon: <Bot size={32} />,
    title: "Agent is Created",
    description: "A fully configured AI agent is generated with a professional system prompt, memory, and all necessary tools.",
    example: "✅ Math Tutor Agent created with memory, step-by-step explanations...",
    color: "from-green-500 to-teal-500",
  },
  {
    step: "04",
    icon: <Rocket size={32} />,
    title: "Start Using It",
    description: "Immediately chat with your new agent or embed it on your website. Your agent is ready to work.",
    example: "Agent deployed! Share link or embed on your website instantly.",
    color: "from-orange-500 to-red-500",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full glass-card text-sm text-purple-400 font-medium mb-4">
            🚀 How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-black mb-4">
            From Idea to Agent
            <br />
            <span className="gradient-text">in 4 Simple Steps</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The simplest way to create professional AI agents. No technical knowledge needed.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-orange-500/20 mx-32" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {/* Step Number */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mx-auto mb-6 relative z-10`}>
                  {step.icon}
                </div>

                <div className="text-center">
                  <span className={`text-5xl font-black bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-20 block mb-2`}>
                    {step.step}
                  </span>
                  <h3 className="font-bold text-white text-xl mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{step.description}</p>
                  <div className="glass-card p-3 rounded-xl">
                    <p className="text-xs text-gray-500 italic">"{step.example}"</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}