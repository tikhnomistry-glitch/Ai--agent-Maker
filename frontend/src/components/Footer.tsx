"use client";
import { Bot, Github, Twitter, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">AgentForge</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
              The most powerful AI Agent creation platform. Describe your need, 
              and our Master AI builds a professional agent for you instantly.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 glass-card rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                <Github size={16} />
              </a>
              <a href="#" className="w-9 h-9 glass-card rounded-lg flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Product</h4>
            <ul className="space-y-2">
              {["Features", "How It Works", "Create Agent", "API Docs"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Tech Stack</h4>
            <ul className="space-y-2">
              {["Next.js 14", "FastAPI", "LangChain", "GPT-4", "PostgreSQL"].map((item) => (
                <li key={item}>
                  <span className="text-gray-500 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2024 AgentForge. Built with{" "}
            <Heart size={12} className="inline text-red-500" /> using AI
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
              <a key={item} href="#" className="text-gray-600 hover:text-white text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}