# 🤖 AgentForge — AI Agent Maker

> Create professional AI agents instantly. Just describe your need, and our Master AI builds a dedicated agent for you.

![AgentForge](https://img.shields.io/badge/Powered%20by-GPT--4-blue)
![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-black)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green)
![LangChain](https://img.shields.io/badge/AI-LangChain-orange)

## ✨ Features

- 🧠 **Master AI Architect** — GPT-4 powered agent designer
- ⚡ **Instant Generation** — Agent ready in under 30 seconds
- 💬 **Live Chat** — Talk to your agent immediately
- 🧠 **Memory** — Persistent conversation history
- 🔌 **REST API** — Every agent has its own API endpoint
- 🎨 **Professional UI** — Beautiful dark theme interface

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + TailwindCSS + Framer Motion |
| Backend | FastAPI + Python |
| AI | LangChain + OpenAI GPT-4 |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Hosting | Vercel + Railway |

## 🚀 Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add your OPENAI_API_KEY to .env
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Add your NEXT_PUBLIC_API_URL to .env.local
npm run dev
```

## 📁 Project Structure

```
ai-agent-maker/
├── frontend/          # Next.js app
│   ├── src/
│   │   ├── app/       # Pages
│   │   ├── components/ # UI Components
│   │   └── lib/       # API client
│   └── package.json
├── backend/           # FastAPI app
│   ├── app/
│   │   ├── api/       # Routes
│   │   ├── core/      # Config & DB
│   │   ├── models/    # Database models
│   │   └── services/  # AI services
│   ├── main.py
│   └── requirements.txt
└── README.md
```

## 🌐 Deployment

- **Frontend**: Deploy to [Vercel](https://vercel.com)
- **Backend**: Deploy to [Railway](https://railway.app)

## 📝 License

MIT License — Free to use and modify.