import { useState, useEffect } from "react"
import IPhoneMockup from "../components/IPhoneMockup"
import ChatEngine from "../components/ChatEngine"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000"

const WHATSAPP_THEME = {
  bg: "#efeae2",
  inputBg: "#1f2c34",
  inputText: "#e9edef",
  userBubble: "#dcf8c6",
  botBubble: "#ffffff",
  text: "#111b21",
  textMuted: "#667781",
  border: "#2a3942",
  suggestBg: "transparent",
  suggestBorder: "#25d366",
  suggestText: "#075E54",
  sendActive: "#25d366",
  ticks: true,
  tickColor: "#53bdeb",
}

function WhatsAppHeader() {
  return (
    <div style={{
      background: "#075E54",
      padding: "10px 14px",
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: "#128C7E",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, flexShrink: 0,
      }}>🚗</div>
      <div style={{ flex: 1 }}>
        <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Torrevieja Cars</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>online</div>
      </div>
      <span style={{ color: "#fff", fontSize: 16, cursor: "pointer", marginRight: 6 }}>📹</span>
      <span style={{ color: "#fff", fontSize: 16, cursor: "pointer", marginRight: 6 }}>📞</span>
      <span style={{ color: "#fff", fontSize: 20, cursor: "pointer" }}>⋮</span>
    </div>
  )
}

export default function DemoWhatsapp() {
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
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 16px",
      gap: 24,
    }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>
          Torrevieja Cars · WhatsApp Demo
        </h1>
        <p style={{ color: "#555", fontSize: 12, margin: 0 }}>Демо-чат в браузере · выберите язык для начала</p>
      </div>

      <div style={{
        transformOrigin: "top center",
        transform: `scale(${scale})`,
        marginBottom: heightOffset,
      }}>
        <IPhoneMockup statusBarColor="#075E54">
          <WhatsAppHeader />
          <ChatEngine channel="whatsapp" apiBase={API_BASE} theme={WHATSAPP_THEME} />
        </IPhoneMockup>
      </div>

      <a href="/" style={{ color: "#25d366", fontSize: 13, textDecoration: "none" }}>← Назад на сайт</a>
    </div>
  )
}
