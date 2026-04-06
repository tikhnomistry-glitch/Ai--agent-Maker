"use client";
import { motion } from "framer-motion";
import { ArrowDown, Bot, Sparkles, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-blue-400 font-medium mb-8"
        >
          <Sparkles size={16} className="text-yellow-400" />
          Powered by GPT-4 + LangChain
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-tight"
        >
          Describe Your Need,
          <br />
          <span className="gradient-text">AI Builds Your Agent</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Just tell us what you need. Our Master AI analyzes your requirement
          and instantly creates a <strong className="text-white">custom, professional AI agent</strong> tailored
          exactly for you — no coding required.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <button
            onClick={() => document.getElementById("create")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-bold text-white glow-blue"
          >
            <Zap size={20} />
            Create Your Agent Free
          </button>
          <button
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            className="glass-card flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-gray-300 hover:text-white transition-colors"
          >
            How It Works
          </button>
        </motion.div>

        {/* Floating Agent Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-12"
        >
          {[
            { icon: "🎯", label: "Sales Agent" },
            { icon: "📚", label: "Tutor Agent" },
            { icon: "💻", label: "Code Agent" },
            { icon: "💬", label: "Support Agent" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass-card p-4 rounded-xl text-center cursor-pointer"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs text-gray-400">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center"
        >
          <ArrowDown size={20} className="text-gray-600" />
        </motion.div>
      </div>
    </section>
  );
}