import { useState, useRef, useEffect } from "react"

const LANG_LABELS = {
  ru: { flag: "🇷🇺", label: "Русский" },
  es: { flag: "🇪🇸", label: "Español" },
  en: { flag: "🇬🇧", label: "English" },
}

const WELCOME = {
  ru: "Привет! 👋 Я ассистент автосалона Torrevieja Cars. Чем могу помочь?",
  es: "¡Hola! 👋 Soy el asistente de Torrevieja Cars. ¿En qué puedo ayudarte?",
  en: "Hi! 👋 I'm the Torrevieja Cars assistant. How can I help you?",
}

function uuid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function ChatEngine({ channel = "web", apiBase, theme }) {
  const [language, setLanguage] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [history, setHistory] = useState([])
  const sessionId = useRef(uuid())
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  function selectLanguage(lang) {
    setLanguage(lang)
    const welcomeMsg = {
      role: "assistant",
      text: WELCOME[lang],
      time: now(),
      suggestions: ["ru", "es", "en"].includes(lang)
        ? { ru: ["Купить авто", "Арендовать авто", "Трансфер"], es: ["Comprar coche", "Alquilar coche", "Transfer"], en: ["Buy a car", "Rent a car", "Transfer"] }[lang]
        : [],
    }
    setMessages([welcomeMsg])
  }

  async function handleSend(text) {
    if (!text.trim() || isTyping) return
    const userMsg = { role: "user", text, time: now() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput("")
    setIsTyping(true)

    const newHistory = [...history, { role: "user", content: text }]

    try {
      const res = await fetch(`${apiBase}/api/cars/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId.current,
          message: text,
          language,
          channel,
          history: newHistory.slice(-10),
        }),
      })
      const data = await res.json()
      const historyText = data.text
      const displayText = data.text.replace(/\n?\[(?:BOOKING|MEETING)_SAVED:#\w+\]/g, "")
      setHistory([...newHistory, { role: "assistant", content: historyText }])
      const cars = data.images || []
      setMessages(prev => [...prev, {
        role: "assistant",
        text: displayText,
        time: now(),
        suggestions: data.suggestions || [],
        images: cars,
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: "assistant",
        text: "Ошибка соединения. Попробуйте ещё раз.",
        time: now(),
        suggestions: [],
      }])
    } finally {
      setIsTyping(false)
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  if (!language) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: theme.bg, padding: 20 }}>
        <div style={{ color: theme.textMuted, fontSize: 13, marginBottom: 8 }}>Выберите язык / Select language</div>
        {Object.entries(LANG_LABELS).map(([code, { flag, label }]) => (
          <button key={code} onClick={() => selectLanguage(code)} style={{
            width: "80%", padding: "12px 0", borderRadius: 12,
            background: theme.suggestBg, border: `1px solid ${theme.suggestBorder}`,
            color: theme.suggestText, fontSize: 15, cursor: "pointer", fontWeight: 500,
          }}>
            {flag} {label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: theme.bg }}>
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "75%", padding: "8px 12px", borderRadius: msg.role === "user"
                  ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: msg.role === "user" ? theme.userBubble : theme.botBubble,
                color: theme.text, fontSize: 13, lineHeight: 1.45,
              }}>
                {msg.text}
                <div style={{ fontSize: 10, color: theme.textMuted, marginTop: 3, textAlign: "right" }}>
                  {msg.time}{msg.role === "user" && theme.ticks && <span style={{ color: theme.tickColor }}> ✓✓</span>}
                </div>
              </div>
            </div>
            {msg.images?.length > 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                {msg.images.map((car, j) => (
                  <div key={j} style={{ borderRadius: 10, overflow: "hidden", maxWidth: 160 }}>
                    <img
                      src={car.image_url}
                      alt={car.label}
                      style={{ width: "100%", display: "block", borderRadius: 10 }}
                      onError={e => { e.target.style.display = "none" }}
                    />
                    <div style={{ fontSize: 10, color: theme.textMuted, padding: "2px 4px", textAlign: "center" }}>
                      {car.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {msg.suggestions?.length > 0 && i === 0 && (
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4, justifyContent: "flex-start" }}>
                {msg.suggestions.map((s, j) => (
                  <button key={j} onClick={() => handleSend(s)} style={{
                    padding: "5px 10px", borderRadius: 14, fontSize: 12, cursor: "pointer",
                    background: "transparent", border: `1px solid ${theme.suggestBorder}`,
                    color: theme.suggestText, whiteSpace: "nowrap",
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "8px 12px", background: theme.botBubble, borderRadius: "16px 16px 16px 4px", width: "fit-content" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: 6, height: 6, borderRadius: "50%", background: theme.textMuted,
                animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s`,
              }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "8px 10px", background: theme.inputBg, borderTop: `1px solid ${theme.border}`, display: "flex", alignItems: "center", gap: 8, paddingBottom: 20 }}>
        <span style={{ fontSize: 20, cursor: "pointer" }}>😊</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={language === "ru" ? "Сообщение..." : language === "es" ? "Mensaje..." : "Message..."}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            color: theme.inputText || theme.text, fontSize: 13, padding: "4px 0",
          }}
        />
        <button onClick={() => handleSend(input)} style={{
          background: "none", border: "none", cursor: "pointer", fontSize: 20,
          color: input.trim() ? theme.sendActive : theme.textMuted,
        }}>
          {input.trim() ? "➤" : "🎤"}
        </button>
      </div>
      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }`}</style>
    </div>
  )
}
