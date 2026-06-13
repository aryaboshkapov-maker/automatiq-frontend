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
        <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>Best Cars Torrevieja</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>online</div>
      </div>
      <span style={{ color: "#fff", fontSize: 16, cursor: "pointer", marginRight: 6 }}>📹</span>
      <span style={{ color: "#fff", fontSize: 16, cursor: "pointer", marginRight: 6 }}>📞</span>
      <span style={{ color: "#fff", fontSize: 20, cursor: "pointer" }}>⋮</span>
    </div>
  )
}

function WhatsAppInput({ onSend }) {
  return null
}

export default function DemoWhatsapp() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      gap: 24,
    }}>
      <h1 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0, textAlign: "center" }}>
        Best Cars Torrevieja · WhatsApp Demo
      </h1>
      <p style={{ color: "#555", fontSize: 13, margin: 0 }}>Демо-чат · выберите язык для начала</p>

      <IPhoneMockup statusBarColor="#075E54">
        <WhatsAppHeader />
        <ChatEngine channel="whatsapp" apiBase={API_BASE} theme={WHATSAPP_THEME} />
      </IPhoneMockup>

      <a href="/" style={{ color: "#25d366", fontSize: 13, textDecoration: "none" }}>← Назад</a>
    </div>
  )
}
