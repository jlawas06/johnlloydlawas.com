"use client";

import "@n8n/chat/style.css";
import { useEffect } from "react";

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL ??
  "https://n8n.johnlloydlawas.com/webhook/portfolio-chatbot-webhook/chat";

const TARGET_ID = "n8n-chat";

export default function N8nChat() {
  useEffect(() => {
    if (!WEBHOOK_URL) return;

    let cancelled = false;

    /* createChat has no teardown of its own, so we own the mount point and
       remove it on cleanup — otherwise the widget survives every remount. */
    const container = document.createElement("div");
    container.id = TARGET_ID;
    document.body.appendChild(container);

    (async () => {
      const { createChat } = await import("@n8n/chat");
      if (cancelled) return;

      createChat({
        webhookUrl: WEBHOOK_URL,
        target: `#${TARGET_ID}`,
        mode: "window",
        showWelcomeScreen: true,
        initialMessages: [
          "Hi — I'm John Lloyd's assistant.",
          "Ask me about his experience, the case studies, or whether he's a fit for your project.",
        ],
        i18n: {
          en: {
            title: "Ask about my work",
            subtitle: "Experience, case studies, availability.",
            footer: "",
            getStarted: "Start a conversation",
            inputPlaceholder: "Ask a question…",
            closeButtonTooltip: "Close chat",
          },
        },
      });
    })();

    return () => {
      cancelled = true;
      container.remove();
    };
  }, []);

  return null;
}
