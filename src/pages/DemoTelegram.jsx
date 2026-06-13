import { useState, useEffect } from "react"
import IPhoneMockup from "../components/IPhoneMockup"
import ChatEngine from "../components/ChatEngine"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000"

const TELEGRAM_THEME = {
  bg: "#1c2b3a",
  inputBg: "#1c1c1e",
  userBubble: "#2b5278",
  botBubble: "#182533",
  text: "#e8e8e8",
  textMuted: "#8a9ba8",
  border: "#2a3f54",
  suggestBg: "transparent",
  suggestBorder: "#2AABEE",
  suggestText: "#2AABEE",
  sendActive: "#2AABEE",
  ticks: false,
}

function TelegramHeader() {
  return (
    <div style={{
      background: "#2AABEE",
      padding: "10px 14px",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "#1a7ab5",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
      }}>🚗</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Torrevieja Cars</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>bot</div>
      </div>
      <span style={{ color: "#fff", fontSize: 18, marginRight: 8, cursor: "pointer" }}>←</span>
      <span style={{ color: "#fff", fontSize: 20, cursor: "pointer" }}>⋮</span>
    </div>
  )
}

export default function DemoTelegram() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const available = window.innerWidth - 32
      setScale(Math.min(1, available / 410))
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const phoneH = 844
  const heightOffset = scale < 1 ? (phoneH * (scale - 1)) : 0

  return (
    <div style={{
      minHeight: "100vh",
      background: "#1a1a2e",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 16px",
      gap: 24,
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>
          Torrevieja Cars · Telegram Demo
        </h1>
        <p style={{ color: "#8888aa", fontSize: 12, margin: 0 }}>Демо-чат в браузере · выберите язык для начала</p>
      </div>

      <div style={{
        transformOrigin: "top center",
        transform: `scale(${scale})`,
        marginBottom: heightOffset,
      }}>
        <IPhoneMockup statusBarColor="#2AABEE">
          <TelegramHeader />
          <ChatEngine channel="telegram" apiBase={API_BASE} theme={TELEGRAM_THEME} />
        </IPhoneMockup>
      </div>

      <a href="/" style={{ color: "#2AABEE", fontSize: 13, textDecoration: "none" }}>← Назад на сайт</a>
    </div>
  )
}
