"use client";
import { useState } from "react";
import { Bot, Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card rounded-none border-x-0 border-t-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">AgentForge</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors text-sm">How It Works</a>
            <a href="#create" className="text-gray-400 hover:text-white transition-colors text-sm">Create Agent</a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => document.getElementById("create")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
            >
              <Zap size={16} />
              Create Agent
            </button>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <a href="#features" className="text-gray-400 text-sm" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-gray-400 text-sm" onClick={() => setMenuOpen(false)}>How It Works</a>
            <button
              onClick={() => { document.getElementById("create")?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); }}
              className="btn-primary px-4 py-2 rounded-xl text-sm font-semibold text-white w-full"
            >
              Create Agent Free
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}