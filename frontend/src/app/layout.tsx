import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AI Agent Maker — Create AI Agents Instantly",
  description:
    "Describe your need, and our Master AI will build a dedicated AI agent for you in seconds. No coding required.",
  keywords: "AI agent, AI maker, no-code AI, custom AI assistant, LangChain",
  openGraph: {
    title: "AI Agent Maker",
    description: "Create custom AI agents instantly with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="animated-gradient min-h-screen">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a35",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
            success: {
              iconTheme: { primary: "#0ea5e9", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}