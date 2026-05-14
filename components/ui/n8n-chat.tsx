"use client";

import "@n8n/chat/style.css";
import { useEffect } from "react";

const WEBHOOK_URL = "https://n8n.johnlloydlawas.com/webhook/portfolio-chatbot-webhook/chat";

export default function N8nChat() {
  useEffect(() => {
    if (!WEBHOOK_URL) return;

    let mounted = true;

    (async () => {
      const { createChat } = await import("@n8n/chat");

      if (!mounted) return;

      createChat({
        webhookUrl: WEBHOOK_URL,
        mode: "window",
        showWelcomeScreen: true,
        initialMessages: [
          "Hi! 👋 I'm John Lloyd's AI assistant.",
          "Ask me anything about his experience, projects, or skills.",
        ],
        i18n: {
          en: {
            title: "Chat with John Lloyd's AI",
            subtitle: "Ask about my work, experience, or projects.",
            footer: "",
            getStarted: "Start a conversation",
            inputPlaceholder: "Type your question…",
            closeButtonTooltip: "Close chat",
          },
        },
      });
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}
